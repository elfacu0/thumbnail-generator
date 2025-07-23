import { aiService } from "@/services/ai.service";

function validatePrompt(prompt: unknown): string | null {
  if (!prompt || typeof prompt !== "string") {
    return "Prompt is required and must be a string.";
  }
  return null;
}

function mapImageBufferToResponse(imageBuffer: Buffer): Response {
  const base64 = imageBuffer.toString("base64");
  return new Response(
    JSON.stringify({
      image: `data:image/png;base64,${base64}`,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

function errorResponse(message: string, status: number = 500): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt } = body;

    const validationError = validatePrompt(prompt);
    if (validationError) {
      return errorResponse(validationError, 400);
    }

    const imageBuffer = await aiService.generateImage(prompt);

    if (!imageBuffer) {
      return errorResponse("Failed to generate image.", 500);
    }

    return mapImageBufferToResponse(imageBuffer);
  } catch (error) {
    return errorResponse(
      (error as Error).message || "Internal Server Error",
      500
    );
  }
}
