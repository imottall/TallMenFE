import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { AppComponent } from './app.component';
import {GamesListComponent} from "./games/games-list/games-list.component";
import {ForumsListComponent} from "./forums-list/forums-list.component";
import {PostsListComponent} from "./forums-list/forum-item/posts-list/posts-list.component";

const appRoutes: Routes = [
  { path: 'home', component: HeaderComponent },
  { path: 'games', component: GamesListComponent },
  { path: 'forums', component: ForumsListComponent },
  { path: 'forums/:topic', component: PostsListComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
