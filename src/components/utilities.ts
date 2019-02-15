export default class Utilities {
  public static div(numerator: number, denominator: number): number {
    return (numerator - numerator % denominator) / denominator;
  }

  public static randomIntByInterval(min: number, max: number): number {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }
}
