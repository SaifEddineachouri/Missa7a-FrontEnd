import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FinancialAccountService {
  baseUri = "http://localhost:5000/api/v1";
  headers = new HttpHeaders().set("Content-Type", "application/json");

  constructor(private http: HttpClient) {}

  // Get All Financial Accounts
  getFinancialAccounts() {
    return this.http.get(`${this.baseUri}/accounts`);
  }

  // Get All Open Financial Accounts
  getOpenFinancialAccounts() {
    return this.http.get(`${this.baseUri}/accounts/open`);
  }

  // Get Financial Account
  getSingleFinancialAccount(id): Observable<any> {
    let url = `${this.baseUri}/accounts/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  // Create Financial Account
  createFinancialAccount(data): Observable<any> {
    let url = `${this.baseUri}/accounts`;
    console.log(data);
    return this.http.post(url, data).pipe(catchError(this.errorMgmt));
  }

  // Update Financial Account
  updateFinancialAccount(id, data): Observable<any> {
    let url = `${this.baseUri}/accounts/${id}`;
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Delete Financial Account
  deleteFinancialAccount(id): Observable<any> {
    let url = `${this.baseUri}/accounts/${id}`;
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
