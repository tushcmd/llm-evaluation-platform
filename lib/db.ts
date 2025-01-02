import prisma from './prisma';

export async function saveResponse(data: {
  model: string;
  prompt: string;
  content: string;
  accuracy: number;
  relevancy: number;
  responseTime: number;
}) {
  return prisma.response.create({
    data: {
      ...data,
      prompt: {
        create: {
          content: data.prompt,
        },
      },
    },
  });
}

export async function getLatestResponses() {
  return prisma.response.findMany({
    orderBy: { createdAt: 'desc' },
    take: 3,
    include: { prompt: true },
  });
}

export async function getAnalytics() {
  const responses = await prisma.response.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
  });

  const analytics = responses.reduce((acc, response) => {
    if (!acc[response.model]) {
      acc[response.model] = {
        totalAccuracy: 0,
        totalRelevancy: 0,
        totalResponseTime: 0,
        count: 0,
      };
    }

    acc[response.model].totalAccuracy += response.accuracy;
    acc[response.model].totalRelevancy += response.relevancy;
    acc[response.model].totalResponseTime += response.responseTime;
    acc[response.model].count++;

    return acc;
  }, {} as Record<string, { totalAccuracy: number; totalRelevancy: number; totalResponseTime: number; count: number }>);

  return Object.entries(analytics).map(([model, data]) => ({
    model,
    averageAccuracy: data.totalAccuracy / data.count,
    averageRelevancy: data.totalRelevancy / data.count,
    averageResponseTime: data.totalResponseTime / data.count,
  }));
}
