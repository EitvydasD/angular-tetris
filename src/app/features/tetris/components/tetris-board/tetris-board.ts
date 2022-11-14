import { ElementRef } from '@angular/core';
import { COLUMNS, ROWS } from '../../../../core/constants/contants';
import { Points } from '../../../../core/enums/tetris.enums';
import { ITetrisPiece } from '../pieces/tetris-base-piece.component';

export class TetrisBoard {
  constructor(
    public ctx: CanvasRenderingContext2D,
    public canvas: ElementRef<HTMLCanvasElement>
  ) {
    // Nothing
  }

  public matrix: number[][] = Array.from({ length: ROWS }, () =>
    Array(COLUMNS).fill(0)
  );

  public score: number = 0;
  public lines: number = 0;

  public reset(): void {
    this.matrix = Array.from({ length: ROWS }, () => Array(COLUMNS).fill(0));
    this.score = 0;
    this.lines = 0;
  }

  public isValidPiece(piece: ITetrisPiece): boolean {
    return piece.shape.every((row, dy) => {
      return row.every((value, dx) => {
        const x = piece.x + dx;
        const y = piece.y + dy;

        return this.isEmpty(value) || this.isValid(x, y);
      });
    });
  }

  private isEmpty(value: number): boolean {
    return value === 0;
  }

  private isValid(x: number, y: number): boolean {
    if (this.matrix[y] === undefined) {
      return false;
    }
    if (this.matrix[y][x] === undefined) {
      return false;
    }

    return !this.isOccupied(x, y);
  }

  private isOccupied(x: number, y: number): boolean {
    return this.matrix[y][x] !== 0;
  }

  public clearLines() {
    let lines = 0;
    this.matrix.forEach((row, y) => {
      if (row.every((value) => value !== 0)) {
        lines++;
        this.matrix.splice(y, 1);
        this.matrix.unshift(Array(COLUMNS).fill(0));
      }
    });
    if (lines > 0) {
      this.calculateLinesClearedPoints();
      this.lines += lines;
    }
  }

  private calculateLinesClearedPoints(): void {
    const lineClearPoints =
      this.lines === 1
        ? Points.SINGLE
        : this.lines === 2
        ? Points.DOUBLE
        : this.lines === 3
        ? Points.TRIPLE
        : this.lines === 4
        ? Points.TETRIS
        : 0;

    this.score += lineClearPoints;
  }
}
