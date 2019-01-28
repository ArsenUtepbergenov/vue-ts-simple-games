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

  get x() {
    return this.posX;
  }

  set x(value) {
    this.posX = value;
  }

  get y() {
    return this.posY;
  }

  set y(value) {
    this.posY = value;
  }
}
