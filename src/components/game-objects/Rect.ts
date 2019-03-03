import Shape from './Shape';

export default class Rect extends Shape {
  protected width: number = 0;
  protected height: number = 0;

  constructor(x: number, y: number, width: number, height: number) {
    super(x, y);
    this.width = width;
    this.height = height;
  }

  get getWidth(): number {
    return this.width;
  }

  set setWidth(value: number) {
    this.width = value;
  }

  get getHeight(): number {
    return this.height;
  }

  set setHeight(value: number) {
    this.height = value;
  }
}
