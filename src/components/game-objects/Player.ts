import Score from './Score';

export default class Player {
  private name: string = '';
  private score: Score;
  private lives: number = 0;

  constructor(name: string = 'default name', lives: number = 3) {
    this.score = new Score();
    this.name = name;
    this.lives = lives;
  }

  public addLive(lives: number): void {
    this.lives += lives;
  }

  public subtractLive(lives: number): void {
    if (lives < 0) {
      lives = Math.abs(lives);
    }
    if (this.lives - lives < 0) {
      return;
    }
    this.lives -= lives;
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

  get getLives(): number {
    return this.lives;
  }

  get getName(): string {
    return this.name;
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
