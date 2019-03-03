import Velocity from '../math/Velocity';

export default abstract class DynamicObject {
  protected velocity: Velocity;

  constructor(velocity: Velocity) {
    this.velocity = velocity;
  }

  public increaseVelocity(value: number): void {
    this.velocity.increase(value);
  }

  public invertVelocityX(): void {
    this.velocity.invertX();
  }

  public invertVelocityY(): void {
    this.velocity.invertY();
  }
}
