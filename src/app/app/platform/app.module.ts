
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { CoreModule } from './../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { CustomHttpInterceptor } from '../services/custom-http-interceptor';

import { AppComponent } from '../pages/app/app.component';
import { SomeComponent } from '../pages/some/some.component';
import { LoginComponent } from '../pages/login/login.component';
import { NavbarComponent } from '../components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    SomeComponent,
    LoginComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule.forRoot(),
    AppRoutingModule
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
