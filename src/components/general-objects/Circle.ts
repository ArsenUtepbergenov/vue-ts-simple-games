import Shape from './Shape';

export default class Circle extends Shape {
  protected radius: number = 0;

  constructor(x: number, y: number, radius: number) {
    super(x, y);
    this.radius = radius;
  }

  get getRadius(): number {
    return this.radius;
  }

  set setRadius(value: number) {
    this.radius = value;
  }
}
