import { NgModule } from '@angular/core';

import { ForumRoutingModule } from './forum-routing.module';
import { TestComponent } from '../pages/test/test.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    ForumRoutingModule,
    SharedModule.forRoot()
  ],
  declarations: [TestComponent]
})
export class ForumModule { }
