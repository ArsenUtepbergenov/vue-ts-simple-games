import { IDrawable } from '../interfaces';
import Shape from './Shape';
import Piece from './Piece';

export default class Food extends Shape implements IDrawable {
  private context: any;

  constructor(x: number, y: number, context: any) {
    super(x, y);
    this.context = context;
  }

  public draw(): void {
    this.context.fillStyle = '#acc38b';
    this.context.beginPath();
    this.context.fillRect(this.x, this.y, Piece.size, Piece.size);
    this.context.closePath();
  }

  public relocation(placeX: number, placeY: number): void {
    const x = Math.floor(Math.random() * placeX + 1) * Piece.size;
    const y = Math.floor(Math.random() * placeY + 1) * Piece.size;
    this.setPos(x, y);
  }
}
