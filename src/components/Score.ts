export default class Score {
  private _previousScore: number;
  private _score: number;
  private _best: number;

  constructor() {
    this._previousScore = 0;
    this._score = 0;
    this._best = 0;
  }

  public increase(score: number): void {
    this._score += score;
    this._updatePreviousScore();
    this._updateBest();
  }

  public decrease(score: number): void {
    if (this._score - score <= 0) {
      return;
    }
    this._score -= score;
    this._updatePreviousScore();
  }

  public reset(): void {
    this._score = 0;
  }

  get score(): number {
    return this._score;
  }

  get previousScore(): number {
    return this._previousScore;
  }

  get best(): number {
    return this._best;
  }

  private _updatePreviousScore(): void {
    this._previousScore = this._score;
  }

  private _updateBest(): void {
    if (this._score > this._best) {
      this._best = this._score;
    }
  }
}
