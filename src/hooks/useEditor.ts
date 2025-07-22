import { useFabric } from "./useFabric";
import { fromFabricElementsToElements } from "../utils/parseFabricElements";
import { generateImagePrompt } from "@/utils/generatePrompt";

export const useEditor = () => {
  const { canvasRef, addElement, getElements } = useFabric();

  const convertImage = () => {
    const fabricElements = getElements();
    const elements = fromFabricElementsToElements(fabricElements);
    const prompt = generateImagePrompt(elements)
  };

  return {
    convertImage,
    canvasRef,
    addElement,
  };
};
