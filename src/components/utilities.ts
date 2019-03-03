export default class Utilities {
  public static div(numerator: number, denominator: number): number {
    return (numerator - numerator % denominator) / denominator;
  }

  public static randomIntByInterval(min: number, max: number): number {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }

  public static getDistance(x1: number, x2: number, y1: number, y2: number): number {
    return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
  }

  public static applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach((baseCtor) => {
      Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
        derivedCtor.prototype[name] = baseCtor.prototype[name];
      });
    });
  }
}
