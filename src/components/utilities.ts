export namespace Utilities {
  export function div(numerator: number, denominator: number): number {
    return (numerator - numerator % denominator) / denominator;
  }

  export function randomIntByInterval(min: number, max: number): number {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }
}
