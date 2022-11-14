import { COLUMNS } from '../../../../core/constants/contants';
import { ColorsEnum } from '../../../../core/enums/common.enums';
import { TetrisBasePiece } from './tetris-base-piece.component';

export class TetrisPieceI extends TetrisBasePiece {
  constructor(ctx: CanvasRenderingContext2D) {
    super(ctx);
  }

  public override shape = [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  public override color = ColorsEnum.CYAN;
}

export class TetrisPieceJ extends TetrisBasePiece {
  constructor(ctx: CanvasRenderingContext2D) {
    super(ctx);
  }

  public override shape = [
    [2, 0, 0],
    [2, 2, 2],
    [0, 0, 0],
  ];
  public override color = ColorsEnum.BLUE;
}

export class TetrisPieceL extends TetrisBasePiece {
  constructor(ctx: CanvasRenderingContext2D) {
    super(ctx);
  }

  public override shape = [
    [0, 0, 3],
    [3, 3, 3],
    [0, 0, 0],
  ];
  public override color = ColorsEnum.ORANGE;
}

export class TetrisPieceO extends TetrisBasePiece {
  constructor(ctx: CanvasRenderingContext2D) {
    super(ctx, COLUMNS / 2 - 1);
  }

  public override shape = [
    [4, 4],
    [4, 4],
  ];
  public override color = ColorsEnum.YELLOW;
}

export class TetrisPieceS extends TetrisBasePiece {
  constructor(ctx: CanvasRenderingContext2D) {
    super(ctx);
  }

  public override shape = [
    [0, 5, 5],
    [5, 5, 0],
    [0, 0, 0],
  ];
  public override color = ColorsEnum.GREEN;
}

export class TetrisPieceT extends TetrisBasePiece {
  constructor(ctx: CanvasRenderingContext2D) {
    super(ctx);
  }

  public override shape = [
    [0, 6, 0],
    [6, 6, 6],
    [0, 0, 0],
  ];
  public override color = ColorsEnum.PURPLE;
}

export class TetrisPieceZ extends TetrisBasePiece {
  constructor(ctx: CanvasRenderingContext2D) {
    super(ctx);
  }

  public override shape = [
    [7, 7, 0],
    [0, 7, 7],
    [0, 0, 0],
  ];
  public override color = ColorsEnum.RED;
}
