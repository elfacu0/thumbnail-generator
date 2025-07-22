import { BoundingBox, Element } from "@/interfaces/fabric";
import { FabricObject } from "fabric";

const parseElementBoundingBox = (element: FabricObject): BoundingBox => {
  const boundingBox = element.getBoundingRect();
  return {
    x1: boundingBox.left ?? 0,
    y1: boundingBox.top ?? 0,
    x2: (boundingBox.left ?? 0) + (boundingBox.width ?? 0),
    y2: (boundingBox.top ?? 0) + (boundingBox.height ?? 0),
  };
};

export const fromFabricElementsToElements = (
  elements: FabricObject[]
): Element[] => {
  return elements.map((element) => ({
    content: "text" in element ? (element.text as string) : "Ignore this",
    boundingBox: parseElementBoundingBox(element),
  }));
};
