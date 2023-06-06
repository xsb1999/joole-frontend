import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { EmployeeInfo } from '../EmployeeInfo';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  _url: string = "https://jsonplaceholder.typicode.com/users";
  constructor(private http: HttpClient) { }

  errorHandler(error: HttpErrorResponse) {
    return throwError(() => console.error(error.message));
  }

  getEmployee(): Observable<EmployeeInfo[]> {
    const headers = new HttpHeaders();
    const params = new HttpParams().set('pageNum', '10')
      .set('pageSise', '100');
    return this.http.get<EmployeeInfo[]>(this._url,
      { headers: headers, params: params })
      .pipe(catchError(this.errorHandler));
  }

  getAllUser(userData: any) {
    return this.http.get<any>('/api/user/test');
  }

  register(userData: any) {
    // create http post to send the data 
    // and receive response as observerable 
    return this.http.post('/api/user/addUser', userData, {responseType: 'text'});
  }

  login(userData: any) {
    return this.http.post('/api/user/authenticate', userData, {responseType: 'text'});
  }
  
}
