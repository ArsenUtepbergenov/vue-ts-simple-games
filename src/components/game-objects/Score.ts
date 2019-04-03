export default class Score {
  private previousScore: number;
  private score: number;
  private best: number;

  constructor() {
    this.previousScore = 0;
    this.score = 0;
    this.best = 0;
  }

  public increase(score: number): void {
    score = Math.abs(score);
    this.score += score;
    this._updatePreviousScore();
    this._updateBest();
  }

  public decrease(score: number): void {
    if (score < 0) {
      score = Math.abs(score);
    }
    if (this.score - score < 0) {
      return;
    }
    this.score -= score;
    this._updatePreviousScore();
  }

  public reset(): void {
    this.score = 0;
  }

  get getScore(): number {
    return this.score;
  }

  get getPreviousScore(): number {
    return this.previousScore;
  }

  get getBest(): number {
    return this.best;
  }

  private _updatePreviousScore(): void {
    this.previousScore = this.score;
  }

  private _updateBest(): void {
    if (this.score > this.best) {
      this.best = this.score;
    }
  }
}
