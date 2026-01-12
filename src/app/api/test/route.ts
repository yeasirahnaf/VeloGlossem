import { GoogleGenAI } from '@google/genai';

export const maxDuration = 30;

export async function GET() {
    try {
        const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

        if (!apiKey) {
            return Response.json({
                error: 'API key not found',
                message: 'GOOGLE_GENERATIVE_AI_API_KEY is not set in environment variables'
            }, { status: 500 });
        }

        // Initialize Google GenAI with API key
        const ai = new GoogleGenAI({ apiKey });

        // Test generation
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: 'Say "Hello, API is working!"',
        });

        return Response.json({
            success: true,
            apiKeySet: true,
            apiKeyLength: apiKey.length,
            model: 'gemini-3-flash-preview',
            sdk: '@google/genai',
            response: response.text,
            message: 'API is configured correctly'
        });
    } catch (error) {
        return Response.json({
            error: 'API test failed',
            details: error instanceof Error ? error.message : 'Unknown error',
        }, { status: 500 });
    }
}
