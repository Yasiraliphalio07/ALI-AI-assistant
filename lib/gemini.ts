import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function chat(message: string, searchResults?: any[]) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  let prompt = message;
  if (searchResults && searchResults.length > 0) {
    prompt = `Based on these search results:\n\n${searchResults
      .map((r) => `- ${r.title}: ${r.snippet}`)
      .join('\n')}\n\nAnswer the user question: ${message}`;
  }

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}
