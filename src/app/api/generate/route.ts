import { GoogleGenAI } from '@google/genai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const { prompt, systemPrompt, model = 'gemini-3-flash-preview' } = await req.json();

        console.log('Generating documentation with prompt length:', prompt?.length);
        console.log('Using model:', model);

        if (!prompt || prompt.trim().length === 0) {
            return new Response(JSON.stringify({ error: 'Prompt is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
        if (!apiKey) {
            throw new Error('GOOGLE_GENERATIVE_AI_API_KEY is not set');
        }

        // Initialize Google GenAI with API key
        const ai = new GoogleGenAI({ apiKey });

        // Combine system prompt and user prompt
        const fullPrompt = systemPrompt
            ? `${systemPrompt}\n\nUser Request: ${prompt}`
            : prompt;

        console.log('Starting generation with model:', model);

        // Generate content with streaming
        const response = await ai.models.generateContentStream({
            model: model,
            contents: fullPrompt,
        });

        // Create a readable stream for the response
        const encoder = new TextEncoder();
        const stream = new ReadableStream({
            async start(controller) {
                try {
                    let chunkCount = 0;

                    for await (const chunk of response) {
                        let text = "";
                        try {
                            // Extract text from the candidate parts manually to be safe
                            // and filter out non-text parts (like thought fragments)
                            const parts = (chunk as any).candidates?.[0]?.content?.parts;
                            if (parts && Array.isArray(parts)) {
                                text = parts
                                    .map((part: any) => part.text || "")
                                    .join("");
                            } else if (typeof (chunk as any).text === 'string') {
                                text = (chunk as any).text;
                            }
                        } catch (e) {
                            console.warn('Text extraction failed:', e);
                        }

                        if (text) {
                            chunkCount++;
                            controller.enqueue(encoder.encode(text));
                        }
                    }

                    console.log(`Stream complete. Total chunks: ${chunkCount}`);
                    controller.close();
                } catch (error) {
                    console.error('Stream error:', error);
                    controller.error(error);
                }
            },
        });

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Transfer-Encoding': 'chunked',
            },
        });
    } catch (error) {
        console.error('API Error:', error);
        return new Response(
            JSON.stringify({
                error: 'Failed to generate documentation',
                details: error instanceof Error ? error.message : 'Unknown error'
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}
