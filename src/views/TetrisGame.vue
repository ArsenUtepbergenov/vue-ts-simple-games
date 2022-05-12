<template>
  <div class="tetris">
    <Scores :scores="getScores" />
    <canvas ref="game" />
    <Button @click="restart" class="btn btn--bg-green m-2">
      Restart
    </Button>
    <Message v-if="isMessage" :message="getMessage" :state="getStyleOfMessage" />
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { IDynamicGame } from '@/models/interfaces';
import Utilities from '@/utils/utilities';
import { Directions, State, Control, BoardTetris } from '@/models/enums';
import Player from '@/components/game-objects/Player';
import Board from '@/components/game-objects/Board';
import Game from '@/components/mixins/Game';
import { createPiece, drawPiece } from '@/components/game-objects/TetrisPieces';
import Message from '@/components/ui/Message.vue';
import Scores from '@/components/ui/Scores.vue';
import Button from '@/components/ui/Button.vue';

@Component({
  components: {
    Scores,
    Message,
    Button,
  },
})
export default class TetrisGame extends Game implements IDynamicGame {
  private player: Player;
  private loop: number = 0;
  private keyListener: any;
  private arena: number[][] = [];
  private currentPiece: number[][] = [];
  private lastTime: number = 0;
  private dropCounter: number = 0;
  private dropInterval: number = 1000;
  private currentPiecePosX: number = 0;
  private currentPiecePosY: number = 0;
  private scaleContextValue: number = BoardTetris.SCALE_COEFFICIENT;
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

  public update(time = 0): void {
    this.board.draw();
    drawPiece(this.context, this.arena, { x: 0, y: 0 });
    drawPiece(this.context, this.currentPiece, {
      x: this.currentPiecePosX,
      y: this.currentPiecePosY,
    });
    const deltaTime = time - this.lastTime;
    this.lastTime = time;
    this.dropCounter += deltaTime;
    if (this.dropCounter > this.dropInterval) {
      this._dropCurrentPiece();
    }
    if (!this.isOver) {
      this.loop = requestAnimationFrame(this.update);
    }
  }

  public start(): void {
    this.update();
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
    this.clearContext();
    this.currentPiecePosY = 0;
    this.board.draw();
    this.arena.forEach((row) => row.fill(0));
    drawPiece(this.context, this.arena, { x: 0, y: 0 });
    this.player.scoreToZero();
  }

  private _over(): void {
    this.player.subtractLive(1);
    this._reset();
    if (this.player.getLives <= 0) {
      this.stop();
      this._setMessage('The game is over', 'over');
    }
  }

  private _initInstance(): boolean {
    if (this.isInitCanvas === false) {
      if (this._initCanvas(BoardTetris.WIDTH, BoardTetris.HEIGHT) === false) {
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
    this.arena = Utilities.createMatrix(
      this.width / this.scaleContextValue,
      this.height / this.scaleContextValue,
    );
    this._generatePiece();

    return true;
  }

  private _generatePiece(): void {
    const pieces: string = 'ILJOTSZ';
    this.currentPiece = createPiece(pieces[(pieces.length * Math.random()) | 0]);
    this.currentPiecePosY = 0;
    this.currentPiecePosX =
      ((this.arena[0].length / 2) | 0) - ((this.currentPiece[0].length / 2) | 0);
    if (this._checkCollision()) {
      this._over();
    }
  }

  private _dropCurrentPiece(): void {
    this.currentPiecePosY++;
    if (this._checkCollision()) {
      this.currentPiecePosY--;
      this._mergePieceWithArena();
      this._generatePiece();
      this._clearRows();
    }
    this.dropCounter = 0;
  }

  private _clearRows(): void {
    other: for (let y = this.arena.length - 1; y > 0; y--) {
      for (const x of this.arena[y]) {
        if (x === 0) {
          continue other;
        }
      }
      const row = this.arena.splice(y, 1)[0].fill(0);
      this.arena.unshift(row);
      y++;
      this.player.addScore(1);
    }
  }

  private _checkCollision(): boolean {
    const arena = this.arena;
    const piece = this.currentPiece;
    for (let y = 0; y < piece.length; y++) {
      for (let x = 0; x < piece[y].length; x++) {
        if (
          piece[y][x] !== 0 &&
          (arena[y + this.currentPiecePosY] &&
            arena[y + this.currentPiecePosY][x + this.currentPiecePosX]) !== 0
        ) {
          return true;
        }
      }
    }
    return false;
  }

  private _mergePieceWithArena(): void {
    this.currentPiece.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          this.arena[y + this.currentPiecePosY][x + this.currentPiecePosX] = value;
        }
      });
    });
  }

  private _moveCurrentPiece(direction: number): void {
    this.currentPiecePosX += direction;
    if (this._checkCollision()) {
      this.currentPiecePosX -= direction;
    }
  }

  private _rotateCurrentPiece(direction: number): void {
    let offset = 1;
    const piecePosX = this.currentPiecePosX;
    this._rotatePiece(direction);

    while (this._checkCollision()) {
      this.currentPiecePosX += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));

      if (offset > this.currentPiece[0].length) {
        this._rotatePiece(-direction);
        this.currentPiecePosX = piecePosX;
        return;
      }
    }
  }

  private _rotatePiece(direction: number): void {
    const piece = this.currentPiece;

    for (let y = 0; y < piece.length; y++) {
      for (let x = 0; x < y; x++) {
        [piece[y][x], piece[x][y]] = [piece[x][y], piece[y][x]];
      }
    }

    if (direction > 0) {
      piece.forEach((row) => row.reverse());
    } else {
      piece.reverse();
    }
  }

  private _handleKey(event: any): void {
    if (event.keyCode === Control.RESTART) {
      this.globalState = State.OVER;
      this.restart();
    }
    if (event.keyCode === Directions.LEFT) {
      this._moveCurrentPiece(-1);
    }
    if (event.keyCode === Directions.RIGHT) {
      this._moveCurrentPiece(1);
    }
    if (event.keyCode === Directions.DOWN) {
      this._dropCurrentPiece();
    }
    if (event.keyCode === Control.Q) {
      this._rotateCurrentPiece(1);
    }
    if (event.keyCode === Control.W) {
      this._rotateCurrentPiece(-1);
    }
  }
}
</script>
