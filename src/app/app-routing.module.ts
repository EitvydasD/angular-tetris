import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tetris',
    loadChildren: () =>
      import('./features/tetris/tetris.module').then((m) => m.TetrisModule),
  },
  { path: '**', redirectTo: 'tetris' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
