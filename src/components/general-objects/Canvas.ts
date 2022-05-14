export default class Canvas {
  private canvas: HTMLCanvasElement
  private _context: CanvasRenderingContext2D | null

  constructor(canvas: HTMLCanvasElement, width: number, height: number) {
    this.canvas = canvas
    this._context = this.canvas.getContext('2d')
    this.canvas.width = width
    this.canvas.height = height
    this.canvas.setAttribute('tabindex', '1')
    this.canvas.focus()
  }

  public addEventListener(event: string, callback: EventListenerOrEventListenerObject): void {
    this.canvas.addEventListener(event, callback)
  }

  public removeEventListener(event: string, callback: EventListenerOrEventListenerObject): void {
    this.canvas.removeEventListener(event, callback)
  }

  get context(): CanvasRenderingContext2D | null {
    return this._context
  }

  get instance(): HTMLCanvasElement {
    return this.canvas
  }
}
