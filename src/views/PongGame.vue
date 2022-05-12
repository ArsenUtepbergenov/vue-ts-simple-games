<template>
  <div class="pong">
    <Scores :scores="getScores" />
    <canvas ref="game" />
    <Button @click="restart" class="btn">
      Restart
    </Button>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { IDynamicGame } from '@/models/interfaces';
import { State, BoardPong } from '@/models/enums';
import Board from '@/components/game-objects/Board';
import Ball from '@/components/game-objects/Ball';
import Player from '@/components/game-objects/Player';
import Paddle from '@/components/game-objects/Paddle';
import Velocity from '@/components/math/Velocity';
import Game from '@/components/mixins/Game';
import Scores from '@/components/ui/Scores.vue';
import Utilities from '@/utils/utilities';
import Button from '@/components/ui/Button.vue';

@Component({
  components: {
    Scores,
    Button,
  },
})
export default class PongGame extends mixins(Game) implements IDynamicGame {
  private ball: any;
  private loop: number = 0;
  private mousemoveListener: any;
  private paddles: Paddle[] = [];
  private firstPlayer: Player;
  private aiPlayer: Player;
  private scores: object[] = [];

  constructor() {
    super();
    this.firstPlayer = new Player();
    this.aiPlayer = new Player();
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
    this._movePaddleForBall(this.paddles[1]);
    this.paddles.forEach((paddle) => {
      paddle.draw();
    });
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
    this._reset();
    this.run();
  }

  public mounted() {
    this.run();
  }

  get getScores(): object[] {
    this.scores = [
      {
        message: 'First player',
        value: this.getFirstPlayerScore,
      },
      {
        message: 'AI',
        value: this.getAiScore,
      },
    ];
    return this.scores;
  }

  get getFirstPlayerScore(): number {
    return this.firstPlayer.getScore;
  }

  get getAiScore(): number {
    return this.aiPlayer.getScore;
  }

  private _reset(): void {
    this.stop();
    this.ball.reset();
    this.paddles.length = 0;
  }

  private _initInstance(): boolean {
    if (this.isInitCanvas === false) {
      if (this._initCanvas(BoardPong.WIDTH, BoardPong.HEIGHT) === false) {
        return false;
      }
    }

    this.mousemoveListener = (event: any) => {
      this._handleMouseMove(event);
    };
    this.canvas.addEventListener('mousemove', this.mousemoveListener);
    this.globalState = State.PLAY;

    const widthPaddle: number = 20;
    const heightPaddle: number = 120;
    const startPosXPaddleFirst: number = 15;
    const startPosXPaddleSecond: number = this.width - widthPaddle - 15;
    const startPosYPaddle: number = this.height / 2 - heightPaddle / 2;

    this.paddles.push(
      new Paddle(this.context, startPosXPaddleFirst, startPosYPaddle, widthPaddle, heightPaddle),
    );
    this.paddles.push(
      new Paddle(this.context, startPosXPaddleSecond, startPosYPaddle, widthPaddle, heightPaddle),
    );

    this.board = new Board(this.context, this.width, this.height);
    this.ball = new Ball(this.context, this.width / 2, this.height / 2, 8, new Velocity(5, -4));
    return true;
  }

  private _movePaddleForBall(paddle: Paddle): void {
    paddle.y = this.ball.y - paddle.getHeight / 2;
    if (paddle.y < 0) {
      paddle.y = 0;
    }
    if (paddle.y + paddle.getHeight > this.height) {
      paddle.y = this.height - paddle.getHeight;
    }
  }

  private _moveBallToStartPosition(): void {
    this.ball.x = this.width / 2;
    this.ball.y = this.height / 2;
  }

  private _checkCollisionBallOfBorder(): void {
    const radius = this.ball.getRadius;
    if (this.ball.x - radius < 0) {
      this.aiPlayer.addScore(1);
      this._moveBallToStartPosition();
    }
    if (this.ball.x + radius > this.width) {
      this.firstPlayer.addScore(1);
      this._moveBallToStartPosition();
    }
    if (
      this.ball.y + this.ball.getVelocityY > this.height - radius ||
      this.ball.y + this.ball.getVelocityY < radius
    ) {
      this.ball.invertVelocityY();
    }
  }

  private _checkCollisionBallOfPaddles(): void {
    this.paddles.forEach((paddle) => {
      if (Utilities.checkCollisionRectOfCircle(paddle, this.ball)) {
        this.ball.getVelocity.increase(1.02);
        this.ball.invertVelocityX();
      }
    });
  }

  private _checkState(): void {
    this._checkCollisionBallOfBorder();
    this._checkCollisionBallOfPaddles();
  }

  private _handleMouseMove(event: any): void {
    this.paddles[0].y = event.offsetY - this.paddles[0].getHeight / 2;
    if (this.paddles[0].y < 0) {
      this.paddles[0].y = 0;
    }
    if (this.paddles[0].y + this.paddles[0].getHeight > this.height) {
      this.paddles[0].y = this.height - this.paddles[0].getHeight;
    }
  }
}
</script>
