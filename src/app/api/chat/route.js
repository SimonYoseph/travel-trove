import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = 'edge';

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config);

export async function POST(request) {
    const { messages } = await request.json();

    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        stream: true,
        messages: [
            { role: 'system', content: 'You provide search criteria for flights offers based on user preferences.' },
            ...messages
        ]
    })

    const stream = new OpenAIStream(response);

    return new StreamingTextResponse(stream);
}