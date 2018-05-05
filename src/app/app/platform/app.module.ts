import { CoreModule } from './../../core/core.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from '../pages/app/app.component';
import { AppRoutingModule } from './app-routing-module';
import { SomeComponent } from '../pages/some/some.component';
import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from '../pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    SomeComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule.forRoot(),
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
