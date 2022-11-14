import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TetrisBasePiece } from '../pieces/tetris-base-piece.component';

import { TetrisBoardComponent } from './tetris-board.component';

describe('TetrisBoardComponent', () => {
  let component: TetrisBoardComponent;
  let fixture: ComponentFixture<TetrisBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TetrisBoardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TetrisBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create I piece', () => {
    const piece = component.getTetrisPiece('I');

    expect(piece.shape).toEqual([
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);

    expect(piece.color).toEqual('cyan');
  });

  it('should create random piece', () => {
    const piece = component.getTetrisPiece();
    expect(piece).toBeInstanceOf(TetrisBasePiece);
    expect(piece).toBeTruthy();
  });
});
