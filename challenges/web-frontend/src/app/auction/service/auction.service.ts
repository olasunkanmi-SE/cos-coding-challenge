import { AppConstants } from 'src/app/constants/contants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuctionService {
  userId: string | undefined;
  authToken: string | undefined;

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
      this.router.navigate(['/auth']);
    }
    //the empty string is to avoid build error
    headers
      .set('userid', this.userId || '')
      .set('authtoken', this.authToken || '');
  }

  //   public getAuctions() {
  //     this.setRequestHeaders();
  //     const req = this.http.get<>
  //   }
}
