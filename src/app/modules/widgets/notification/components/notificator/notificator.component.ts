import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'ui-notificator',
  templateUrl: './notificator.component.html',
  styleUrls: ['./notificator.component.scss'],
})
export class NotificatorComponent implements OnInit {
  constructor(public notificationService: NotificationService) {}

  ngOnInit(): void {}
}
