export interface IDynamicGame extends IStaticGame {
  update(): void;
}

export interface IStaticGame {
  run(): void;
  restart(): void;
}

export interface IDrawable {
  draw(): void;
}

export interface IMoveble {
  move(x: number, y: number): void;
}

export interface IDynamicObject extends IMoveble, IDrawable {
  reset(): void;
}

export interface IRect {
  x: number;
  y: number;
  getWidth: number;
  getHeight: number;
}

export interface IMouseCoordinates {
  x: number;
  y: number;
}

export type IDrawableRect = IDrawable & IRect;
