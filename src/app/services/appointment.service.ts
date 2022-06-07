import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  baseUri = "http://localhost:5000/api/v1";
  headers = new HttpHeaders().set("Content-Type", "application/json");

  constructor(private http: HttpClient) { }

  // Get today Appointments
  getTodayAppointments() {
    return this.http.get(`${this.baseUri}/appointments/today`);
  }

  InProgressAppointment(id){
    let url = `${this.baseUri}/appointments/${id}/inprogress`;
    return this.http
      .put(url, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  NextAppointment(id){
    let url = `${this.baseUri}/appointments/${id}/next`;
    return this.http
      .put(url, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  FinishAppointment(id){
    let url = `${this.baseUri}/appointments/${id}/finish`;
    return this.http
      .put(url, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  AbsenceAppointment(id){
    let url = `${this.baseUri}/appointments/${id}/absence`;
    return this.http
      .put(url, { headers: this.headers })
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
