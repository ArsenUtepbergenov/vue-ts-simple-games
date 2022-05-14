import { Vue, Component } from 'vue-property-decorator'
import { State } from '@/models/enums'
import Canvas from '../general-objects/Canvas'

@Component
export default class Game extends Vue {
  public canvas: Canvas | null = null
  public context: any
  public width = 0
  public height = 0
  public globalState: State = State.START
  public isInitedCanvas = false
  public board: any
  public message: string = ''
  public styleOfMessage: string = ''

  protected _initCanvas(width: number, height: number): boolean {
    try {
      if (!this.$refs.game) {
        throw new Error(`Can't find canvas node element`)
      }
      this.width = width
      this.height = height
      this.canvas = new Canvas(this.$refs.game as HTMLCanvasElement, width, height)
      this.context = this.canvas.context
      this.isInitedCanvas = true
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  public clearContext(): void {
    if (this.isInitedCanvas) {
      this.context.save()
      this.context.setTransform(1, 0, 0, 1, 0, 0)
      this.context.clearRect(0, 0, this.width, this.height)
      this.context.restore()
    }
  }

  public get isOver(): boolean {
    return this.globalState === State.OVER
  }

  public get getMessage(): string {
    return this.message
  }

  public get getStyleOfMessage(): string {
    return this.styleOfMessage
  }

  public get isMessage(): boolean {
    return this.isOver && this.message !== ''
  }

  public _resetMessage(): void {
    this.message = ''
    this.styleOfMessage = ''
  }

  public _setMessage(message: string, styleOfMessage: string): void {
    this.message = message
    this.styleOfMessage = styleOfMessage
  }
}
