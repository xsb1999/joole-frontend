import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { advancedSearchInfo } from '../advancedSearchInfo';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private router: Router, private http: HttpClient) { }

  errorHandler(error: HttpErrorResponse) {
    return throwError(() => console.error(error.message));
  }

  getAllBrands(){
    return this.http.get<any>('/api/product/getAllBrands').pipe(catchError(this.errorHandler));
  }
  
  getProductInfoByBrand(searchInfo: string){
    const params = new HttpParams().set('brand', searchInfo);
    return this.http.get<any>('/api/product/getProductInfoByBrand', { params: params })
    .pipe(catchError(this.errorHandler));
  }

  likeSearch(searchInfo: string){
    const params = new HttpParams().set('brand', searchInfo);
    return this.http.get<any>('/api/product/searchProductByBrand', { params: params })
    .pipe(catchError(this.errorHandler));
  }

  advancedSearch(searchInfo: advancedSearchInfo){
    return this.http.post<any>('/api/product/advancedSearch', searchInfo)
    .pipe(catchError(this.errorHandler));
  }


}
