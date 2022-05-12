import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConstants } from 'src/app/constants/contants';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private _snackBar: MatSnackBar) {}

  handleError(err: HttpErrorResponse) {
    if (err.error instanceof ErrorEvent) {
      console.error(`An error occured: ${err.error.message}`);
    } else {
      if (err.status === 401) {
        this._snackBar.open(AppConstants.inValidLogin);
      }
    }
    return throwError(AppConstants.inValidLogin);
  }
}
