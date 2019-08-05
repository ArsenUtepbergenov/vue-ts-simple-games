import { IDrawable } from '../interfaces';

export default class Base implements IDrawable {
  protected view: number[][] = [];
  private context: any;
  private currentPosX: number = 5;
  private currentPosY: number = 5;

  constructor(context: any) {
    this.context = context;
  }

  public update(): void {
    this.draw();
  }

  public destroy(): void {
    this.view = [];
    delete this.view;
  }

  public draw(): void {
    this.view.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          this.context.fillStyle = '#df3222';
          this.context.fillRect(x + this.currentPosX, y + this.currentPosY, 1, 1);
        }
      });
    });
  }

  public reset(): void {
    this.view = [];
    this.currentPosX = 5;
    this.currentPosY = 5;
  }

  public setPos(x: number, y: number): void {
    this.currentPosX = x;
    this.currentPosY = y;
  }

  public get x(): number {
    return this.currentPosX;
  }

  public get y(): number {
    return this.currentPosY;
  }

  public get size(): number {
    return this.view.length;
  }
}
