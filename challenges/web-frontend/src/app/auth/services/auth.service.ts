import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Subject,
  takeUntil,
  throwError,
  Observable,
} from 'rxjs';
import { AppConstants } from 'src/app/constants/contants';
import {
  ErrorCode,
  NotificationService,
  SuccessCode,
} from 'src/app/shared/services/notification';
import { environment } from 'src/environments/environment';
import { IAuth } from '../interface/auth';
import { IUserInfo, IUserResponseDTO } from '../interface/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private destroy = new Subject<boolean>();
  private url = '/auth';
  private loggedInUserSubject: BehaviorSubject<IUserInfo>;
  public loggedInUser: Observable<IUserInfo>;

  public constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {
    this.loggedInUserSubject = new BehaviorSubject<IUserInfo>(
      JSON.parse(localStorage.getItem('loggedInUser') as string)
    );
    this.loggedInUser = this.loggedInUserSubject.asObservable();
  }

  public get loggedInUserValue(): IUserInfo {
    return this.loggedInUserSubject.value;
  }

  public authenticateuser(loginPayload: IAuth) {
    const req = this.http.put<IUserResponseDTO>(
      `${environment.backendBaseAPI}${this.url}`,
      loginPayload
    );

    if (!req) {
      throwError(() => {
        const error: any = new Error(AppConstants.unSuccessfulConnection);
        return error;
      });
    }

    req.pipe(takeUntil(this.destroy.asObservable())).subscribe(
      (res: any) => {
        if (Object.hasOwnProperty.call(res, 'authenticated')) {
          localStorage.setItem(
            'loggedInUser',
            JSON.stringify({ userId: res.userId, token: res.token })
          );
          this.loggedInUserSubject.next({
            userId: res.userId,
            token: res.token,
          });
          this.notificationService.userNotification(
            SuccessCode.HTTP_200_OK,
            AppConstants.successfulLogin
          );
        } else {
          this.notificationService.userNotification(
            ErrorCode.HTTP_400_BAD_REQUEST,
            AppConstants.unSuccessfulLogin
          );
        }
      },
      (error) => {
        throwError(() => new Error(error.message));
      }
    );
  }

  public logOut() {
    localStorage.removeItem('authenticated');
  }

  public ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
    this.loggedInUserSubject.unsubscribe();
  }
}
