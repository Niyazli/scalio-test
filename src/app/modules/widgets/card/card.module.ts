import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { CardHeaderComponent } from './components/card-header/card-header.component';
import { CardContentComponent } from './components/card-content/card-content.component';
import { CardActionComponent } from './components/card-action/card-action.component';



@NgModule({
    declarations: [CardComponent, CardHeaderComponent, CardContentComponent, CardActionComponent],
  exports: [
    CardComponent,
    CardHeaderComponent,
    CardContentComponent,
    CardActionComponent
  ],
    imports: [
        CommonModule
    ]
})
export class CardModule { }
