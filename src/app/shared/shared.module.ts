import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ForumService} from "../forum/services/question-service.service";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: []
})
export class SharedModule {
  // Solves the cross module problem
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
}
