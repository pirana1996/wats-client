import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AppComponent} from '../pages/app/app.component';
import {SomeComponent} from '../pages/some/some.component';
import { LoginComponent } from './../pages/login/login.component';


const routes: Routes = [
  //{path: 'home', component: AppComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent, pathMatch: 'full'},
  {path: 'some', component: SomeComponent, pathMatch: 'full'},
  //{path: '', redirectTo: '/home',  pathMatch: 'full'},
  // feature module ForumModule
  {
    path: 'forum',
    loadChildren: 'app/forum/platform/forum.module#ForumModule'
  },
  // feature module ReviewsModule
  {
    path: 'reviews',
    loadChildren: 'app/reviews/platform/reviews.module#ReviewsModule'
  },
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
