import { BrowserModule } from '@angular/platform-browser';
import {ModuleWithProviders, NgModule} from '@angular/core';

import { AppComponent } from '../pages/app/app.component';
import {AppRoutingModule} from './app-routing-module';
import { SomeComponent } from '../pages/some/some.component';
import {SharedModule} from '../../shared/shared.module';
import {ForumService} from "../../forum/services/question-service.service";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    SomeComponent
  ],
  imports: [
    BrowserModule,
    SharedModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
