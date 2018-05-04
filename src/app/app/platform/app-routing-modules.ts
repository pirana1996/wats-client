

import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AppComponent} from '../pages/app/app.component';
import {SomeComponent} from '../pages/some/some.component';


const routes: Routes = [
  {path: '', component: AppComponent, pathMatch: 'full'},
  {path: 'some', component: SomeComponent, pathMatch: 'full'},
  {path: '', redirectTo: '/home',  pathMatch: 'full'},
  // {path: 'home', component: AppComponent},
  { // feature module ForumModule
    path: 'forum',
    loadChildren: 'app/forum/platform/forum.module#ForumModule'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ], exports: [
    RouterModule
  ]
})
export class AppRoutingModules {

}
