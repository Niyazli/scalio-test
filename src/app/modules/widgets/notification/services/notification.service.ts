import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  public notificationMessage$: Subject<string | null> = new Subject<
    string | null
  >();

  private showTime = 5000;

  constructor() {}

  public showErrorMessage(error: HttpErrorResponse): void {
    this.notificationMessage$.next(error.message);

    setTimeout(() => this.closeToast(), this.showTime);
  }

  public closeToast(): void {
    this.notificationMessage$.next(null);
  }
}
