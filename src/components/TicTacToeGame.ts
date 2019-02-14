import Vue from 'vue';
import Component from 'vue-class-component';
import { Utilities } from './utilities';
import { IGameStatic } from './interfaces';
import { BoardTicTacToe, State, Players } from './enums';
import Canvas from './Canvas';
import Board from './Board';
import Player from './Player';

@Component({
})
export default class TicTacToeGame extends Vue implements IGameStatic {
  private canvas: any = null;
  private context: any;
  private width = BoardTicTacToe.WIDTH;
  private height = BoardTicTacToe.HEIGHT;
  private globalState: State = State.START;
  private isInitCanvas: boolean = false;
  private currentPlayer: Players = Players.FIRST_PLAYER;
  private players: Players[] = [Players.FIRST_PLAYER, Players.SECOND_PLAYER];
  private winFirstPlayer: number = 0;
  private winSecondPlayer: number = 0;
  private board: any;
  private firstPlayer: Player;
  private secondPlayer: Player;
  private aiPlayer: Player;
  private grid: number[][] = [[], []];
  private sizeGrid: number = 0;
  private cell: {size: number};

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

    const clickListener = (event: any) => {
      this._handleClick(event);
    };
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

  public restart(): void {
    this._reset();
    this.run();
  }

  public mounted() {
    this.run();
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

  private _reset(): void {
    this.globalState = State.OVER;
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
    if (this.currentPlayer === Players.FIRST_PLAYER) {
      this.winFirstPlayer = this.sizeGrid;
      this.winSecondPlayer = -this.sizeGrid;
    }
    else if (this.currentPlayer === Players.SECOND_PLAYER) {
      this.winSecondPlayer = this.sizeGrid;
      this.winFirstPlayer = -this.sizeGrid;
    }
  }

  private _initGrid() {
    for (let i = 0; i < this.sizeGrid; i++) {
      this.grid[i] = new Array<number>(this.sizeGrid).fill(0);
    }
  }

  private _drawGrid() {
    const widthBoarder = this.context.lineWidth = 5;
    this.cell = {
      size: Math.round((Math.min(this.width, this.height) -
                                (this.sizeGrid * 2 * widthBoarder)) /
                                 this.sizeGrid + 2 * widthBoarder),
    };
    for (let x = 0; x < this.sizeGrid; x++) {
      for (let y = 0; y < this.sizeGrid; y++) {
        this.context.beginPath();
        this.context.strokeStyle = '#784455';
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
        console.log('first player won');
        break;
      case 'second':
        this.secondPlayer.addScore(1);
        console.log('second player won');
        break;
      case 'draw':
        console.log('the game is draw');
        break;
      default:
        console.error('unrecorded situation');
    }
  }

  private _drawCross(x: number, y: number): void {
    this.context.beginPath();
    this.context.strokeStyle = '#696775';
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
    this.context.strokeStyle = '#163416';
    const radius = this.cell.size / 3;
    this.context.arc(x, y, radius, 0, 2 * Math.PI);
    this.context.stroke();
    this.context.closePath();
  }

  private _handleClick(event: any): void {
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

    if (this.currentPlayer === Players.FIRST_PLAYER) {
      this._drawCircle(posXSymbol, posYSymbol);
      this.currentPlayer = Players.SECOND_PLAYER;
      this.grid[indexCellY][indexCellX] = 1;
    }
    else if (this.currentPlayer === Players.SECOND_PLAYER) {
      this._drawCross(posXSymbol, posYSymbol);
      this.currentPlayer = Players.FIRST_PLAYER;
      this.grid[indexCellY][indexCellX] = -1;
    }

    this._checkState();
  }
}
