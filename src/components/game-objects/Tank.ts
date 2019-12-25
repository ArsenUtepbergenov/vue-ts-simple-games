import { IDrawableRect } from '../interfaces';
import Velocity from '../math/Velocity';
import Ball from './Ball';
import { BoardTanks } from '../enums';

export default class Tank implements IDrawableRect {
  private view: number[][] = [];
  private context: any;
  private currentPosX: number = 5;
  private currentPosY: number = 5;
  private currentDirection: string = 'up';
  private bullets: any[] = [];

  constructor(context: any) {
    this.context = context;
    this._initView();
  }

  public update(): void {
    this.draw();
    this._drawBullets();
    this._destroyBullet();
  }

  public draw(): void {
    this.view.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          this.context.fillStyle = '#087674';
          this.context.fillRect(x + this.currentPosX, y + this.currentPosY, 1, 1);
        }
      });
    });
  }

  public shoot(): void {
    const currentDirectionOfTank = this.currentDirection;
    const velocityOfBullet = new Velocity(0, 0);
    const valueOfVelocity = 0.3;
    let positionOfGun = [0, 0];
    switch (currentDirectionOfTank) {
      case 'left':
        velocityOfBullet.set(-valueOfVelocity, 0);
        positionOfGun = [-0.5, 1.5];
        break;
      case 'right':
        velocityOfBullet.set(valueOfVelocity, 0);
        positionOfGun = [3.5, 1.5];
        break;
      case 'up':
        velocityOfBullet.set(0, -valueOfVelocity);
        positionOfGun = [1.5, -0.5];
        break;
      case 'down':
        velocityOfBullet.set(0, valueOfVelocity);
        positionOfGun = [1.5, 3.5];
        break;
    }
    this.bullets.push(new Ball(this.context, this.x + positionOfGun[0], this.y + positionOfGun[1], 0.4, velocityOfBullet));
  }

  public reset(): void {
    this.view = [];
    this.currentPosX = 5;
    this.currentPosY = 5;
    this.currentDirection = 'up';
  }

  public move(direction: string): void {
    switch (direction) {
      case 'left':
        this.currentPosX -= 0.5;
        break;
      case 'right':
        this.currentPosX += 0.5;
        break;
      case 'up':
        this.currentPosY -= 0.5;
        break;
      case 'down':
        this.currentPosY += 0.5;
        break;
    }
    this.currentDirection = direction;
  }

  public rotate(direction: string): void {
    if (this.currentDirection === direction) {
      return;
    }
    switch (direction) {
      case 'left':
        this.view = [[0, 1, 1], [1, 1, 0], [0, 1, 1]];
        break;
      case 'right':
        this.view = [[1, 1, 0], [0, 1, 1], [1, 1, 0]];
        break;
      case 'up':
        this.view = [[0, 1, 0], [1, 1, 1], [1, 0, 1]];
        break;
      case 'down':
        this.view = [[1, 0, 1], [1, 1, 1], [0, 1, 0]];
        break;
    }
  }

  public get x(): number {
    return this.currentPosX + 0.5;
  }

  public get y(): number {
    return this.currentPosY + 0.5;
  }

  public get getWidth(): number {
    return this.size + 0.5;
  }

  public get getHeight(): number {
    return this.size + 0.5;
  }

  public get size(): number {
    return this.view.length;
  }

  public get getCurrentDirection(): string {
    return this.currentDirection;
  }

  private _initView(): void {
    this.view = [[0, 1, 0], [1, 1, 1], [1, 0, 1]];
  }

  private _destroyBullet(): void {
    const sizeOfBoardX = this.context.canvas.width / BoardTanks.SCALE_COEFFICIENT;
    const sizeOfBoardY = this.context.canvas.height / BoardTanks.SCALE_COEFFICIENT;

    if (this.bullets && this.bullets.length >= 1) {
      for (const bullet of this.bullets) {
        if (bullet.posX >= sizeOfBoardX || bullet.posX < 0 || bullet.posY >= sizeOfBoardY || bullet.posY < 0) {
          this.bullets.shift();
        }
      }
    }
  }

  private _drawBullets(): void {
    if (this.bullets && this.bullets.length >= 1) {
      for (const bullet of this.bullets) {
        bullet.draw();
        bullet.move();
      }
    }
  }
}
