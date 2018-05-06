<<<<<<< HEAD
import {ModuleWithProviders, NgModule} from '@angular/core';
=======
import { AuthService } from './../core/services/auth.service';
import { NgModule, ModuleWithProviders } from '@angular/core';
>>>>>>> c5e7321d0005605d23adee974dec49e407f3b115
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
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
