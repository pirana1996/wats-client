import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from '../pages/app/app.component';
import {AppRoutingModules} from './app-routing-modules';
import { SomeComponent } from '../pages/some/some.component';

@NgModule({
  declarations: [
    AppComponent,
    SomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
