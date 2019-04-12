import Component, { mixins } from 'vue-class-component';
import { IDynamicGame } from '../interfaces';
import { Directions, State, Control, BoardTanks } from '../enums';
import Board from '../game-objects/Board';
import Player from '../game-objects/Player';
import Tank from '../game-objects/Tank';
import Game from '../mixins/Game';

@Component({
})
export default class TanksGame extends mixins(Game) implements IDynamicGame {
  private currentDirection: Directions = Directions.RIGHT;
  private firstPlayer: Player;
  private tank: Tank;

  constructor() {
    super();
    this.firstPlayer = new Player();
    this.tank = new Tank();
  }

  public run(): void {
    if (this._initInstance() === false) {
      return;
    }

    const keyListener = (event: any) => {
      this._handleKey(event);
    };
    this.canvas.addEventListener('keydown', keyListener);

    this.globalState = State.PLAY;

    const timerId = setInterval(() => {
      if (this.globalState === State.OVER) {
        this.canvas.removeEventListener('keydown', keyListener);
        clearInterval(timerId);
        return;
      }
      this.update();
    }, 100);
  }

  public update(): void {
    this.board.draw();
    this._checkState();
    this._move();
    this.tank.draw();
  }

  public restart(): void {
    this._reset();
    this.run();
  }

  public mounted() {
    this.run();
  }

  get previousScore(): number {
    return this.firstPlayer.getPreviousScore;
  }

  get currentScore(): number {
    return this.firstPlayer.getScore;
  }

  get bestScore(): number {
    return this.firstPlayer.getBest;
  }

  private _reset(): void {
    this.globalState = State.OVER;
    this.board.draw();
  }

  private _initInstance(): boolean {
    if (this.isInitCanvas === false) {
      if (this._initCanvas(BoardTanks.WIDTH, BoardTanks.HEIGHT) === false) {
        return false;
      }
    }

    this.board = new Board(this.context, this.width, this.height);

    return true;
  }

  private _move(): void {
    //
  }

  private _checkState(): void {
    //
  }

  private _handleKey(event: any): void {
    if (event.keyCode === Control.RESTART) {
      this.globalState = State.OVER;
      this.restart();
    }
    if (event.keyCode === Directions.LEFT && this.currentDirection !== Directions.RIGHT) {
      this.currentDirection = Directions.LEFT;
    }
    if (event.keyCode === Directions.RIGHT && this.currentDirection !== Directions.LEFT) {
      this.currentDirection = Directions.RIGHT;
    }
    if (event.keyCode === Directions.DOWN && this.currentDirection !== Directions.UP) {
      this.currentDirection = Directions.DOWN;
    }
    if (event.keyCode === Directions.UP && this.currentDirection !== Directions.DOWN) {
      this.currentDirection = Directions.UP;
    }
  }
}
