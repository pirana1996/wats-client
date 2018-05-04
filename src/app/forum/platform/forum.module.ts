import { NgModule } from '@angular/core';

import { ForumRoutingModule } from './forum-routing.module';
import { TestComponent } from '../pages/test/test.component';

@NgModule({
  imports: [
    ForumRoutingModule
  ],
  declarations: [TestComponent]
})
export class ForumModule { }
