import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartMenuComponent } from './start-menu/start-menu.component'

const routes: Routes = [
  {
    path: 'games',
    loadChildren: () =>
      import('../app/games/games.module').then((m) => m.GamesModule),
  },
  {
    path: '**',
    component: StartMenuComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
