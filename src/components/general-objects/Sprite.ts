import { CharacterAnimation, CharacterAnimations } from '@/models/enums'
import { SpriteMetadata } from '@/models/meta'
import { SpriteConfig } from '@/models/types'

class Sprite {
  private image: HTMLImageElement = new Image()
  private context: CanvasRenderingContext2D
  private meta: SpriteMetadata
  private offsetX: number = 0
  private offsetY: number = 0
  private isLoaded = false
  private posX = 0
  private posY = 0
  private size = 0

  constructor(config: SpriteConfig) {
    const { context, meta, animation, posX, posY, size } = config
    this.context = context
    this.meta = meta
    const [sX, sY] = CharacterAnimations[animation]
    this.offsetX = sX * this.meta.widthSprite
    this.offsetY = sY * this.meta.heightSprite
    this.posX = posX
    this.posY = posY
    this.size = size

    this.image.onload = () => {
      this.isLoaded = true
    }
    this.draw(this.posX, this.posY)
    this.image.src = this.meta.src
  }

  public draw(posX: number, posY: number): void {
    this.isLoaded &&
      this.context.drawImage(
        this.image,
        this.offsetX,
        this.offsetY,
        this.meta.widthSprite,
        this.meta.heightSprite,
        posX,
        posY,
        this.size,
        this.size / this.meta.dSize,
      )
  }

  public update(posX: number, posY: number, animation: CharacterAnimation): void {
    const [sX, sY] = CharacterAnimations[animation]
    this.offsetX = sX * this.meta.widthSprite
    this.offsetY = sY * this.meta.heightSprite
    this.draw(posX, posY)
  }
}

export default Sprite
