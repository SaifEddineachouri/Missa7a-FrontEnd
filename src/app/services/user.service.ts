import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUri: string = "http://localhost:5000/api/v1";
  headers = new HttpHeaders().set("Content-Type", "application/json");


  constructor(private http: HttpClient) { }

  // Get All Users
  getUsers(){
    return this.http.get(`${this.baseUri}/users`);
  }

  // Get User
  getUser(id): Observable<any> {
    let url = `${this.baseUri}/users/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  // Update User
  updateUser(id, data): Observable<any> {
    console.log(data);
    let url = `${this.baseUri}/users/${id}`;
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Delete User
  deleteUser(id): Observable<any> {
    let url = `${this.baseUri}/users/${id}`;
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
