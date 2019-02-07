import Vue from 'vue';
import Component from 'vue-class-component';
import { IGameStatic, IGameDynamic } from './interfaces';
import { Directions, State, Control, SizeBoardSnake } from './enums';
import Piece from './Piece';
import Food from './Food';
import Canvas from './Canvas';
import Board from './Board';
import Snake from './Snake';
import Score from './Score';

@Component({
})
export default class SnakeGame extends Vue implements IGameStatic, IGameDynamic {
  private canvas: any = null;
  private context: any;
  private width = SizeBoardSnake.WIDTH;
  private height = SizeBoardSnake.HEIGHT;
  private currentDirection: Directions = Directions.RIGHT;
  private globalState: State = State.START;
  private isInitCanvas = false;
  private placeFoodX: number = 0;
  private placeFoodY: number = 0;
  private board: any;
  private snake: any;
  private score: any;
  private food: any;

  constructor() {
    super();
    this.score = new Score();
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
    this.snake.draw();
    this.food.draw();
    this._checkState();
    this._move();
  }

  public restart(): void {
    this._reset();
    this.run();
  }

  public mounted() {
    this.run();
  }

  get previousScore(): number {
    return this.score.getPreviousScore;
  }

  get currentScore(): number {
    return this.score.getScore;
  }

  get bestScore(): number {
    return this.score.getBest;
  }

  private _reset(): void {
    this.globalState = State.OVER;
    this.score.reset();
    this.snake.reset();
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

    const startPosX: number = 300;
    const startPosY: number = 260;

    this.snake = new Snake(startPosX, startPosY, this.context);
    this.board = new Board(this.context, this.width, this.height);

    this.placeFoodX = this.width / Piece.size - 1;
    this.placeFoodY = this.height / Piece.size - 1;

    this.food = new Food(0, 0, this.context);

    this._putNewFood();
    return true;
  }

  private _putNewFood(): void {
    this.food.relocation(this.placeFoodX, this.placeFoodY);
  }

  private _checkCollisionBorder(): boolean {
    if (this.snake.x < 0 || this.snake.x + Piece.size > this.width) {
      return true;
    }
    if (this.snake.y < 0 || this.snake.y + Piece.size > this.height) {
      return true;
    }
    return false;
  }

  private _checkCollisionBody(): boolean {
    if (this.snake.getBody.length === 1) {
      return false;
    }
    for (const piece of this.snake.getBody) {
      if (this.snake.x === piece.x && this.snake.y === piece.y) {
        return true;
      }
    }
    return false;
  }

  private _move(): void {
    this.snake.turnTo(this.currentDirection);
  }

  private _checkState(): void {
    if (this._checkCollisionBorder() || this._checkCollisionBody()) {
      this.globalState = State.OVER;
    }
    if (this.snake.x === this.food.x && this.snake.y === this.food.y) {
      this.score.increase(1);
      this.snake.add();
      this._putNewFood();
    }
    this.snake.cut();
    this.snake.add();
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
