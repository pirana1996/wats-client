import { SaveTokenComponent } from '../pages/save-token/save-token.component';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SomeComponent} from '../pages/some/some.component';
import { LoginComponent } from '../pages/login/login.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, pathMatch: 'full'},
  {path: 'token', component: SaveTokenComponent, pathMatch: 'full'},
  {path: 'some', component: SomeComponent, pathMatch: 'full'},
  // feature module ForumModule
  {
    path: 'location/:locationId/forum',
    loadChildren: 'app/forum/platform/forum.module#ForumModule'
  },
  // feature module ReviewsModule
  {
    path: 'location/:locationId/reviews',
    loadChildren: 'app/reviews/platform/reviews.module#ReviewsModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ], exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
