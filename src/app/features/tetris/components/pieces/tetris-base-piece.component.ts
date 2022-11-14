import { COLUMNS } from '../../../../core/constants/contants';
import { ColorsEnum } from '../../../../core/enums/common.enums';

export interface ITetrisPiece {
  x: number;
  y: number;
  color: string;
  shape: number[][];
  draw(): void;
  drawNext(context: CanvasRenderingContext2D): void;
  move(piece: ITetrisPiece): void;
}

export abstract class TetrisBasePiece implements ITetrisPiece {
  constructor(private ctx: CanvasRenderingContext2D, x?: number) {
    this.spawn(x ?? COLUMNS / 2 - 2);
  }

  public x: number = 0;
  public y: number = 0;
  public color: string = ColorsEnum.NONE;
  public shape: number[][] = [];

  protected isOfEvenBlocks: boolean = false;

  protected spawn(x: number) {
    this.x = x;
  }

  public draw() {
    this.ctx.fillStyle = this.color;

    this.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
        }
      });
    });
  }

  public drawNext(context: CanvasRenderingContext2D) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = this.color;
    this.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          context.fillRect(x, y, 1, 1);
        }
      });
    });
  }

  public move(piece: ITetrisPiece): void {
    this.x = piece.x;
    this.y = piece.y;
    this.shape = piece.shape;
  }
}
