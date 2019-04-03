import Piece from './Piece';
import { IDrawable } from '../interfaces';

export default class Tank implements IDrawable {
  private view: number[] = [];

  constructor() {
    this._initView();
  }

  public draw(): void {
    // console.log(this.view);
  }

  private _initView() {
    this.view = [0, 1, 0,
                 1, 1, 1,
                 1, 0, 1];
  }
}
