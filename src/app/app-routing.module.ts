import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {GamesListComponent} from "./games/games-list/games-list.component";
import {PostsListComponent} from "./forums/posts-list/posts-list.component";
import {RepliesListComponent} from "./forums/replies-list/replies-list.component";
import {ProfileComponent} from "./profile/profile.component";
import {ForumsComponent} from "./forums/forums.component";
import {ForumsStartComponent} from "./forums/forums-start/forums-start.component";

const appRoutes: Routes = [
  { path: 'games', component: GamesListComponent},
  { path: 'forums', component: ForumsComponent, children: [
    { path: '', component: ForumsStartComponent, pathMatch: 'full' },
    { path: ':forumId/posts', component: PostsListComponent, pathMatch: 'full'  }
  ]},
  { path: ':postId/replies', component: RepliesListComponent, pathMatch: 'full'  },
  { path: ':accountId/profile', component: ProfileComponent },
  { path: '', redirectTo: '/games', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
