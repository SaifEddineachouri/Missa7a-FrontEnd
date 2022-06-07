import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseUri = "http://localhost:5000/api/v1";
  headers = new HttpHeaders().set("Content-Type", "application/json");

  constructor(private http: HttpClient) { }

  // Get all Products
  getProducts() {
    return this.http.get(`${this.baseUri}/products`);
  }

  // Get Single Product
  getSingleProduct(id): Observable<any> {
    let url = `${this.baseUri}/products/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  // Add Product
  addProduct(id,data): Observable<any> {
    let url = `${this.baseUri}/stocks/${id}/products`;
    return this.http.post(url, data).pipe(catchError(this.errorMgmt));
  }

  // Update Product
  updateProduct(id, data): Observable<any> {
    let url = `${this.baseUri}/products/${id}`;
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

   // Delete Product
  deleteProduct(id): Observable<any> {
    let url = `${this.baseUri}/products/${id}`;
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
