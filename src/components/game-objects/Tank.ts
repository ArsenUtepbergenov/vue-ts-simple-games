import { IDrawable } from '../interfaces';

export default class Tank implements IDrawable {
  private view: number[][] = [];
  private context: any;
  private currentPosX: number = 5;
  private currentPosY: number = 5;

  constructor(context: any) {
    this.context = context;
    this._initView();
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

  public move(direction: string): void {
    switch (direction) {
      case 'left':
        this.currentPosX--;
        break;
      case 'right':
        this.currentPosX++;
        break;
      case 'up':
        this.currentPosY--;
        break;
      case 'down':
        this.currentPosY++;
        break;
    }
  }

  public rotate(direction: string): void {
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

  get x(): number {
    return this.currentPosX;
  }

  get y(): number {
    return this.currentPosY;
  }

  get size(): number {
    return this.view.length;
  }

  private _initView(): void {
    this.view = [[0, 1, 0], [1, 1, 1], [1, 0, 1]];
  }
}
