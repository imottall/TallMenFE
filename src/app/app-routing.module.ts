import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { HeaderComponent } from './header/header.component';
import {GamesListComponent} from "./games/games-list/games-list.component";
import {ForumsListComponent} from "./forums/forums-list/forums-list.component";
import {PostsListComponent} from "./forums/posts-list/posts-list.component";
import {RepliesListComponent} from "./forums/replies-list/replies-list.component";
import {ProfileComponent} from "./profile/profile.component";

const appRoutes: Routes = [
  { path: 'home', component: HeaderComponent },
  { path: 'games', component: GamesListComponent },
  { path: 'forums', component: ForumsListComponent },
  { path: ':forumId/posts', component: PostsListComponent },
  { path: ':forumId/:postId/replies', component: RepliesListComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
