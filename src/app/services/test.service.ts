import { Injectable } from '@angular/core';
import { User } from '../forms/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  _url: string = "";

  constructor(private http: HttpClient) {
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(() => new Error(error.error));
  }

  enroll(user: User) {
    return this.http.post<any>(this._url, user)
    // .pipe(catchError(
    //   // (error) => console.log(error);
    // ));
  }
}
function throwError(arg0: () => Error) {
  throw new Error('Function not implemented.');
}

