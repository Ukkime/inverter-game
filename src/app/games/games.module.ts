import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassicGameComponent } from './classic-game/classic-game.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'classic', component: ClassicGameComponent },
];


@NgModule({
  declarations: [ClassicGameComponent],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
})
export class GamesModule {}
