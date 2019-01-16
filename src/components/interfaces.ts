export interface IGameDynamic {
  update(): void;
}

export interface IGameStatic {
  run(): void;
  restart(): void;
}

export interface IDrawable {
  draw(): void;
}
