import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { AppComponent } from './app.component';
import {GamesListComponent} from "./games/games-list/games-list.component";

const appRoutes: Routes = [
  { path: 'home', component: HeaderComponent },
  { path: 'test', component: GamesListComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
