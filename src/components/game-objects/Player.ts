import Score from './Score';

export default class Player {
  private _name: string = '';
  private score: Score;

  constructor(name: string = 'default name') {
    this.score = new Score();
    this._name = name;
  }

  public addScore(score: number): void {
    this.score.increase(score);
  }

  public subtractScore(score: number): void {
    this.score.decrease(score);
  }

  public scoreToZero(): void {
    this.score.reset();
  }

  get getName(): string {
    return this._name;
  }

  get getScore(): number {
    return this.score.getScore;
  }

  get getPreviousScore(): number {
    return this.score.getPreviousScore;
  }

  get getBest(): number {
    return this.score.getBest;
  }
}
