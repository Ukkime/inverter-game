import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ClassicGameComponent } from './classic-game/classic-game.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatchGameComponent } from './match-game/match-game.component';

const routes: Routes = [
  { path: 'classic', component: ClassicGameComponent },
  { path: 'match', component: MatchGameComponent },
];


@NgModule({
  declarations: [ClassicGameComponent, MatchGameComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    HttpClientModule,
  ],
  exports: [ClassicGameComponent],
})
export class GamesModule {}
