import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TestComponent} from '../pages/test/test.component';
import {QuestionListComponent} from "../pages/question-list/question-list.component";
import {QuestionDetailsComponent} from "../pages/question-details/question-details.component";

const routes: Routes = [
  {
    path: 'test',
    component: TestComponent
  },
  {
    path: 'questions',
    component: QuestionListComponent
  },
  {
    path: 'questions/:questionId/answers',
    component: QuestionDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForumRoutingModule { }
