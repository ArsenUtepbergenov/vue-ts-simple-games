export default class Vector2 {
  protected x: number = 0;
  protected y: number = 0;

  constructor(x: number, y: number) {
    this.set(x, y);
  }

  public invertX(): void {
    this.x = -this.x;
  }

  public invertY(): void {
    this.y = -this.y;
  }

  public set(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }
}
