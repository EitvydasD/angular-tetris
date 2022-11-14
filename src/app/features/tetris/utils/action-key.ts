import { Key } from '../../../core/enums/common.enums';
import { clone } from '../../../core/utils/utils';
import { ITetrisPiece } from '../components/pieces/tetris-base-piece.component';

export class ActionKey {
  constructor(key: string) {
    this.key = key;
  }
  public key: string;

  public execute = (piece: ITetrisPiece): ITetrisPiece => {
    let pieceClone: ITetrisPiece = clone(piece);
    switch (this.key) {
      case Key.ARROW_LEFT: {
        pieceClone.x--;
        return pieceClone;
      }
      case Key.ARROW_RIGHT: {
        pieceClone.x++;
        return pieceClone;
      }
      case Key.ARROW_DOWN: {
        pieceClone.y++;
        return pieceClone;
      }
      case Key.SPACE: {
        pieceClone.y++;
        return pieceClone;
      }
      case Key.ARROW_UP: {
        for (let y = 0; y < pieceClone.shape.length; ++y) {
          for (let x = 0; x < y; ++x) {
            [pieceClone.shape[x][y], pieceClone.shape[y][x]] = [
              pieceClone.shape[y][x],
              pieceClone.shape[x][y],
            ];
          }
        }
        pieceClone.shape.forEach((row) => row.reverse());
        return pieceClone;
      }
      default:
        return piece;
    }
  };
}
