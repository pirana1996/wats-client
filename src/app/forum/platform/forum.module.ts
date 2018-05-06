import {ModuleWithProviders, NgModule} from '@angular/core';

import { ForumRoutingModule } from './forum-routing.module';
import { TestComponent } from '../pages/test/test.component';
import {SharedModule} from '../../shared/shared.module';
import { QuestionListComponent } from '../pages/question-list/question-list.component';
import { ForumService } from '../services/forum-service.service';
import { CreateAnswerComponent } from '../component/create-answer/create-answer.component';
import { QuestionDetailsComponent } from '../pages/question-details/question-details.component';
import { QuestionComponent } from '../component/question/question.component';
import { AnswerComponent } from '../component/answer/answer.component';

@NgModule({
  imports: [
    ForumRoutingModule,
    SharedModule.forRoot()
  ],
  declarations: [TestComponent, QuestionListComponent, CreateAnswerComponent, QuestionDetailsComponent, QuestionComponent, AnswerComponent],
  providers: [ForumService]
})
export class ForumModule {
  // static forRoot(): ModuleWithProviders {
  //   return {
  //     ngModule: ForumModule,
  //     providers: [ ForumService ]
  //   }
  // }
}
