import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificatorComponent } from './components/notificator/notificator.component';



@NgModule({
    declarations: [NotificatorComponent],
    exports: [
        NotificatorComponent
    ],
    imports: [
        CommonModule
    ]
})
export class NotificationModule { }
