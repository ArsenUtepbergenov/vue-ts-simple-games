import Vue from 'vue';
import Component from 'vue-class-component';
import { IGameStatic } from './interfaces';
import { SizeBoardTicTacToe, State } from './enums';
import Canvas from './Canvas';
import Board from './Board';
import Score from './Score';

@Component({
})
export default class TicTacToeGame extends Vue implements IGameStatic {
  private canvas: any = null;
  private context: any;
  private width = SizeBoardTicTacToe.WIDTH;
  private height = SizeBoardTicTacToe.HEIGHT;
  private globalState: State = State.START;
  private isInitCanvas = false;
  private board: any;
  private score: any;

  constructor() {
    super();
    this.score = new Score();
  }

  public run(): void {
    if (this._initInstance() === false) {
      return;
    }

    const clickListener = (event: any) => {
      this._handleClick(event);
    };
    this.canvas.addEventListener('click', clickListener);

    this.globalState = State.PLAY;

    const timerId = setInterval(() => {
      if (this.globalState === State.OVER) {
        this.canvas.removeEventListener('click', clickListener);
        clearInterval(timerId);
        return;
      }
    }, 1000);
  }

  public restart(): void {
    this._reset();
    this.run();
  }

  public mounted() {
    this.run();
  }

  get userScore(): number {
    return this.score.getScore;
  }

  private _reset(): void {
    this.globalState = State.OVER;
    this.score.reset();
    this.board.draw();
  }

  private _initCanvas(): boolean {
    if (!this.$refs.game) {
      return false;
    }
    this.canvas = new Canvas(this.$refs.games, this.width, this.height);
    this.context = this.canvas.context;
    this.isInitCanvas = true;
    return true;
  }

  private _initInstance(): boolean {
    if (this.isInitCanvas === false) {
      if (this._initCanvas() === false) {
        return false;
      }
    }

    this.board = new Board(this.context, this.width, this.height);

    return true;
  }

  private _checkState(): void {
  }

  private _handleClick(event: any): void {
  }
}
