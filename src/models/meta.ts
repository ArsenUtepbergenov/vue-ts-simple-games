export interface SpriteMetadata {
  readonly src: string
  readonly numberSprites: number
  readonly numberAnimates: number
  readonly width: number
  readonly height: number
  readonly widthSprite: number
  readonly heightSprite: number
  readonly dSize: number
}

export class CharacterMetadata implements SpriteMetadata {
  src = require('../assets/character.png')
  numberSprites = 16
  numberAnimates = 4
  width = 1840
  height = 2400
  widthSprite = this.width / this.numberAnimates // 460
  heightSprite = this.height / this.numberAnimates // 600
  dSize = this.widthSprite / this.heightSprite
}
