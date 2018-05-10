import { ForumService } from './../forum/services/forum-service.service';
import { ReviewService } from './../reviews/services/review.service';
import { NgModule } from '@angular/core';
import { AuthService } from './services/auth.service';
import { LocationService } from './services/location.service';

@NgModule({
  providers: [
    AuthService,
    LocationService,
    ReviewService, // TEMPORARY PUT HERE, SHOULD BE MOVED BACK TO THE REVIEWS MODULE
    ForumService // TEMPORARY PUT HERE, SHOULD BE MOVED BACK TO THE FORUM MODULE
  ]
})
export class CoreModule {

}
