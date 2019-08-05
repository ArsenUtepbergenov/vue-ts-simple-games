import Base from '../general-objects/Base';

export default class TanksBase extends Base {
  private speedAnimation: number = 0.1;

  constructor(context: any) {
    super(context);
    this.initView();
  }

  public initView(): void {
    this.view = [[1, 1, 1], [1, 0, 1], [1, 1, 1]];
  }

  public update(): void {
    super.update();
    this.animateCenterOfBase();
  }

  public animateCenterOfBase(): void {
    const state = Math.sin(this.speedAnimation);
    state < 0 ? this.view[1][1] = 1 : this.view[1][1] = 0;
    this.speedAnimation += 0.09;
  }
}
