export default class Piece {
  public static readonly size: number = 20;
  private posX: number = 0;
  private posY: number = 0;

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

  constructor(x: number, y: number) {
    this.posX = x;
    this.posY = y;
  }
}
