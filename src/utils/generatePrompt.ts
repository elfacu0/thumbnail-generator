import { IElement } from "@/app/interfaces/fabric.interface";

export const generateImagePrompt = (elements: IElement[]) => {
  const formatCoord = (value: number) => value.toFixed();
  const getCleanedBoundingBox = ({
    x1,
    y1,
    x2,
    y2,
  }: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  }) => ({
    x1: formatCoord(x1),
    y1: formatCoord(y1),
    x2: formatCoord(x2),
    y2: formatCoord(y2),
  });

  const imageContent = elements.map((element) => {
    const { boundingBox, content } = element;
    const { x1, y1, x2, y2 } = getCleanedBoundingBox(boundingBox);
    return `from (x: ${x1}, y: ${y1}) to: (x: ${x2}, y: ${y2}) display: ${content}`;
  });

  return (
    "Create a youtube thumbnail containg the following: \n" +
    imageContent.join("\n")
  );
};
