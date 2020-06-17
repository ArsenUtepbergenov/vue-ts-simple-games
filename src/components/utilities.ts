import Rect from './general-objects/Rect';
import Circle from './general-objects/Circle';
import { IRect, IMouseCoordinates } from './interfaces';

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

  public static createMatrix(width: number, height: number): number[][] {
    const matrix: number[][] = [];
    while (height--) {
      matrix.push(new Array(width).fill(0));
    }
    return matrix;
  }

  public static getMouseCoordinates(event: any): IMouseCoordinates {
    const rect = event.target && event.target.getBoundingClientRect();
    const x: number = event.clientX - rect.left;
    const y: number = event.clientY - rect.top;
    return {x, y};
  }

  public static checkCollisionRectOfCircle(rect: Rect, circle: Circle): boolean {
    if ((rect.x < circle.x + circle.getRadius) &&
        (rect.x + rect.getWidth > circle.x - circle.getRadius) &&
        (rect.y < circle.y + circle.getRadius) &&
        (rect.y + rect.getHeight > circle.y - circle.getRadius)) {
          return true;
        }
    return false;
  }

  public static checkCollisionRectOfRect(firstRect: IRect, secondRect: IRect): boolean {
    if ((firstRect.x < secondRect.x + secondRect.getWidth) &&
        (firstRect.x + firstRect.getWidth > secondRect.x) &&
        (firstRect.y < secondRect.y + secondRect.getHeight) &&
        (firstRect.y + firstRect.getHeight > secondRect.y)) {
          return true;
        }
    return false;
  }

  public static applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach((baseCtor) => {
      Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
        derivedCtor.prototype[name] = baseCtor.prototype[name];
      });
    });
  }
}
