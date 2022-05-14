export default class Canvas {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D | null

  constructor(canvas: any, width: number, height: number) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')
    this.canvas.width = width
    this.canvas.height = height
    this.canvas.setAttribute('tabindex', '1')
    this.canvas.focus()
  }

  public addEventListener(event: string, callback: any): void {
    this.canvas.addEventListener(event, callback)
  }

  public removeEventListener(event: string, callback: any): void {
    this.canvas.removeEventListener(event, callback)
  }

  get context(): CanvasRenderingContext2D | null {
    return this.ctx
  }
}
