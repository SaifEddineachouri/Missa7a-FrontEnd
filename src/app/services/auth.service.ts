import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, Observable, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  baseUri = "http://localhost:5000/api/v1";
  headers = new HttpHeaders().set("Content-Type", "application/json");
  

  constructor(private http: HttpClient) {
  }



  Register(
    Prenom: string,
    Nom: string,
    cin: string,
    avatar: File,
    email: string,
    password: string
  ): Observable<any> {
    const userData = new FormData();
    userData.append("Prenom", Prenom);
    userData.append("Nom", Nom);
    userData.append("cin", cin);
    userData.append("avatar", avatar);
    userData.append("email", email);
    userData.append("password", password);

    let url = `${this.baseUri}/auth/register`;
    return this.http.post(url, userData);
  }

  Login(email: string, password: string) {
    const userData = { email: email, password: password };

    let url = `${this.baseUri}/auth/login`;

    return this.http.post(url, userData).pipe(catchError(this.errorMgmt));
  }

  Logout() {
    let url = `${this.baseUri}/auth/logout`;
    return this.http.get(url);
  }

  getLoggedInUser() {
    let url = `${this.baseUri}/auth/me`;
    return this.http.get(url);
  }

  updateDetails(data) {
    let url = `${this.baseUri}/auth/updatedetails`;
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  updatePassword(data) {
    console.log(data);
    let url = `${this.baseUri}/auth/updatepassword`;
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  forgotPassword(email: string) {
    const UserEmail = { email: email };
    let url = `${this.baseUri}/auth/forgotpassword`;
    return this.http.post(url, UserEmail);
  }

  resetPassword(resetToken: string, password: string) {
    const UserNewPassword = { password: password };
    let url = `${this.baseUri}/auth/resetpassword/${resetToken}`;
    return this.http.put(url, UserNewPassword);
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
