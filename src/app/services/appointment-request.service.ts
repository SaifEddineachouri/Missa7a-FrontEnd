import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentRequestService {

  baseUri = "http://localhost:5000/api/v1";
  headers = new HttpHeaders().set("Content-Type", "application/json");

  constructor(private http: HttpClient) { }


  // Get all Appointments Requests
  getAppointmentsRequests() {
    return this.http.get(`${this.baseUri}/appointment/request`);
  }

  // Get Patient Appointments Requests
  getPatientAppointmentsRequests(id) {
    return this.http.get(`${this.baseUri}/patients/${id}/appointment/request`);
  }

  // Get Today Appointments Requests
  getTodayAppointmentsRequests() {
    return this.http.get(`${this.baseUri}/appointment/request/today`);
  }

  // Demand Appointment Request
  demandAppointmentRequest(id,data): Observable<any> {
    let url = `${this.baseUri}/patients/${id}/appointment/request`;
    return this.http.post(url, data).pipe(catchError(this.errorMgmt));
  }

  // Confirm Appointment Request
  confirmAppointmentRequest(id): Observable<any> {
    let url = `${this.baseUri}/appointment/request/${id}/confirm`;
    return this.http
      .put(url, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  // unConfirm Appointment Request
  unConfirmAppointmentRequest(id): Observable<any> {
    let url = `${this.baseUri}/appointment/request/${id}/unconfirm`;
    return this.http
      .put(url, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Update Appointment Request
  updateAppointmentRequest(id,data): Observable<any> {
    let url = `${this.baseUri}/appointment/request/${id}`;
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Delete Appointment Request
  deleteAppointmentRequest(id){
    let url = `${this.baseUri}/appointment/request/${id}`;
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
