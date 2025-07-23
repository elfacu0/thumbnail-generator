import { GenerateContentResponse, Candidate, Part } from "@google/genai";

function getFirstCandidate(imageResponse: GenerateContentResponse): Candidate {
  const candidate = imageResponse.candidates?.[0];
  if (!candidate || !candidate.content?.parts) {
    throw new Error("No candidates in response");
  }
  return candidate;
}

function getImagePartFromCandidate(candidate: Candidate): Part {
  if (!candidate.content?.parts || !Array.isArray(candidate.content.parts)) {
    throw new Error("Candidate has no content parts");
  }
  const imagePart = candidate.content.parts.find(
    (part) =>
      "inlineData" in part &&
      part.inlineData &&
      typeof part.inlineData.data === "string" &&
      typeof part.inlineData.mimeType === "string"
  );
  if (!imagePart || !("inlineData" in imagePart) || !imagePart.inlineData) {
    throw new Error("No image part found in response");
  }
  return imagePart;
}

function getBase64DataFromPart(part: Part): string {
  const { data } = part.inlineData!;
  if (typeof data !== "string") {
    throw new Error("Image data is not a string");
  }
  return data;
}

export async function fromImageResponseToImageBuffer(
  imageResponse: GenerateContentResponse
): Promise<Buffer> {
  const candidate = getFirstCandidate(imageResponse);
  const imagePart = getImagePartFromCandidate(candidate);
  const base64Data = getBase64DataFromPart(imagePart);
  return Buffer.from(base64Data, "base64");
}
