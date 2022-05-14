import { CharacterAnimation } from './enums'
import { SpriteMetadata } from './meta'

export type SpriteConfig = {
  context: CanvasRenderingContext2D
  meta: SpriteMetadata
  animation: CharacterAnimation
  size: number
  posX: number
  posY: number
}
