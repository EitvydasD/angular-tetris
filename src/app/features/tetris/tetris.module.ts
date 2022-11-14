import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TetrisBoardComponent } from './components/tetris-board/tetris-board.component';
import { TetrisComponent } from './tetris.component';
import { TetrisRoutingModule } from './tetris.routing';

@NgModule({
  declarations: [TetrisComponent, TetrisBoardComponent],
  imports: [CommonModule, TetrisRoutingModule],
})
export class TetrisModule {}
