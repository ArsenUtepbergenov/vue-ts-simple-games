import { IDrawable } from './interfaces';
import Piece from './Piece';
import { Directions } from './enums';

export default class Snake implements IDrawable {
  private body: Piece[] = [];
  private headX: number = 220;
  private headY: number = 220;
  private context: any;

  constructor(context: any) {
    this.context = context;
    this.body.push(new Piece(this.headX, this.headY));
  }

  public draw(): void {
    this.context.fillStyle = '#114444';
    for (const piece of this.body) {
      this.context.fillRect(piece.x, piece.y, Piece.size, Piece.size);
    }
  }

  public cut(): void {
    this.body.pop();
  }

  public add(): void {
    const newHead = new Piece(this.headX, this.headY);
    this.body.unshift(newHead);
  }

  public turnTo(direction: Directions): void {
    if (direction === Directions.RIGHT) {
      this.headX += Piece.size;
    }
    if (direction === Directions.LEFT) {
      this.headX -= Piece.size;
    }
    if (direction === Directions.UP) {
      this.headY -= Piece.size;
    }
    if (direction === Directions.DOWN) {
      this.headY += Piece.size;
    }
  }

  public reset(): void {
    this.headX = 220;
    this.headY = 220;
    this.body = [];
  }

  get x(): number {
    return this.headX;
  }

  get y(): number {
    return this.headY;
  }
}
