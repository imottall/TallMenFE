import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { AppComponent } from './app.component';

const appRoutes: Routes = [
  { path: 'home', component: HeaderComponent },
  { path: 'test', component: AppComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
