import { Key } from '../../../core/enums/common.enums';
import { ITetrisPiece } from '../components/pieces/tetris-base-piece.component';
import { ActionKey } from './action-key';

describe('ActionKey', () => {
  it('should flip the piece', () => {
    const piece = {
      x: 0,
      y: 0,
      shape: [
        [1, 2],
        [3, 4],
      ],
      color: 'red',
    } as ITetrisPiece;

    const action = new ActionKey(Key.ARROW_UP);

    const flipped = action.execute(piece);

    expect(flipped.shape).toEqual([
      [3, 1],
      [4, 2],
    ]);

    expect(flipped.x).toEqual(0);

    expect(flipped.y).toEqual(0);

    expect(flipped.color).toEqual('red');
  });
});
