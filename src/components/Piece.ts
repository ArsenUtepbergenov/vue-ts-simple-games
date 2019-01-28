import Shape from './GameShapes';

export default class Piece extends Shape {
  public static readonly size: number = 20;

  constructor(x: number, y: number) {
    super(x, y);
  }
}
