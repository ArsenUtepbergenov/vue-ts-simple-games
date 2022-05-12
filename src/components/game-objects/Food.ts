import { IDrawable } from '@/models/interfaces';
import Rect from '../general-objects/Rect';

export default class Food extends Rect implements IDrawable {
  private context: any;

  constructor(x: number, y: number, width: number, height: number, context: any) {
    super(x, y, width, height);
    this.context = context;
  }

  public draw(): void {
    this.context.fillStyle = '#acc38b';
    this.context.beginPath();
    this.context.fillRect(this.x, this.y, this.width, this.width);
    this.context.closePath();
  }

  public relocation(placeX: number, placeY: number): void {
    const x = Math.floor(Math.random() * placeX + 1) * this.width;
    const y = Math.floor(Math.random() * placeY + 1) * this.width;
    this.setPos(x, y);
  }
}
