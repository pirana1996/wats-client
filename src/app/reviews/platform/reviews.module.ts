import { CustomHttpInterceptor } from './../../app/services/custom-http-interceptor';
import { NgModule } from '@angular/core';
import { ReviewsRoutingModule } from './reviews-routing.module';
import { ReviewListComponent } from '../pages/review-list/review-list.component';
import { ReviewService } from '../services/review.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';

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
