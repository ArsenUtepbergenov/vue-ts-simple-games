import Vector2 from './Vector2';

export default class Velocity extends Vector2 {
  constructor(x: number, y: number) {
    super(x, y);
  }

  public increaseX(value: number): void {
    this.x += value;
  }

  public increaseY(value: number): void {
    this.y += value;
  }

  public reset(): void {
    this.set(0, 0);
  }

  get getX(): number {
    return this.x;
  }

  set setX(x: number) {
    this.x = x;
  }

  get getY(): number {
    return this.y;
  }

  set setY(y: number) {
    this.y = y;
  }
}
