const pieceT: number[][] = [
  [0, 0, 0],
  [1, 1, 1],
  [0, 1, 0],
];

const pieceO: number[][] = [
  [2, 2],
  [2, 2],
];

const pieceL: number[][] = [
  [0, 3, 0],
  [0, 3, 0],
  [0, 3, 3],
];

const pieceJ: number[][] = [
  [0, 4, 0],
  [0, 4, 0],
  [4, 4, 0],
];

const pieceI: number[][] = [
  [0, 5, 0, 0],
  [0, 5, 0, 0],
  [0, 5, 0, 0],
  [0, 5, 0, 0],
];

const pieceS: number[][] = [
  [0, 6, 6],
  [6, 6, 0],
  [0, 0, 0],
];

const pieceZ: number[][] = [
  [7, 7, 0],
  [0, 7, 7],
  [0, 0, 0],
];

const colors: any[] = [
  null,
  '#9c27b0',
  '#ffeb3b',
  '#ff9800',
  '#2196f3',
  '#00bcd4',
  '#4caf50',
  '#f44336',
];

export function createPiece(type: string): any {
  switch (type) {
    case 'T':
      return pieceT;
    case 'O':
      return pieceO;
    case 'L':
      return pieceL;
    case 'I':
      return pieceI;
    case 'J':
      return pieceJ;
    case 'S':
      return pieceS;
    case 'Z':
      return pieceZ;
  }
}

export function drawPiece(context: any, matrix: number[][], offset: any): void {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        context.fillStyle = colors[value];
        context.fillRect(x + offset.x, y + offset.y, 1, 1);
      }
    });
  });
}
