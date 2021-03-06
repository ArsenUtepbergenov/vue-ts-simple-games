<template>
  <div class="tictactoe">
    <div class="modes">
      <button type="button" class="btn-outline btn-outline--play-with-ai" @click="setOpponent('AI')">Play with AI</button>
      <button type="button" class="btn-outline btn-outline--game-for-two" @click="setOpponent('Two')">Game for two</button>
    </div>
    <Scores :scores="getScores" />
    <div class="tictactoe__game">
      <canvas ref="game"></canvas>
      <Message v-if="isMessage" :message="getMessage" :state="getStyleOfMessage" />
      <button type="button" class="btn-outline btn-outline--restart" @click="restart()">Restart</button>
    </div>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import Utilities from '@/components/utilities';
import { IStaticGame } from '@/components/interfaces';
import { BoardTicTacToe, State, Players } from '@/components/enums';
import Board from '@/components/game-objects/Board';
import Player from '@/components/game-objects/Player';
import Message from '@/components/message.vue';
import Scores from '@/components/scores.vue';
import Game from '@/components/mixins/Game';

@Component({
  components: {
    Message,
    Scores,
  },
})
export default class TicTacToeGame extends mixins(Game) implements IStaticGame {
  private currentPlayer: Players = Players.FIRST;
  private players: Players[] = [Players.FIRST, Players.SECOND, Players.AI];
  private winFirstPlayer: number = 0;
  private winSecondPlayer: number = 0;
  private firstPlayer: Player;
  private secondPlayer: Player;
  private aiPlayer: Player;
  private grid: number[][] = [[], [], []];
  private sizeGrid: number = 0;
  private cell: {size: number};
  private currentOpponent: string = '';
  private scores: object[] = [];

  constructor() {
    super();
    this.firstPlayer = new Player();
    this.secondPlayer = new Player();
    this.aiPlayer = new Player();
    this.cell = {size: 0};
  }

  public run(): void {
    if (this._initInstance() === false) {
      return;
    }
  }

  public restart(): void {
    this._reset();
    if (this.currentOpponent === 'Two') {
      this._playWithHuman();
    } else if (this.currentOpponent === 'AI') {
      this._playWithAI();
    } else {
      return;
    }
  }

