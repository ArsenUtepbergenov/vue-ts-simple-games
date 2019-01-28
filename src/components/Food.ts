import Shape from './GameShapes';

export default class Food extends Shape  {
  public readonly radius: number = 10;

  constructor(x: number, y: number) {
    super(x, y);
  }
}
