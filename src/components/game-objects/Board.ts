import { IDrawable } from '@/models/interfaces';

export default class Board implements IDrawable {
  private context: any;
  private width: number = 0;
  private height: number = 0;

  constructor(context: any, width: number, height: number) {
    this.context = context;
    this.width = width;
    this.height = height;
  }

  public draw(): void {
    this.context.fillStyle = '#ffffff';
    this.context.fillRect(0, 0, this.width, this.height);
  }
}
