import { NgModule } from '@angular/core';
import { AuthService } from './services/auth.service';
import {ForumService} from "../forum/services/forum-service.service";

@NgModule({
  providers: [
    AuthService,
    // ForumService
  ]
})
export class CoreModule {

}
