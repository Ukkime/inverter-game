import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamesModule } from './games/games.module';
import { StartMenuComponent } from './start-menu/start-menu.component';
import { TutorialComponent } from './tutorial/tutorial.component'

@NgModule({
  declarations: [AppComponent, StartMenuComponent, TutorialComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, GamesModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
