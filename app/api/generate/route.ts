import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { cohere } from '@ai-sdk/cohere';
import { saveResponse } from '@/lib/db';
// import { evaluateAccuracy, evaluateRelevancy } from '@/lib/evaluate';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const models = [
      { name: 'GPT-4', model: openai('gpt-4o') },
      { name: 'Claude', model: anthropic('claude-2') },
      { name: 'Cohere', model: cohere('command') },
    ];

    const responses = await Promise.all(
      models.map(async ({ name, model }) => {
        try {
          const startTime = Date.now();
          const { text } = await generateText({
            model,
            prompt,
          });
          const responseTime = Date.now() - startTime;

          const accuracy = Math.random() * 0.5 + 0.5;
          const relevancy = Math.random() * 0.5 + 0.5;
          // TODO: Implement real not random accuracy and relevancy evaluation

          await saveResponse({
            model: name,
            prompt,
            content: text,
            accuracy,
            relevancy,
            responseTime,
          });

          return {
            model: name,
            content: text,
            accuracy,
            relevancy,
            responseTime,
          };
        } catch (error) {
          console.error(`Error generating response for ${name}:`, error);
          return {
            model: name,
            content: 'Error generating response',
            accuracy: 0,
            relevancy: 0,
            responseTime: 0,
          };
        }
      })
    );

    return NextResponse.json({ responses });
  } catch (error) {
    console.error('Error in generate API route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
