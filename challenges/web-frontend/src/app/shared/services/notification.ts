import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

export enum SuccessCode {
  HTTP_200_OK = 200,
  HTTP_201_CREATED = 201,
  HTTP_202_ACCEPTED = 202,
}

export enum ErrorCode {
  HTTP_400_BAD_REQUEST = 400,
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  userFeedback: any;
  public constructor(private _snackBar: MatSnackBar) {}

  public openSnackBar(message: string, action: any) {
    this._snackBar.open(message, action, { duration: 2000 });
  }

  public userNotification(notificationCode: number, notification: string) {
    switch (notificationCode) {
      case SuccessCode.HTTP_200_OK:
        this.openSnackBar(notification, null);
        break;
      case SuccessCode.HTTP_201_CREATED:
        this.openSnackBar(notification, null);
        break;
      case SuccessCode.HTTP_202_ACCEPTED:
        this.openSnackBar(notification, null);
        break;
      case ErrorCode.HTTP_400_BAD_REQUEST:
        this.openSnackBar(notification, null);
        break;
      default:
        this.openSnackBar('successful', null);
        break;
    }
  }
}
