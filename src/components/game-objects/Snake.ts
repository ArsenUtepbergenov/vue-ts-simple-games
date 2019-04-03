import { IDrawable } from '../interfaces';
import { Directions } from '../enums';
import Piece from './Piece';

export default class Snake implements IDrawable {
  private body: Piece[] = [];
  private headX: number = 0;
  private headY: number = 0;
  private context: any;
  private velocity: number = 4;

  constructor(x: number, y: number, context: any) {
    this.headX = x;
    this.headY = y;
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
      this.headX += this.velocity;
    }
    if (direction === Directions.LEFT) {
      this.headX -= this.velocity;
    }
    if (direction === Directions.UP) {
      this.headY -= this.velocity;
    }
    if (direction === Directions.DOWN) {
      this.headY += this.velocity;
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

  get getBody(): Piece[] {
    return this.body;
  }

  get getVelocity(): number {
    return this.velocity;
  }
}
