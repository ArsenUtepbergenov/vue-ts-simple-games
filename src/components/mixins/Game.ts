import { Vue, Component } from 'vue-property-decorator';
import { State } from '../enums';
import Canvas from '../game-objects/Canvas';

@Component
export default class Game extends Vue {
  protected canvas: any = null;
  protected context: any;
  protected width = 0;
  protected height = 0;
  protected globalState: State = State.START;
  protected isInitCanvas = false;
  protected board: any;

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
}
