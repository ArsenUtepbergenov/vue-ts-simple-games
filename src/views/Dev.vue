<template>
  <section>
    <canvas ref="game" />
  </section>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import Game from '@/components/mixins/Game'
import { IDynamicGame } from '@/models/interfaces'
import { CharacterAnimation, DevConfig, KeyCodes, State } from '@/models/enums'
import Board from '@/components/game-objects/Board'
import Sprite from '@/components/general-objects/Sprite'
import { CharacterMetadata } from '@/models/meta'
import KeyboardState from '@/components/controls/KeyboardState'

@Component
export default class Dev extends Game implements IDynamicGame {
  private loop = 0
  private spriteCharacter: Sprite | null = null
  private currentAnimation = CharacterAnimation.STAND
  private input = new KeyboardState()

  constructor() {
    super()
  }

  public mounted() {
    this.run()
  }

  public unmounted() {
    this.stop()
  }

  public run(): void {
    try {
      this._initInstance()
      this.start()
    } catch (error) {
      console.error(error)
    }
  }

  public restart(): void {}

  public update(): void {
    this.board.draw()
    this.spriteCharacter?.update(10, 30, this.currentAnimation)
  }

  public start(): void {
    this.update()
    if (!this.isOver) {
      this.loop = requestAnimationFrame(this.start)
    }
  }

  public stop(): void {
    if (this.loop) {
      cancelAnimationFrame(this.loop)
      this.globalState = State.OVER
    }
  }

  private _initCharacter(): void {
    this.spriteCharacter = new Sprite({
      context: this.context,
      meta: new CharacterMetadata(),
      animation: CharacterAnimation.STAND,
      size: 54,
      posX: 10,
      posY: 30,
    })
  }

  private _initInstance() {
    if (!this.isInitedCanvas) {
      if (!this._initCanvas(DevConfig.BOARD_WIDTH, DevConfig.BOARD_HEIGHT)) {
        throw new Error(`Can't initialize canvas for ${Dev.name}`)
      }
    }

    this.globalState = State.PLAY

    this.input.addMapping(KeyCodes.RIGHT, (keyState) => {
      keyState ? (this.currentAnimation = CharacterAnimation.STAND_RIGHT) : undefined
    })
    this.input.listenTo(this.canvas?.instance)

    this.board = new Board(this.context, this.width, this.height)
    this.board.draw()

    this._initCharacter()
  }
}
</script>
