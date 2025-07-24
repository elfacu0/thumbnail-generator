import { useFabric } from "./useFabric";
import { fromFabricElementsToElements } from "../utils/parseFabricElements";
import { generateImagePrompt } from "@/utils/generatePrompt";

export const useEditor = () => {
  const { canvasRef, addElement, getElements } = useFabric();

  const generateImageFromCanvas = async () => {
    const fabricElements = getElements();
    const elements = fromFabricElementsToElements(fabricElements);
    const prompt = generateImagePrompt(elements);

    const response = await fetch("/api/ai/images", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate image");
    }

    const data = await response.json();
    return data.image;
  };

  return {
    generateImageFromCanvas,
    canvasRef,
    addElement,
  };
};
