import Velocity from '../math/Velocity';

export default abstract class DynamicObject {
  protected velocity: Velocity;

  constructor(velocity: Velocity) {
    this.velocity = velocity;
  }

  public increaseVelocityX(value: number): void {
    this.velocity.increaseX(value);
  }

  public increaseVelocityY(value: number): void {
    this.velocity.increaseY(value);
  }

  public invertVelocityX(): void {
    this.velocity.invertX();
  }

  public invertVelocityY(): void {
    this.velocity.invertY();
  }
}
