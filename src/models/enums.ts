export const enum Directions {
  LEFT = 37,
  RIGHT = 39,
  UP = 38,
  DOWN = 40,
}

export const enum State {
  START,
  PLAY,
  OVER,
}

export const enum Control {
  RESTART = 82,
  Q = 81,
  W = 87,
  SPACE = 32,
}

export const enum BoardPong {
  WIDTH = 800,
  HEIGHT = 400,
}

export const enum BoardTanks {
  WIDTH = 640,
  HEIGHT = 640,
  SCALE_COEFFICIENT = 20,
}

export const enum BoardArkanoid {
  WIDTH = 800,
  HEIGHT = 720,
}

export const enum BoardSnake {
  WIDTH = 800,
  HEIGHT = 600,
}

export const enum BoardTicTacToe {
  WIDTH = 450,
  HEIGHT = 450,
}

export const enum BoardTetris {
  WIDTH = 320,
  HEIGHT = 540,
  SCALE_COEFFICIENT = 20,
}

export const enum Players {
  FIRST,
  SECOND,
  AI,
}

export const enum VelocityPaddle {
  SLOW = 8,
  MIDDLE = 14,
  FAST = 20,
}
