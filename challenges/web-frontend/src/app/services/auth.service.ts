import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private destroy = new Subject<boolean>();
  constructor(private http: HttpClient) {}

  authenticateuser() {
    const req = this.http.get(``);
    req.pipe(takeUntil(this.destroy.asObservable())).subscribe(
      (res: any) => {
        if (res) {
          console.log(res);
        }
      },
      (error) => console.log(error)
    );
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
