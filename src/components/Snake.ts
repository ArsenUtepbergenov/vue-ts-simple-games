import Vue from 'vue';
import Component from 'vue-class-component';
import { IGameStatic, IGameDynamic } from './interfaces';
import { Directions, State } from './enums';
import Piece from './Piece';
import Canvas from './Canvas';

@Component({
})
export default class Snake extends Vue implements IGameStatic, IGameDynamic {
  private canvas: any = null;
  private context: any;
  private width = 800;
  private height = 600;
  private snake: Piece[] = [];
  private currentDirection = Directions.LEFT;
  private headX: number = 220;
  private headY: number = 220;
  private food: any;
  private globalState: string = 'start';
  private previousScore: number = 0;
  private currentScore: number = 0;
  private isInitCanvas = false;
  private placeFoodX: number = 0;
  private placeFoodY: number = 0;

  public run(): void {
    this._initInstance();

    const keyListener = (event: any) => {
      this._handleKey(event);
    };
    this.canvas.addEventListener('keydown', keyListener);

    this.globalState = 'play';

    const timerId = setInterval(() => {
      if (this.globalState === 'over') {
        this.canvas.removeEventListener('keydown', keyListener);
        clearInterval(timerId);
        return;
      }
      this.update();
    }, 100);
  }

  public update(): void {
    console.log('update');
    this._drawBoard();
    this._drawSnake();
    this._drawFood();
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

  private _reset(): void {
    this.globalState = 'over';
    this.currentScore = 0;
    this.headX = 220;
    this.headY = 220;
    this.snake = [];
    this._drawBoard();
  }

  private _initCanvas(): void {
    this.canvas = new Canvas(this.$refs.games, this.width, this.height);
    this.context = this.canvas.context;
    this.isInitCanvas = true;
  }

  private _initInstance(): void {
    if (this.isInitCanvas === false) {
      this._initCanvas();
    }

    this.snake.push(new Piece(this.headX, this.headY));

    this.placeFoodX = this.width / Piece.size - 1;
    this.placeFoodY = this.height / Piece.size - 1;

    this.food = { radius: 10, x: 0, y: 0 };

    this._setNewFood();
  }

  private _drawBoard(): void {
    this.context.fillStyle = '#eeeeee';
    this.context.fillRect(0, 0, this.width, this.height);
  }

  private _drawSnake(): void {
    this.context.fillStyle = '#114444';
    for (const piece of this.snake) {
      this.context.fillRect(piece.x, piece.y, Piece.size, Piece.size);
    }
  }

  private _setNewFood(): void {
    this.food.x = Math.floor(Math.random() * this.placeFoodX + 1) * Piece.size;
    this.food.y = Math.floor(Math.random() * this.placeFoodY + 1) * Piece.size;
  }

  private _drawFood(): void {
    this.context.beginPath();
    this.context.arc(this.food.x, this.food.y, this.food.radius, 0, 2 * Math.PI);
    this.context.closePath();
    this.context.fillStyle = '#acc38b';
    this.context.fill();
  }

  private _checkCollisionBorder(): boolean {
    if (this.headX < 0 || this.headX + Piece.size > this.width) {
      return true;
    }
    if (this.headY < 0 || this.headY + Piece.size > this.height) {
      return true;
    }
    return false;
  }

  private _checkCollisionBody(): boolean {
    if (this.snake.length === 1) {
      return false;
    }
    for (const piece of this.snake) {
      if (this.headX === piece.x || this.headY === piece.y) {
        return true;
      }
    }
    return false;
  }

  private _move(): void {
    if (this.currentDirection === Directions.RIGHT) {
      this.headX += Piece.size;
    }
    if (this.currentDirection === Directions.LEFT) {
      this.headX -= Piece.size;
    }
    if (this.currentDirection === Directions.UP) {
      this.headY -= Piece.size;
    }
    if (this.currentDirection === Directions.DOWN) {
      this.headY += Piece.size;
    }
  }

  private _checkState(): void {
    if (this._checkCollisionBorder() || this._checkCollisionBody()) {
      this.globalState = 'over';
    }
    if (this.headX === this.food.x && this.headY === this.food.y) {
      this.currentScore++;
      this.previousScore = this.currentScore;
      this._setNewFood();
    }
    this.snake.pop();
    const newHead = new Piece(this.headX, this.headY);
    this.snake.unshift(newHead);
  }

  private _handleKey(event: any): void {
    if (event.keyCode === State.RESTART) {
      this.globalState = 'over';
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
