import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReviewListComponent} from '../pages/review-list/review-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: ReviewListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewsRoutingModule { }
