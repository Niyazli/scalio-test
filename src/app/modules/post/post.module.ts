import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostPageComponent } from './components/post-page/post-page.component';
import { CardModule } from '../widgets/card/card.module';

@NgModule({
  declarations: [PostPageComponent],
  imports: [CommonModule, PostRoutingModule, CardModule],
})
export class PostModule {}
