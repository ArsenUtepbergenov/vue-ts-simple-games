import Vue from 'vue';
import Component from 'vue-class-component';
import { IStaticGame, IDynamicGame } from '../interfaces';
import { State, BoardArkanoid } from '../enums';
import Canvas from '../game-objects/Canvas';
import Board from '../game-objects/Board';
import Ball from '../game-objects/Ball';
import Player from '../game-objects/Player';
import Paddle from '../game-objects/Paddle';
import Velocity from '../math/Velocity';

@Component({
})
export default class ArkanoidGame extends Vue implements IStaticGame, IDynamicGame {
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
    this._checkState();
    this.ball.move();
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
      this.canvas.removeEventListener('mousemove', this.mousemoveListener);
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

    this.mousemoveListener = (event: any) => {
      this._handleMouseMove(event);
    };
    this.canvas.addEventListener('mousemove', this.mousemoveListener);
    this.globalState = State.PLAY;

    const widthPaddle: number = 160;
    const heightPaddle: number = 20;
    const startPosXPaddle: number = this.width / 2 - widthPaddle / 2;
    const startPosYPaddle: number = this.height - (heightPaddle + 10);

    this.board = new Board(this.context, this.width, this.height);
    this.ball = new Ball(this.context, this.width / 2, this.height / 2, 8, new Velocity(4, 4));
    this.paddle = new Paddle(this.context, startPosXPaddle, startPosYPaddle, widthPaddle, heightPaddle);

    return true;
  }

  private _checkCollisionBallOfBorder(): void {
    const radius = this.ball.getRadius;
    if (this.ball.x + this.ball.getVelocityX > this.width - radius || this.ball.x + this.ball.getVelocityX < radius) {
      this.ball.invertVelocityX();
    }
    if (this.ball.y + this.ball.getVelocityY > this.height - radius || this.ball.y + this.ball.getVelocityY < radius) {
      this.ball.invertVelocityY();
    }
  }

  private _checkCollisionBallOfPaddle(): void {
    const paddle = this.paddle;
    if ((paddle.x < this.ball.x + this.ball.getRadius) &&
        (paddle.x + paddle.getWidth > this.ball.x - this.ball.getRadius) &&
        (paddle.y < this.ball.y + this.ball.getRadius) &&
        (paddle.y + paddle.getHeight > this.ball.y - this.ball.getRadius)) {
      if (this.ball.x < paddle.x || this.ball.x > paddle.x + paddle.getWidth) {
        this.ball.invertVelocityX();
      }
      this.ball.invertVelocityY();
    }
  }

  private _checkState(): void {
    this._checkCollisionBallOfBorder();
    this._checkCollisionBallOfPaddle();
  }

  private _handleMouseMove(event: any): void {
    this.paddle.x = event.offsetX - this.paddle.getWidth / 2;
    if (this.paddle.x < 0) {
      this.paddle.x = 0;
    }
    if (this.paddle.x + this.paddle.getWidth > this.width) {
      this.paddle.x = this.width - this.paddle.getWidth;
    }
  }
}
