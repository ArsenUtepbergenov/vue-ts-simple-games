<template>
  <div class="tictactoe">
    <div class="modes">
      <Button @click="setOpponent('AI')" class="btn btn--bg-scarlet">
        Play with AI
      </Button>
      <Button @click="setOpponent('Two')" class="btn btn--bg-light-blue">
        Game for two
      </Button>
    </div>
    <Scores :scores="getScores" />
    <div class="tictactoe__game">
      <canvas ref="game" />
      <Button @click="restart" class="btn btn--bg-green m-2">
        Restart
      </Button>
      <template v-if="isMessage">
        <Message :message="getMessage" :type="getStyleOfMessage" />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator'
import Utilities from '@/utils/utilities'
import { IStaticGame } from '@/models/interfaces'
import { BoardTicTacToe, State, Players, MsgType } from '@/models/enums'
import Board from '@/components/game-objects/Board'
import Player from '@/components/game-objects/Player'
import Message from '@/components/ui/Message.vue'
import Scores from '@/components/ui/Scores.vue'
import Game from '@/components/mixins/Game'
import Button from '@/components/ui/Button.vue'

@Component({
  components: {
    Message,
    Scores,
    Button,
  },
})
export default class TicTacToeGame extends Game implements IStaticGame {
  private currentPlayer: Players = Players.FIRST
  private players: Players[] = [Players.FIRST, Players.SECOND, Players.AI]
  private winFirstPlayer: number = 0
  private winSecondPlayer: number = 0
  private firstPlayer: Player
  private secondPlayer: Player
  private aiPlayer: Player
  private grid: number[][] = [[], [], []]
  private sizeGrid: number = 0
  private cellSize: number = 0
  private currentOpponent: string = ''
  private scores: object[] = []

  constructor() {
    super()
    this.firstPlayer = new Player()
    this.secondPlayer = new Player()
    this.aiPlayer = new Player()
  }

  public run(): void {
    if (this._initInstance() === false) {
      return
    }
  }

  public restart(): void {
    this._reset()
    if (this.currentOpponent === 'Two') {
      this._playWithHuman()
    } else if (this.currentOpponent === 'AI') {
      this._playWithAI()
    } else {
      return
    }
  }

  public setOpponent(opponent: string): void {
    this.currentOpponent = opponent
  }

  public mounted() {
    this.run()
  }

