import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReviewListComponent} from '../pages/review-list/review-list.component';
import { ReviewDiscussionComponent } from '../pages/review-discussion/review-discussion.component';

const routes: Routes = [
  {
    path: '',
    component: ReviewListComponent
  },
  {
    path: ':id',
    component: ReviewDiscussionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewsRoutingModule { }
