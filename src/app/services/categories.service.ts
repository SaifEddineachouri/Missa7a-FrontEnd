import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  baseUri = "http://localhost:5000/api/v1";
  headers = new HttpHeaders().set("Content-Type", "application/json");

  constructor(private http: HttpClient) { }

  // Get all Categories
  getCategories() {
    return this.http.get(`${this.baseUri}/categories`);
  }

  // Get Categorie
  getSingleCategorie(id): Observable<any> {
    let url = `${this.baseUri}/categories/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  // Add Categorie
  addCategorie(data): Observable<any> {
    let url = `${this.baseUri}/categories`;
    return this.http.post(url, data).pipe(catchError(this.errorMgmt));
  }

  // Update Categorie
  updateCategorie(id, data): Observable<any> {
    let url = `${this.baseUri}/categories/${id}`;
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

   // Delete Categorie
  deleteCategorie(id): Observable<any> {
    let url = `${this.baseUri}/categories/${id}`;
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
