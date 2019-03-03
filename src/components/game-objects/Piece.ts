import Shape from './Shape';

export default class Piece extends Shape {
  public static readonly size: number = 20;

  constructor(x: number, y: number) {
    super(x, y);
  }
}
