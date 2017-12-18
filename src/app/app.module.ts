import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {AppRoutingModule} from './app-routing.module';

// Services
import { GameService } from './services/game.service';
import { ForumService } from './services/forum.service';
import { AccountService } from './services/account.service';
import { GamesListComponent } from './games/games-list/games-list.component';
import { GameItemComponent } from './games/games-list/game-item/game-item.component';
import { ForumsListComponent } from './forums/forums-list/forums-list.component';
import { ForumItemComponent } from './forums/forums-list/forum-item/forum-item.component';
import { PostsListComponent } from './forums/posts-list/posts-list.component';
import { PostItemComponent } from './forums/posts-list/post-item/post-item.component';
import { RepliesListComponent } from './forums/replies-list/replies-list.component';
import { ReplyItemComponent } from './forums/replies-list/reply-item/reply-item.component';
import { CharactersListComponent } from './games/characters-list/characters-list.component';
import { ProfileComponent } from './profile/profile.component';
import {ForumsComponent} from './forums/forums.component';
import { ForumsStartComponent } from './forums/forums-start/forums-start.component';

//for testing purposes with production mode
//import {enableProdMode} from '@angular/core';
//enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GamesListComponent,
    GameItemComponent,
    ForumsComponent,
    ForumsListComponent,
    ForumItemComponent,
    PostsListComponent,
    PostItemComponent,
    RepliesListComponent,
    ReplyItemComponent,
    CharactersListComponent,
    ProfileComponent,
    ForumsStartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [GameService, ForumService, AccountService],
  bootstrap: [AppComponent]
})
export class AppModule {}
