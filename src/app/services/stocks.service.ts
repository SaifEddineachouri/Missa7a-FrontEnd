import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StocksService {

   baseUri = "http://localhost:5000/api/v1";
  headers = new HttpHeaders().set("Content-Type", "application/json");

  constructor(private http: HttpClient) { }

  // Get all Stocks
  getStocks() {
    return this.http.get(`${this.baseUri}/stocks`);
  }

  // Get Stock
  getSingleStock(id): Observable<any> {
    let url = `${this.baseUri}/stocks/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  // Add Stock
  addStock(id,data): Observable<any> {
    let url = `${this.baseUri}/categories/${id}/stocks`;
    return this.http.post(url, data).pipe(catchError(this.errorMgmt));
  }

  // Update Stock
  updateStock(id, data): Observable<any> {
    let url = `${this.baseUri}/stocks/${id}`;
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

   // Delete Stock
  deleteStock(id): Observable<any> {
    let url = `${this.baseUri}/stocks/${id}`;
    return this.http
      .delete(url, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }


  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
