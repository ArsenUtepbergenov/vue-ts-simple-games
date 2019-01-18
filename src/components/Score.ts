export default class Score {
  private previousScore: number = 0;
  private score: number = 0;

  public increase(score: number): void {
    this.score += score;
    this._updatePreviousScore();
  }

  public decrease(score: number): void {
    if (this.score - score <= 0) {
      return;
    }
    this.score -= score;
    this._updatePreviousScore();
  }

  public reset() {
    this.previousScore = 0;
    this.score = 0;
  }

  get getScore(): number {
    return this.score;
  }

  get getPreviousScore(): number {
    return this.previousScore;
  }

  private _updatePreviousScore(): void {
    this.previousScore = this.score;
  }
}
