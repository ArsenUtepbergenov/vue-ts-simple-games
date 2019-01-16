export interface IGameDynamic {
  update(): void;
}

export interface IGameStatic {
  run(): void;
  restart(): void;
}
