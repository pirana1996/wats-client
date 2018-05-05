import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewsRoutingModule } from './reviews-routing.module';
import { ReviewListComponent } from '../pages/review-list/review-list.component';
import { ReviewService } from '../services/review.service';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    // HttpClientModule,
    // CommonModule,
    ReviewsRoutingModule,
    SharedModule.forRoot(),
  ],
  declarations: [ReviewListComponent],
  providers: [ReviewService]
})
export class ReviewsModule { }
