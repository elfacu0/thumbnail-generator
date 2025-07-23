import { fromImageResponseToImageBuffer } from "@/utils/parseImageResponse";
import { GoogleGenAI } from "@google/genai";

export type AiServiceProvider = GoogleGenAI;

class AiService {
  aiService: AiServiceProvider;
  constructor(aiService: AiServiceProvider) {
    this.aiService = aiService;
  }

  async generateImage(prompt: string): Promise<Buffer> {
    const response = await this.aiService.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation",
      contents: prompt,
      config: {
        responseModalities: ["IMAGE", "TEXT"],
      },
    });

    const imageBuffer = fromImageResponseToImageBuffer(response);
    return imageBuffer;
  }
}

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
export const aiService = new AiService(
  new GoogleGenAI({ apiKey: GEMINI_API_KEY })
);
