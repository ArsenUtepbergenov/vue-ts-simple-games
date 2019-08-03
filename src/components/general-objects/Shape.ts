export default abstract class Shape {
  protected posX: number = 0;
  protected posY: number = 0;

  constructor(x: number, y: number) {
    this.posX = x;
    this.posY = y;
  }

  public setPos(x: number, y: number): void {
    this.posX = x;
    this.posY = y;
  }

  get x(): number {
    return this.posX;
  }

  set x(value: number) {
    this.posX = value;
  }

  get y(): number {
    return this.posY;
  }

  set y(value: number) {
    this.posY = value;
  }
}
