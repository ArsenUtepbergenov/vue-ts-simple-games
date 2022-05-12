import Rect from '../general-objects/Rect';
import { IDrawable } from '@/models/interfaces';
import { Directions, VelocityPaddle } from '@/models/enums';
import Velocity from '../math/Velocity';

export default class Paddle extends Rect implements IDrawable {
  private context: any;
  private velocity: Velocity;

  constructor(context: any, x: number, y: number, width: number, height: number) {
    super(x, y, width, height);
    this.context = context;
    this.velocity = new Velocity(VelocityPaddle.MIDDLE, VelocityPaddle.SLOW);
  }

  public draw(): void {
    this.context.fillStyle = '#089080';
    this.context.beginPath();
    this.context.fillRect(this.x, this.y, this.width, this.height);
    this.context.closePath();
  }

  public reset(): void {
    this.x = 0;
    this.y = 0;
    this.velocity.reset();
  }

  public moveTo(direction: Directions): void {
    if (direction === Directions.RIGHT) {
      this.x += this.velocity.getX;
    }
    if (direction === Directions.LEFT) {
      this.x -= this.velocity.getX;
    }
    if (direction === Directions.UP) {
      this.y -= this.velocity.getY;
    }
    if (direction === Directions.DOWN) {
      this.y += this.velocity.getY;
    }
  }

  get getVelocityX(): number {
    return this.velocity.getX;
  }

  set setVelocityX(value: number) {
    this.velocity.setX = value;
  }

  get getVelocityY(): number {
    return this.velocity.getY;
  }

  set setVelocityY(value: number) {
    this.velocity.setY = value;
  }
}
