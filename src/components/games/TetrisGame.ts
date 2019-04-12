import Component, { mixins } from 'vue-class-component';
import { IDynamicGame } from '../interfaces';
import { State, BoardTetris } from '../enums';
import Player from '../game-objects/Player';
import Board from '../game-objects/Board';
import Game from '../mixins/Game';

@Component({
})
export default class TetrisGame extends mixins(Game) implements IDynamicGame {
  private player: Player;
  private loop: number = 0;
  private mousemoveListener: any;

  constructor() {
    super();
    this.player = new Player();
  }

  public run(): void {
    if (this._initInstance() === false) {
      return;
    }
    this.start();
  }

  public update(): void {
    this.board.draw();
  }

  public start(): void {
    this.update();
    if (this.globalState !== State.OVER) {
      this.loop = requestAnimationFrame(this.start);
    }
  }

  public stop(): void {
    if (this.loop) {
      cancelAnimationFrame(this.loop);
      this.globalState = State.OVER;
      this.canvas.removeEventListener('mousemove', this.mousemoveListener);
    }
  }

  public restart(): void {
    if (this.globalState === State.OVER) {
      this.player.addLive(3);
    }
    this._reset();
    this.run();
  }

  public mounted() {
    this.run();
  }

  get previousScore(): number {
    return this.player.getPreviousScore;
  }

  get currentScore(): number {
    return this.player.getScore;
  }

  get bestScore(): number {
    return this.player.getBest;
  }

  get lives(): number {
    return this.player.getLives;
  }

  private _reset(): void {
    this.stop();
    this.board.draw();
    this.player.scoreToZero();
  }

  private _over(): void {
    this._reset();
  }

  private _initInstance(): boolean {
    if (this.isInitCanvas === false) {
      if (this._initCanvas(BoardTetris.WIDTH, BoardTetris.HEIGHT) === false) {
        return false;
      }
    }

    this.canvas.addEventListener('mousemove', this.mousemoveListener);
    this.globalState = State.PLAY;
    this.board = new Board(this.context, this.width, this.height);

    return true;
  }
}
