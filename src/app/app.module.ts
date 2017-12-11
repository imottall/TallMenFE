import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { ForumsListComponent } from './forums/forums-list/forums-list.component';
import { ForumItemComponent } from './forums/forums-list/forum-item/forum-item.component';
import { PostsListComponent } from './forums/posts-list/posts-list.component';
import { PostItemComponent } from './forums/posts-list/post-item/post-item.component';
import { RepliesListComponent } from './forums/replies-list/replies-list.component';
import { ReplyItemComponent } from './forums/replies-list/reply-item/reply-item.component';

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
    PostsListComponent,
    PostItemComponent,
    RepliesListComponent,
    ReplyItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [TestService, GameService, ForumService],
  bootstrap: [AppComponent]
})
export class AppModule {}
