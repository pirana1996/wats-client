import { AuthService } from './../core/services/auth.service';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
