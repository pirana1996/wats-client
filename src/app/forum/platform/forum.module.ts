import {NgModule} from '@angular/core';
import { ForumRoutingModule } from './forum-routing.module';
import {SharedModule} from '../../shared/shared.module';
import { QuestionListComponent } from '../pages/question-list/question-list.component';
import { ForumService } from '../services/forum-service.service';
import { CreateAnswerComponent } from '../component/create-answer/create-answer.component';
import { QuestionDetailsComponent } from '../pages/question-details/question-details.component';
import { QuestionComponent } from '../component/question/question.component';
import { AnswerComponent } from '../component/answer/answer.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomHttpInterceptor } from '../../app/services/custom-http-interceptor';

@NgModule({
  imports: [
    ForumRoutingModule,
    SharedModule.forRoot()
  ],
  declarations: [
    QuestionListComponent,
    CreateAnswerComponent,
    QuestionDetailsComponent,
    QuestionComponent,
    AnswerComponent
  ],
  providers: [
    // ForumService, // TEMPORARY MOVED TO THE CORE SERVICE !!!!
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true
    },
  ]
})
export class ForumModule {
}
