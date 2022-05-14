export const enum Directions {
  LEFT = 37,
  RIGHT = 39,
  UP = 38,
  DOWN = 40,
}

export const enum KeyCodes {
  LEFT = 'ArrowLeft',
  RIGHT = 'ArrowRight',
  DOWN = 'ArrowDown',
  UP = 'ArrowUp',
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
  SIZE_GRID = 3,
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

export enum MsgType {
  DEFAULT = 'message--default',
  OVER = 'message--over',
}

export enum DevConfig {
  BOARD_WIDTH = 720,
  BOARD_HEIGHT = 500,
}

export enum CharacterAnimation {
  STAND,
  STAND_RIGHT,
  STAND_BACK,
  STAND_LEFT,
}

export const CharacterAnimations = {
  [CharacterAnimation.STAND]: [1, 0],
  [CharacterAnimation.STAND_RIGHT]: [1, 1],
  [CharacterAnimation.STAND_BACK]: [1, 3],
  [CharacterAnimation.STAND_LEFT]: [0, 2],
}