  get getScores() {
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
    ]
    return this.scores
  }

  get getFirstPlayerScore(): number {
    return this.firstPlayer.getScore
  }

  get getSecondPlayerScore(): number {
    return this.secondPlayer.getScore
  }

  get getAiScore(): number {
    return this.aiPlayer.getScore
  }

  @Watch('currentOpponent')
  private _rerun(value: string): void {
    this.restart()
  }

  private _playWithAI(): void {
    // TODO
  }

  private _playWithHuman(): void {
    const clickListener = (event: any) => this._move(event)
    this.canvas.addEventListener('click', clickListener)

    this.globalState = State.PLAY

    const timerId = setInterval(() => {
      if (this.globalState === State.OVER) {
        this.canvas.removeEventListener('click', clickListener)
        clearInterval(timerId)
        return
      }
    }, 100)
  }

  private _reset(): void {
    this.globalState = State.OVER
    this._resetMessage()
    this.board.draw()
    this._resetGrid()
    this._drawGrid()
  }

  private _initInstance(): boolean {
    if (this.isInitedCanvas === false) {
      if (this._initCanvas(BoardTicTacToe.WIDTH, BoardTicTacToe.HEIGHT) === false) {
        return false
      }
    }

    this.sizeGrid = BoardTicTacToe.SIZE_GRID
    this._generateCurrentPlayer()

    this.board = new Board(this.context, this.width, this.height)
    this.board.draw()

    this._initGrid()
    this._drawGrid()

    return true
  }

  private _generateCurrentPlayer(): void {
    const randomIndex = Utilities.randomIntByInterval(0, 1)
    this.currentPlayer = this.players[randomIndex]
    if (this.currentPlayer === Players.FIRST) {
      this.winFirstPlayer = this.sizeGrid
      this.winSecondPlayer = -this.sizeGrid
    }
    if (this.currentPlayer === Players.SECOND) {
      this.winSecondPlayer = this.sizeGrid
      this.winFirstPlayer = -this.sizeGrid
    }
  }

  private _resetGrid(): void {
    for (let i = 0; i < this.sizeGrid; i++) {
      this.grid[i].fill(0)
    }
  }

  private _initGrid(): void {
    for (let i = 0; i < this.sizeGrid; i++) {
      this.grid[i] = new Array<number>(this.sizeGrid).fill(0)
    }
  }

  private _drawGrid(): void {
    this.context.lineWidth = 3
    const canvasSize = Math.min(this.width, this.height)
    this.cellSize = Math.floor(canvasSize / this.sizeGrid)

    this.context.strokeStyle = '#607d8b'

    for (let x = 1; x < this.sizeGrid; x++) {
      this.context.beginPath()
      this.context.moveTo(x * this.cellSize, 0)
      this.context.lineTo(x * this.cellSize, this.cellSize * this.sizeGrid)
      this.context.stroke()
    }

    for (let y = 1; y < this.sizeGrid; y++) {
      this.context.beginPath()
      this.context.moveTo(0, y * this.cellSize)
      this.context.lineTo(this.cellSize * this.sizeGrid, y * this.cellSize)
      this.context.stroke()
    }
  }

  private _checkState(): void {
    let sumRow = 0
    let sumColumn = 0
    let mainDiagonal = 0
    let sideDiagonal = 0
    const winFirstPlayer = this.winFirstPlayer
    const winSecondPlayer = this.winSecondPlayer
    let numberNotZeros = 0

    for (let i = 0; i < this.sizeGrid; i++) {
      for (let j = 0; j < this.sizeGrid; j++) {
        if (this.grid[i][j] !== 0) {
          numberNotZeros++
        }
      }
    }

    if (numberNotZeros === this.sizeGrid * this.sizeGrid) {
      this._gameOver('draw')
    }

    for (let x = 0; x < this.sizeGrid; x++) {
      for (let y = 0; y < this.sizeGrid; y++) {
        sumRow += this.grid[x][y]
        sumColumn += this.grid[y][x]
        if (sumRow === winFirstPlayer || sumColumn === winFirstPlayer) {
          this._gameOver('first')
        }
        if (sumRow === winSecondPlayer || sumColumn === winSecondPlayer) {
          this._gameOver('second')
        }
      }
      sumRow = 0
      sumColumn = 0
    }

    for (let x = 0; x < this.sizeGrid; x++) {
      mainDiagonal += this.grid[x][x]
      if (mainDiagonal === winFirstPlayer) {
        this._gameOver('first')
      }
      if (mainDiagonal === winSecondPlayer) {
        this._gameOver('second')
      }
    }

    for (let x = 0; x < this.sizeGrid; x++) {
      sideDiagonal += this.grid[x][this.sizeGrid - 1 - x]
      if (sideDiagonal === winFirstPlayer) {
        this._gameOver('first')
      }
      if (sideDiagonal === winSecondPlayer) {
        this._gameOver('second')
      }
    }
  }

  private _gameOver(winner: string): void {
    this.globalState = State.OVER
    switch (winner) {
      case 'first':
        this.firstPlayer.addScore(1)
        this._setMessage('The first player won', MsgType.OVER)
        break
      case 'second':
        this.secondPlayer.addScore(1)
        this._setMessage('The second player won', MsgType.OVER)
        break
      case 'draw':
        this._setMessage('The game is draw', MsgType.OVER)
        break
    }
  }

  private _drawCross(x: number, y: number): void {
    const step = this.cellSize / 3
    this.context.strokeStyle = '#6B5B95'
    this.context.beginPath()
    this.context.moveTo(x - step, y - step)
    this.context.lineTo(x + step, y + step)
    this.context.stroke()
    this.context.beginPath()
    this.context.moveTo(x + step, y - step)
    this.context.lineTo(x - step, y + step)
    this.context.stroke()
  }

  private _drawCircle(x: number, y: number): void {
    const radius = this.cellSize / 3
    this.context.strokeStyle = '#FF6F61'
    this.context.beginPath()
    this.context.arc(x, y, radius, 0, 2 * Math.PI)
    this.context.stroke()
  }

  private _setCurrentPlayer(player: Players): void {
    this.currentPlayer = player
  }

  private _move(event: any): void {
    const rect = event.target.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const indexCellX = Utilities.div(x, this.cellSize)
    const indexCellY = Utilities.div(y, this.cellSize)

    if (this.grid[indexCellY][indexCellX] !== 0) {
      return
    }

    const posXSymbol = indexCellX * this.cellSize + this.cellSize / 2
    const posYSymbol = indexCellY * this.cellSize + this.cellSize / 2

    if (this.currentPlayer === Players.FIRST) {
      this._drawCircle(posXSymbol, posYSymbol)
      this._setCurrentPlayer(Players.SECOND)
      this.grid[indexCellY][indexCellX] = 1
    } else {
      this._drawCross(posXSymbol, posYSymbol)
      this._setCurrentPlayer(Players.FIRST)
      this.grid[indexCellY][indexCellX] = -1
    }

    this._checkState()
  }
}
</script>
