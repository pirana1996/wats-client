import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ItemPostComponent } from './components/item-post/item-post.component';
import { LocationComponent } from './components/location/location.component';

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
    ReactiveFormsModule,
    ItemPostComponent,
    LocationComponent
  ],
  declarations: [ItemPostComponent, LocationComponent]
})
export class SharedModule {
  // Solves the cross module problem
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
