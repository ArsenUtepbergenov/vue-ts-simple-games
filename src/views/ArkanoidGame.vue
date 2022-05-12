<template>
  <div class="arkanoid">
    <Scores :scores="getScores" />
    <canvas ref="game"></canvas>
    <button type="button" class="btn-outline btn-outline--restart" @click="restart()">
      Restart
    </button>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { IDynamicGame } from '@/models/interfaces';
import { State, BoardArkanoid } from '@/models/enums';
import Utilities from '@/components/utilities';
import Board from '@/components/game-objects/Board';
import Ball from '@/components/game-objects/Ball';
import Player from '@/components/game-objects/Player';
import Paddle from '@/components/game-objects/Paddle';
import Velocity from '@/components/math/Velocity';
import Game from '@/components/mixins/Game';
import Scores from '@/components/scores.vue';
import Rect from '../components/general-objects/Rect';

@Component({
  components: {
    Scores,
  },
})
export default class ArkanoidGame extends mixins(Game) implements IDynamicGame {
  private ball: any;
  private player: Player;
  private paddle: any;
  private loop: number = 0;
  private mousemoveListener: any;
  private startPosXPaddle: number = 0;
  private startPosYPaddle: number = 0;
  private bricks: any = [];
  private scores: object[] = [];

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
    this._drawBricks();
  }

  public start(): void {
    this.update();
    if (!this.isOver) {
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

  get getScores(): object[] {
    this.scores = [
      {
        message: 'Previous score',
        value: this.previousScore,
      },
      {
        message: 'Current score',
        value: this.currentScore,
      },
      {
        message: 'Best result',
        value: this.bestScore,
      },
      {
        message: 'Lives',
        value: this.lives,
      },
    ];
    return this.scores;
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
    this.player.scoreToZero();
    this.ball.reset();
    this.paddle.reset();
  }

  private _over(): void {
    this._reset();
    this.paddle.setPos(this.startPosXPaddle, this.startPosYPaddle);
    this.ball.setPos(this.width / 2, this.height / 2);
  }

  private _initInstance(): boolean {
    if (this.isInitCanvas === false) {
      if (this._initCanvas(BoardArkanoid.WIDTH, BoardArkanoid.HEIGHT) === false) {
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
    this.startPosXPaddle = this.width / 2 - widthPaddle / 2;
    this.startPosYPaddle = this.height - (heightPaddle + 10);
    const startBallVelocityX: number = Utilities.randomIntByInterval(-4, 4);
    const startBallVelocityY: number = Utilities.randomIntByInterval(-4, 4);

    this.board = new Board(this.context, this.width, this.height);
    this.ball = new Ball(
      this.context,
      this.width / 2,
      this.height / 2,
      8,
      new Velocity(startBallVelocityX, startBallVelocityY),
    );
    this.paddle = new Paddle(
      this.context,
      this.startPosXPaddle,
      this.startPosYPaddle,
      widthPaddle,
      heightPaddle,
    );

    this._generateBricks();

    return true;
  }

  private _drawBricks(): void {
    for (const brick of this.bricks) {
      this.context.fillStyle = '#3f51b5';
      this.context.fillRect(brick.x, brick.y, brick.width, brick.height);
    }
  }

  private _generateBricks(): void {
    const startPosX = 45;
    const startPosY = 20;
    const width = 50;
    const height = 25;
    const stepX = width + 10;
    const stepY = height + 10;
    const numberX = stepX * 12;
    const numberY = stepY * 7;
    for (let x = startPosX; x < numberX; x += stepX) {
      for (let y = startPosY; y < numberY; y += stepY) {
        this.bricks.push(new Rect(x, y, width, height));
      }
    }
  }

  private _checkCollisionBallOfBorder(): void {
    const radius = this.ball.getRadius;
    if (
      this.ball.x + this.ball.getVelocityX > this.width - radius ||
      this.ball.x + this.ball.getVelocityX < radius
    ) {
      this.ball.invertVelocityX();
    }
    if (this.ball.y + this.ball.getVelocityY < radius) {
      this.ball.invertVelocityY();
    }
    if (this.ball.y + this.ball.getVelocityY > this.height - radius) {
      this.ball.setPos(this.width / 2, this.height / 2);
      this.player.subtractLive(1);
    }
  }

  private _checkCollisionBallOfBricks(): void {
    for (const [index, brick] of this.bricks.entries()) {
      if (Utilities.checkCollisionRectOfCircle(brick, this.ball)) {
        if (this.ball.x < brick.x || this.ball.x > brick.x + brick.width) {
          this.ball.invertVelocityX();
        }
        this.ball.invertVelocityY();
        this.bricks.splice(index, 1);
        this.player.addScore(1);
        this.ball.getVelocity.increase(1.01);
      }
    }
  }

  private _checkCollisionBallOfPaddle(): void {
    const paddle = this.paddle;
    const ball = this.ball;
    if (Utilities.checkCollisionRectOfCircle(paddle, ball)) {
      if (ball.x < paddle.x || ball.x > paddle.x + paddle.getWidth) {
        this.ball.invertVelocityX();
      }
      this.ball.invertVelocityY();
    }
  }

  private _checkState(): void {
    this._checkCollisionBallOfBorder();
    this._checkCollisionBallOfPaddle();
    this._checkCollisionBallOfBricks();
    if (this.player.getLives <= 0 || this.bricks.length <= 0) {
      this._over();
    }
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
</script>
