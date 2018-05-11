
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { CoreModule } from './../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { CustomHttpInterceptor } from '../services/custom-http-interceptor';

import { AppComponent } from '../pages/app/app.component';
import { LoginComponent } from '../pages/login/login.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { SaveTokenComponent } from '../pages/save-token/save-token.component';
import { HomeComponent } from '../pages/home/home.component';
import { ProfileComponent } from '../pages/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    SaveTokenComponent,
    HomeComponent,
    ProfileComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CoreModule,
    SharedModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
