import Circle from './Circle';
import { IDrawable, IReset } from '../interfaces';
import Velocity from '../math/Velocity';

export default class Ball extends Circle implements IDrawable, IReset {
  private context: any;
  private velocity: Velocity;

  constructor(context: any, x: number, y: number, radius: number) {
    super(x, y, radius);
    this.context = context;
    this.velocity = new Velocity(4, 4);
  }

  public draw(): void {
    this.context.fillStyle = '#734686';
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.context.fill();
    this.context.closePath();
  }

  public reset(): void {
    this.x = 0;
    this.y = 0;
    this.velocity.reset();
  }

  public increaseVelocityX(value: number): void {
    this.velocity.increaseX(value);
  }

  public increaseVelocityY(value: number): void {
    this.velocity.increaseY(value);
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
