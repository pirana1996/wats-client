import { NgModule } from '@angular/core';
import { AuthService } from './services/auth.service';
import { LocationService } from './services/location.service';

@NgModule({
  providers: [
    AuthService,
    LocationService
  ]
})
export class CoreModule {

}
