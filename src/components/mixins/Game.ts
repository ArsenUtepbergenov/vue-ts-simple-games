import { Vue, Component } from 'vue-property-decorator';
import { State } from '../enums';
import Canvas from '../general-objects/Canvas';

@Component
export default class Game extends Vue {
  protected canvas: any = null;
  protected context: any;
  protected width = 0;
  protected height = 0;
  protected globalState: State = State.START;
  protected isInitCanvas = false;
  protected board: any;
  protected message: string = '';
  protected styleOfMessage: string = '';

  protected _initCanvas(width: number, height: number): boolean {
    if (!this.$refs.game) {
      return false;
    }
    this.width = width;
    this.height = height;
    this.canvas = new Canvas(this.$refs.game, width, height);
    this.context = this.canvas.context;
    this.isInitCanvas = true;
    return true;
  }

  protected clearContext(): void {
    if (this.isInitCanvas) {
      this.context.save();
      this.context.setTransform(1, 0, 0, 1, 0, 0);
      this.context.clearRect(0, 0, this.width, this.height);
      this.context.restore();
    }
  }

  protected get isOver(): boolean {
    return this.globalState === State.OVER;
  }

  protected get getMessage(): string {
    return this.message;
  }

  protected get getStyleOfMessage(): string {
    return this.styleOfMessage;
  }

  protected get isMessage(): boolean {
    return this.isOver && this.message !== '';
  }

  protected _resetMessage(): void {
    this.message = '';
    this.styleOfMessage = '';
  }

  protected _setMessage(message: string, styleOfMessage: string): void {
    this.message = message;
    this.styleOfMessage = styleOfMessage;
  }
}
