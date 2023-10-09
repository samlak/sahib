import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'
 
export const runtime = 'experimental-edge'
 
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})
 
export default async function handler(req, res) {
  const { messages, topic, guide } = await req.json();
  
  const prompt = `Topic: ${topic}
    Study Guide: ${guide}
    Use the information provided above to answer the below. The answer must be based on the information above.
  `;

  const systemMessage =`
    You are to strictly act like a learning assistant that helps student do research about a given topic. If you are asked question outside the scope of the topic kindly decline.
    ${prompt}
  `;

  const prefixMessages = [
    { role: "system", content: systemMessage },
  ];

  const finalMessages = [
    ...prefixMessages,
    ...messages,
  ]

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: finalMessages,
  })
  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
}