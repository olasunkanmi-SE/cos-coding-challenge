import { AppConstants } from 'src/app/constants/contants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, takeUntil, throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { IAuctionResponseDTO, IAuctionItem } from '../interface/auction';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuctionService {
  private destroy = new Subject<boolean>();
  private userId: string | undefined;
  private authToken: string | undefined;
  private url: string = '/auction';

  public constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {
    let loggedInUser = this.authService.loggedInUserValue;
    if (loggedInUser) {
      this.userId = loggedInUser.userId;
      this.authToken = loggedInUser.token;
    }
  }

  public setRequestHeaders() {
    const headers = new HttpHeaders();
    if (!this.userId || !this.authToken) {
      throwError(() => {
        const error: any = new Error(AppConstants.noHeaders);
        return error;
      });
    }
  }

  public getRunningAuctions(): Observable<IAuctionResponseDTO> {
    this.setRequestHeaders();
    const req = this.http.get<IAuctionResponseDTO>(
      `${environment.backendBaseAPI}${this.url}`,
      {
        headers: new HttpHeaders({
          userid: this.userId || '',
          authtoken: this.authToken || '',
        }),
      }
    );

    if (!req) {
      throwError(() => {
        const error: any = new Error(AppConstants.unSuccessfulConnection);
        return error;
      });
    }
    return req.pipe(takeUntil(this.destroy.asObservable()));
  }

  public ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
