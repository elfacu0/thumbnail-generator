export interface IBoundingBox {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface IElement {
  boundingBox: IBoundingBox;
  content: string;
}
