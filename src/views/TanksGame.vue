<template>
  <div class="tanks">
    <Scores :scores="getScores" />
    <canvas ref="game"></canvas>
    <button type="button" class="btn-outline btn-outline--restart" @click="restart()">Restart</button>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { IDynamicGame } from '@/components/interfaces';
import { Directions, State, Control, BoardTanks } from '@/components/enums';
import Board from '@/components/game-objects/Board';
import Player from '@/components/game-objects/Player';
import Tank from '@/components/game-objects/Tank';
import Game from '@/components/mixins/Game';
import Scores from '@/components/scores.vue';

@Component({
  components: {
    Scores,
  },
})
export default class TanksGame extends mixins(Game) implements IDynamicGame {
  private player: Player;
  private tank: any;
  private scaleContextValue: number = BoardTanks.SCALE_COEFFICIENT;
  private scores: object[] = [];
  private loop: number = 0;
  private keyListener: any;

  constructor() {
    super();
    this.player = new Player();
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
      this.canvas.removeEventListener('keydown', this.keyListener);
    }
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
    this.tank.update();
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
        message: 'Previous score',
        color: 'scores--color-scarlet',
        value: this.previousScore,
      },
      {
        message: 'Current score',
        color: 'scores--color-turquoise',
        value: this.currentScore,
      },
      {
        message: 'Best result',
        color: 'scores--color-light-blue',
        value: this.bestScore,
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

  private _reset(): void {
    this.clearContext();
    this.stop();
  }

  private _initInstance(): boolean {
    if (this.isInitCanvas === false) {
      if (this._initCanvas(BoardTanks.WIDTH, BoardTanks.HEIGHT) === false) {
        return false;
      }
      this.context.scale(this.scaleContextValue, this.scaleContextValue);
    }

    this.keyListener = (event: any) => {
      this._handleKey(event);
    };
    this.canvas.addEventListener('keydown', this.keyListener);

    this.globalState = State.PLAY;
    this.board = new Board(this.context, this.width, this.height);
    this.tank = new Tank(this.context);

    return true;
  }

  private _checkState(): void {
    //
  }

  private _handleKey(event: any): void {
    const rightBorder = this.width / this.scaleContextValue;
    const bottomBorder = this.height / this.scaleContextValue;
    if (event.keyCode === Control.RESTART) {
      this.restart();
    }
    if (event.keyCode === Directions.LEFT && this.tank.x > 0) {
      this.tank.rotate('left');
      this.tank.move('left');
    }
    if (event.keyCode === Directions.RIGHT && this.tank.x + this.tank.size < rightBorder) {
      this.tank.rotate('right');
      this.tank.move('right');
    }
    if (event.keyCode === Directions.DOWN && this.tank.y + this.tank.size < bottomBorder) {
      this.tank.rotate('down');
      this.tank.move('down');
    }
    if (event.keyCode === Directions.UP && this.tank.y > 0) {
      this.tank.rotate('up');
      this.tank.move('up');
    }
    if (event.keyCode === Control.SPACE) {
      this.tank.shoot();
    }
  }
}
</script>
