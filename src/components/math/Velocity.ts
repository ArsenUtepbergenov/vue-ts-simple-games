import Vector2 from './Vector2';

export default class Velocity extends Vector2 {
  constructor(x: number, y: number) {
    super(x, y);
  }

  public increase(value: number): void {
    this.x *= value;
    this.y *= value;
  }

  public reset(): void {
    this.set(0, 0);
  }

  public get getX(): number {
    return this.x;
  }

  public set setX(x: number) {
    this.x = x;
  }

  public get getY(): number {
    return this.y;
  }

  public set setY(y: number) {
    this.y = y;
  }
}
