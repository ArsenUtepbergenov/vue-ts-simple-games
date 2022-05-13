import { IDrawable } from '@/models/interfaces';

export default class Board implements IDrawable {
  private context: CanvasRenderingContext2D;
  private width: number = 0;
  private height: number = 0;

  constructor(context: CanvasRenderingContext2D, width: number, height: number) {
    this.context = context;
    this.width = width;
    this.height = height;
  }

  public draw(): void {
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.fillStyle = 'rgba(0, 0, 0, 0.6)';
    this.context.fillRect(0, 0, this.width, this.height);
  }
}
