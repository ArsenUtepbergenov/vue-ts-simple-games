import Circle from './Circle';
import { IDynamicObject } from '../interfaces';
import Velocity from '../math/Velocity';

export default class Ball extends Circle implements IDynamicObject {
  private context: any;
  private velocity: Velocity;

  constructor(context: any, x: number, y: number, radius: number, velocity: Velocity) {
    super(x, y, radius);
    this.context = context;
    this.velocity = velocity;
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

  public move(): void {
    this.x += this.velocity.getX;
    this.y += this.velocity.getY;
  }

  public invertVelocityX(): void {
    this.velocity.invertX();
  }

  public invertVelocityY(): void {
    this.velocity.invertY();
  }

  get getVelocity(): Velocity {
    return this.velocity;
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
