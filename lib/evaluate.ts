/* eslint-disable @typescript-eslint/no-unused-vars */
export function evaluateAccuracy(
  generatedText: string,
  expectedOutput: string
) {
  // TODO: Implement this function
}

interface EvaluateRelevancyParams {
  generatedText: string;
  prompt: string;
}

export function evaluateRelevancy({
  generatedText,
  prompt,
}: EvaluateRelevancyParams): number {
  // Basic relevancy check (could be improved with NLP techniques)
  const promptKeywords = prompt.split(' ').map((word) => word.toLowerCase());
  const generatedKeywords = generatedText
    .split(' ')
    .map((word) => word.toLowerCase());

  // Calculate the number of relevant keywords found in the generated text
  const relevantCount = promptKeywords.filter((keyword) =>
    generatedKeywords.includes(keyword)
  ).length;

  // A simple relevancy score as a fraction of total keywords in the prompt
  return relevantCount / promptKeywords.length;
}
