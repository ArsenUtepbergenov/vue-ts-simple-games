const PRESSED = 1
const RELEASED = 0

export default class KeyboardState {
  private keyStates: Map<string, number>
  private keyMap: Map<string, (state: number) => void>

  constructor() {
    this.keyStates = new Map()
    this.keyMap = new Map()
  }

  public addMapping(keyCode: string, callback: (state: number) => void): void {
    this.keyMap.set(keyCode, callback)
  }

  public handleEvent(event: KeyboardEvent): void {
    const { code } = event

    if (!this.keyMap.has(code)) {
      return
    }

    event.preventDefault()

    const keyState = event.type === 'keydown' ? PRESSED : RELEASED

    if (this.keyStates.get(code) === keyState) {
      return
    }

    this.keyStates.set(code, keyState)
    console.log(this.keyStates)

    const func = this.keyMap.get(code)

    if (func) {
      func(keyState)
    }
  }

  public listenTo(element: any): void {
    ;['keydown', 'keyup'].forEach((eventName: any) => {
      element.addEventListener(eventName, (event: KeyboardEvent) => {
        this.handleEvent(event)
      })
    })
  }
}
