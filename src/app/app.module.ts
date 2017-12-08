import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {AppRoutingModule} from './app-routing.module';

// Services
import { TestService } from './services/testService';
import { GameService } from './services/game.service';
import { ForumService } from './services/forum.service';
import { GamesComponent } from './games/games.component';
import { GamesListComponent } from './games/games-list/games-list.component';
import { GameItemComponent } from './games/games-list/game-item/game-item.component';
import { ForumsListComponent } from './forums-list/forums-list.component';
import { ForumItemComponent } from './forums-list/forum-item/forum-item.component';
import { PostsListComponent } from './forums-list/forum-item/posts-list/posts-list.component';

//for testing purposes with production mode
//import {enableProdMode} from '@angular/core';
//enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GamesComponent,
    GamesListComponent,
    GameItemComponent,
    ForumsListComponent,
    ForumItemComponent,
    PostsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [TestService, GameService, ForumService],
  bootstrap: [AppComponent]
})
export class AppModule {}
