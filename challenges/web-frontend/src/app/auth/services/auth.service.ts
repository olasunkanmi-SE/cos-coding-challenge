import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil, throwError } from 'rxjs';
import {
  ErrorCode,
  NotificationService,
  SuccessCode,
} from 'src/app/shared/services/notification';
import { environment } from 'src/environments/environment';
import { IAuth } from '../interface/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private destroy = new Subject<boolean>();
  private url = '/auth';
  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private snackBar: MatSnackBar
  ) {}

  authenticateuser(loginPayload: IAuth) {
    const req = this.http.put(
      `${environment.backendBaseAPI}${this.url}`,
      loginPayload
    );
    req.pipe(takeUntil(this.destroy.asObservable())).subscribe(
      (res: any) => {
        if (Object.hasOwnProperty.call(res, 'authenticated')) {
          this.notificationService.userNotification(
            SuccessCode.HTTP_200_OK,
            'Logged in Successfully'
          );
        } else {
          this.notificationService.userNotification(
            ErrorCode.HTTP_400_BAD_REQUEST,
            'Logged in Successfully'
          );
        }
      },
      (error) => {
        throwError(() => new Error(error.message));
      }
    );
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