  public setOpponent(opponent: string): void {
    this.currentOpponent = opponent;
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
        message: 'Second player',
        value: this.getSecondPlayerScore,
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

  get getSecondPlayerScore(): number {
    return this.secondPlayer.getScore;
  }

  get getAiScore(): number {
    return this.aiPlayer.getScore;
  }

  @Watch('currentOpponent')
  private _rerun(value: string): void {
    this.restart();
  }

  private _playWithAI(): void {
    // TODO
  }

  private _playWithHuman(): void {
    const clickListener = (event: any) => this._move(event);
    this.canvas.addEventListener('click', clickListener);

    this.globalState = State.PLAY;

    const timerId = setInterval(() => {
      if (this.globalState === State.OVER) {
        this.canvas.removeEventListener('click', clickListener);
        clearInterval(timerId);
        return;
      }
    }, 100);
  }

  private _reset(): void {
    this.globalState = State.OVER;
    this._resetMessage();
    this.board.draw();
    this._resetGrid();
    this._drawGrid();
  }

  private _initInstance(): boolean {
    if (this.isInitCanvas === false) {
      if (this._initCanvas(BoardTicTacToe.WIDTH, BoardTicTacToe.HEIGHT) === false) {
        return false;
      }
    }

    this.sizeGrid = 3;
    this._generateCurrentPlayer();

    this.board = new Board(this.context, this.width, this.height);
    this.board.draw();

    this._initGrid();
    this._drawGrid();

    return true;
  }

  private _generateCurrentPlayer(): void {
    const randomIndex = Utilities.randomIntByInterval(0, 1);
    this.currentPlayer = this.players[randomIndex];
    if (this.currentPlayer === Players.FIRST) {
      this.winFirstPlayer = this.sizeGrid;
      this.winSecondPlayer = -this.sizeGrid;
    }
    if (this.currentPlayer === Players.SECOND) {
      this.winSecondPlayer = this.sizeGrid;
      this.winFirstPlayer = -this.sizeGrid;
    }
  }

  private _resetGrid(): void {
    for (let i = 0; i < this.sizeGrid; i++) {
      this.grid[i].fill(0);
    }
  }

  private _initGrid(): void {
    for (let i = 0; i < this.sizeGrid; i++) {
      this.grid[i] = new Array<number>(this.sizeGrid).fill(0);
    }
  }

  private _drawGrid(): void {
    const widthBoarder = this.context.lineWidth = 5;
    this.cell = {
      size: Math.round((Math.min(this.width, this.height) -
                                (this.sizeGrid * 2 * widthBoarder)) /
                                 this.sizeGrid + 2 * widthBoarder),
    };
    for (let x = 0; x < this.sizeGrid; x++) {
      for (let y = 0; y < this.sizeGrid; y++) {
        this.context.beginPath();
        this.context.strokeStyle = '#006E6D';
        this.context.strokeRect(this.cell.size * x, this.cell.size * y, this.cell.size, this.cell.size);
        this.context.closePath();
      }
    }
  }

  private _checkState(): void {
    let sumRow = 0;
    let sumColumn = 0;
    let mainDiagonal = 0;
    let sideDiagonal = 0;
    const winFirstPlayer = this.winFirstPlayer;
    const winSecondPlayer = this.winSecondPlayer;
    let numberNotZeros = 0;

    for (let i = 0; i < this.sizeGrid; i++) {
      for (let j = 0; j < this.sizeGrid; j++) {
        if (this.grid[i][j] !== 0) {
          numberNotZeros++;
        }
      }
    }

    if (numberNotZeros === this.sizeGrid * this.sizeGrid) {
      this._gameOver('draw');
    }

    for (let x = 0; x < this.sizeGrid; x++) {
      for (let y = 0; y < this.sizeGrid; y++) {
        sumRow += this.grid[x][y];
        sumColumn += this.grid[y][x];
        if (sumRow === winFirstPlayer || sumColumn === winFirstPlayer) {
          this._gameOver('first');
        }
        if (sumRow === winSecondPlayer || sumColumn === winSecondPlayer) {
          this._gameOver('second');
        }
      }
      sumRow = 0;
      sumColumn = 0;
    }

    for (let x = 0; x < this.sizeGrid; x++) {
      mainDiagonal += this.grid[x][x];
      if (mainDiagonal === winFirstPlayer) {
        this._gameOver('first');
      }
      if (mainDiagonal === winSecondPlayer) {
        this._gameOver('second');
      }
    }

    for (let x = 0; x < this.sizeGrid; x++) {
      sideDiagonal += this.grid[x][this.sizeGrid - 1 - x];
      if (sideDiagonal === winFirstPlayer) {
        this._gameOver('first');
      }
      if (sideDiagonal === winSecondPlayer) {
        this._gameOver('second');
      }
    }
  }

  private _gameOver(winner: string): void {
    this.globalState = State.OVER;
    switch (winner) {
      case 'first':
        this.firstPlayer.addScore(1);
        this._setMessage('The first player won', 'over');
        break;
      case 'second':
        this.secondPlayer.addScore(1);
        this._setMessage('The second player won', 'over');
        break;
      case 'draw':
        this._setMessage('The game is draw', 'over');
        break;
      default:
        this._setMessage('Unrecorded situation', 'error');
    }
  }

  private _drawCross(x: number, y: number): void {
    this.context.beginPath();
    this.context.strokeStyle = '#6B5B95';
    const step = this.cell.size / 3;
    this.context.moveTo(x - step, y - step);
    this.context.lineTo(x + step, y + step);
    this.context.moveTo(x + step, y - step);
    this.context.lineTo(x - step, y + step);
    this.context.stroke();
    this.context.closePath();
  }

  private _drawCircle(x: number, y: number): void {
    this.context.beginPath();
    this.context.strokeStyle = '#FF6F61';
    const radius = this.cell.size / 3;
    this.context.arc(x, y, radius, 0, 2 * Math.PI);
    this.context.stroke();
    this.context.closePath();
  }

  private _setCurrentPlayer(player: Players): void {
    this.currentPlayer = player;
  }

  private _move(event: any): void {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const indexCellX = Utilities.div(x, this.cell.size);
    const indexCellY = Utilities.div(y, this.cell.size);

    if (this.grid[indexCellY][indexCellX] !== 0) {
      return;
    }

    const posXSymbol = indexCellX * this.cell.size + this.cell.size / 2;
    const posYSymbol = indexCellY * this.cell.size + this.cell.size / 2;

    if (this.currentPlayer === Players.FIRST) {
      this._drawCircle(posXSymbol, posYSymbol);
      this._setCurrentPlayer(Players.SECOND);
      this.grid[indexCellY][indexCellX] = 1;
    } else {
      this._drawCross(posXSymbol, posYSymbol);
      this._setCurrentPlayer(Players.FIRST);
      this.grid[indexCellY][indexCellX] = -1;
    }

    this._checkState();
  }
}
</script>
