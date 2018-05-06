import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ReviewsRoutingModule } from './reviews-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CustomHttpInterceptor } from './../../app/services/custom-http-interceptor';

import { ReviewListComponent } from '../pages/review-list/review-list.component';
import { ReviewService } from '../services/review.service';

@NgModule({
  imports: [
    ReviewsRoutingModule,
    SharedModule.forRoot(),
  ],
  declarations: [ReviewListComponent],
  providers: [
    ReviewService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true
    },
  ]
})
export class ReviewsModule { }
