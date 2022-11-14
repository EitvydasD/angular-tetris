import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  BLOCK_SIZE,
  Colors,
  COLUMNS,
  GAME_SPEED,
  ROWS,
} from '../../../../core/constants/contants';
import { Key } from '../../../../core/enums/common.enums';
import { Points } from '../../../../core/enums/tetris.enums';
import { ActionKey } from '../../utils/action-key';
import { Actions } from '../../utils/actions';
import { ITetrisPiece } from '../pieces/tetris-base-piece.component';
import {
  TetrisPieceI,
  TetrisPieceJ,
  TetrisPieceL,
  TetrisPieceO,
  TetrisPieceS,
  TetrisPieceT,
  TetrisPieceZ,
} from '../pieces/tetris-piece.component';
import { TetrisBoard } from './tetris-board';

@Component({
  selector: 'tetris-board',
  templateUrl: './tetris-board.component.html',
  styleUrls: ['./tetris-board.component.scss'],
})
export class TetrisBoardComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  public canvas!: ElementRef<HTMLCanvasElement>;

  @ViewChild('next', { static: true })
  public canvasNext!: ElementRef<HTMLCanvasElement>;

  @HostListener('window:keydown', ['$event'])
  public keyEvent(event: KeyboardEvent) {
    if (!Actions.isValidKey(event)) {
      return;
    }

    if (Actions.isEscapeKey(event)) {
      this.gameOver();
      return;
    }

    event.preventDefault();
    const action = Actions.getActionFromEvent(event);
    let piece = action.execute(this.piece);

    if (Actions.isSpaceKey(event)) {
      while (this.board.isValidPiece(piece)) {
        this.board.score += Points.HARD_DROP;
        this.piece.move(piece);
        piece = this.dropAction.execute(this.piece);
      }
    } else if (this.board.isValidPiece(piece)) {
      this.piece.move(piece);
      if (Actions.isArrowDownKey(event)) {
        this.board.score += Points.SOFT_DROP;
      }
    }
  }

  public inProgress: boolean = false;
  public board!: TetrisBoard;

  private ctx!: CanvasRenderingContext2D;
  private ctxNext!: CanvasRenderingContext2D;
  private piece!: ITetrisPiece;
  private next!: ITetrisPiece;
  private requestId: number = 0;
  private time = {
    start: 0,
    elapsed: 0,
  };

  public getTetrisPiece(pieceName?: string): ITetrisPiece {
    const pieces = 'ILJOTSZ';
    const random = pieces[Math.floor(Math.random() * pieces.length)];

    switch (pieceName ?? random) {
      case 'I':
        return new TetrisPieceI(this.ctx);

      case 'L':
        return new TetrisPieceL(this.ctx);

      case 'J':
        return new TetrisPieceJ(this.ctx);

      case 'O':
        return new TetrisPieceO(this.ctx);

      case 'T':
        return new TetrisPieceT(this.ctx);

      case 'S':
        return new TetrisPieceS(this.ctx);

      case 'Z':
        return new TetrisPieceZ(this.ctx);

      default:
        return new TetrisPieceI(this.ctx);
    }
  }

  private readonly dropAction = new ActionKey(Key.ARROW_DOWN);

  public ngOnInit() {
    this.ctx =
      this.canvas.nativeElement.getContext('2d') ??
      new CanvasRenderingContext2D();

    this.ctx.canvas.width = COLUMNS * BLOCK_SIZE;
    this.ctx.canvas.height = ROWS * BLOCK_SIZE;

    this.ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

    this.board = new TetrisBoard(this.ctx, this.canvas);
    this.initNext();
    this.reset();
  }

  public start() {
    this.reset();
    this.inProgress = true;
    this.next = this.getTetrisPiece();
    this.piece = this.getTetrisPiece();
    this.next.drawNext(this.ctxNext);
    this.time.start = performance.now();

    if (this.requestId) {
      cancelAnimationFrame(this.requestId);
    }

    this.animate();
  }

  private initNext() {
    this.ctxNext =
      this.canvasNext.nativeElement.getContext('2d') ??
      new CanvasRenderingContext2D();

    this.ctxNext.canvas.width = 4 * BLOCK_SIZE;
    this.ctxNext.canvas.height = 4 * BLOCK_SIZE;

    this.ctxNext.scale(BLOCK_SIZE, BLOCK_SIZE);
  }

  private reset() {
    this.board.reset();
    this.time = { start: 0, elapsed: 0 };
  }

  private animate(now = 0) {
    this.time.elapsed = now - this.time.start;

    if (this.time.elapsed > GAME_SPEED) {
      this.time.start = now;
      if (!this.drop()) {
        this.gameOver();
        return;
      }
    }
    this.draw();
    this.requestId = requestAnimationFrame(this.animate.bind(this));
  }

  private draw() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.piece.draw();
    this.drawBoard();
  }

  private drop(): boolean {
    let piece = this.dropAction.execute(this.piece);
    if (this.board.isValidPiece(piece)) {
      this.piece.move(piece);
    } else {
      this.freeze();
      this.board.clearLines();

      if (this.piece.y === 0) {
        return false;
      }

      this.piece = this.next;
      this.next = this.getTetrisPiece();

      this.next.drawNext(this.ctxNext);
    }
    return true;
  }

  private freeze() {
    this.piece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.board.matrix[y + this.piece.y][x + this.piece.x] = value;
        }
      });
    });
  }

  private drawBoard() {
    this.board.matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.ctx.fillStyle = Colors[value];

          this.ctx.fillRect(x, y, 1, 1);
        }
      });
    });
  }

  private gameOver() {
    cancelAnimationFrame(this.requestId);
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(1, 3, 9, 1.2);
    this.ctx.font = '1px Arial';
    this.ctx.fillStyle = 'red';
    this.ctx.fillText('GAME OVER', 1.8, 4);
  }
}
