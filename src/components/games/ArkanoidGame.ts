import Vue from 'vue';
import Component from 'vue-class-component';
import { IGameStatic, IGameDynamic } from '../interfaces';
import { Directions, State, BoardArkanoid } from '../enums';
import Canvas from '../game-objects/Canvas';
import Board from '../game-objects/Board';
import Ball from '../game-objects/Ball';
import Player from '../game-objects/Player';
import Paddle from '../game-objects/Paddle';

@Component({
})
export default class ArkanoidGame extends Vue implements IGameStatic, IGameDynamic {
  private canvas: any = null;
  private context: any;
  private width = BoardArkanoid.WIDTH;
  private height = BoardArkanoid.HEIGHT;
  private globalState: State = State.START;
  private isInitCanvas = false;
  private board: any;
  private ball: any;
  private player: Player;
  private paddle: any;
  private loop: number = 0;
  private keyListener: any;

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
    this._checkState();
    this._moveBall();
    this.ball.draw();
    this.paddle.draw();
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
      this.canvas.removeEventListener('keydown', this.keyListener);
    }
  }

  public restart(): void {
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

  private _reset(): void {
    this.stop();
    this.board.draw();
    this.player.scoreToZero();
    this.ball.reset();
    this.paddle.reset();
  }

  private _initCanvas(): boolean {
    if (!this.$refs.game) {
      return false;
    }
    this.canvas = new Canvas(this.$refs.game, this.width, this.height);
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

    this.keyListener = (event: any) => {
      this._handleKey(event);
    };
    this.canvas.addEventListener('keydown', this.keyListener);
    this.globalState = State.PLAY;

    const widthPaddle: number = 170;
    const heightPaddle: number = 20;
    const startPosXPaddle: number = this.width / 2 - widthPaddle / 2;
    const startPosYPaddle: number = this.height - (heightPaddle + 10);

    this.board = new Board(this.context, this.width, this.height);
    this.ball = new Ball(this.context, this.width / 2, this.height / 2, 10);
    this.paddle = new Paddle(this.context, startPosXPaddle, startPosYPaddle, widthPaddle, heightPaddle);
    return true;
  }

  private _checkCollisionBallOfBorder(): void {
    const radius = this.ball.getRadius;
    if (this.ball.x + this.ball.getVelocityX > this.width - radius || this.ball.x + this.ball.getVelocityX < radius) {
      this.ball.setVelocityX = -this.ball.getVelocityX;
    }
    if (this.ball.y + this.ball.getVelocityY > this.height - radius || this.ball.y + this.ball.getVelocityY < radius) {
      this.ball.setVelocityY = -this.ball.getVelocityY;
    }
  }

  private _checkCollisionPaddleOfBorder(): void {
    if (this.paddle.x + this.paddle.getWidth > this.width || this.paddle.x < 0) {
      this.paddle.setVelocityX = 0;
    }
    if (this.paddle.y + this.paddle.getHeight + this.paddle.getVelocityY > this.height || this.paddle.y < this.height / 2) {
      this.paddle.setVelocityY = 0;
    }
  }

  private _moveBall(): void {
    this.ball.x += this.ball.getVelocityX;
    this.ball.y += this.ball.getVelocityY;
  }

  private _checkState(): void {
    this._checkCollisionPaddleOfBorder();
    this._checkCollisionBallOfBorder();
  }

  private _handleKey(event: any): void {
    if (event.keyCode === Directions.LEFT && event.keyCode !== Directions.RIGHT) {
      this.paddle.moveTo(Directions.LEFT);
    }
    if (event.keyCode === Directions.RIGHT && event.keyCode !== Directions.LEFT) {
      this.paddle.moveTo(Directions.RIGHT);
    }
    if (event.keyCode === Directions.DOWN && event.keyCode !== Directions.UP) {
      this.paddle.moveTo(Directions.DOWN);
    }
    if (event.keyCode === Directions.UP && event.keyCode !== Directions.DOWN) {
      this.paddle.moveTo(Directions.UP);
    }
  }
}
