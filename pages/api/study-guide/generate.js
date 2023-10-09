import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'
 
export const runtime = 'experimental-edge'
 
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})
 
export default async function handler(req, res) {
  const { messages } = await req.json();
  const { role, content } = messages[0];
  
  const prompt = `I am preparing for an examination and I need to create a study guide for the exam. Help me generate a comprehensive Study Guide for this topic: "${content}". The response should be in markdown format`;

  const systemMessage = 'You are a learning assistant that helps student do research about a given topic.';

  const comboMessages = [
    { role: "system", content: systemMessage },
    { role: "user", content: prompt },
  ];

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    temperature: 0.8,
    // max_tokens: 10,
    stream: true,
    messages: comboMessages,
  })
  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
}