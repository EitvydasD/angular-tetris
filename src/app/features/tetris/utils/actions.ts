import { Key } from '../../../core/enums/common.enums';
import { ActionKey } from './action-key';

export class Actions {
  private static readonly escape = new ActionKey(Key.ESCAPE);
  private static readonly arrowLeft = new ActionKey(Key.ARROW_LEFT);
  private static readonly arrowRight = new ActionKey(Key.ARROW_RIGHT);
  private static readonly arrowDown = new ActionKey(Key.ARROW_DOWN);
  private static readonly arrowUp = new ActionKey(Key.ARROW_UP);
  private static readonly space = new ActionKey(Key.SPACE);

  public static isArrowLeftKey = (event: KeyboardEvent): boolean => {
    return event.key === this.arrowLeft.key;
  };

  public static isArrowRightKey = (event: KeyboardEvent): boolean => {
    return event.key === this.arrowRight.key;
  };

  public static isArrowDownKey = (event: KeyboardEvent): boolean => {
    return event.key === this.arrowDown.key;
  };

  public static isArrowUpKey = (event: KeyboardEvent): boolean => {
    return event.key === this.arrowUp.key;
  };

  public static isSpaceKey = (event: KeyboardEvent): boolean => {
    return event.key === this.space.key;
  };

  public static isEscapeKey = (event: KeyboardEvent): boolean => {
    return event.key === this.escape.key;
  };

  public static isValidKey = (event: KeyboardEvent): boolean => {
    return (
      this.isArrowLeftKey(event) ||
      this.isArrowRightKey(event) ||
      this.isArrowDownKey(event) ||
      this.isArrowUpKey(event) ||
      this.isSpaceKey(event) ||
      this.isEscapeKey(event)
    );
  };

  public static getActionFromEvent = (event: KeyboardEvent): ActionKey => {
    switch (event.key) {
      case Key.ARROW_LEFT:
        return this.arrowLeft;
      case Key.ARROW_RIGHT:
        return this.arrowRight;
      case Key.ARROW_DOWN:
        return this.arrowDown;
      case Key.SPACE:
        return this.space;
      case Key.ARROW_UP:
        return this.arrowUp;
      case Key.ESCAPE:
        return this.escape;
      default:
        return this.arrowDown;
    }
  };
}
