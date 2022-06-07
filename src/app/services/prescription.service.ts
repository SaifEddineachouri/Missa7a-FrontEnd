import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PrescriptionService {
  baseUri = "http://localhost:5000/api/v1";
  headers = new HttpHeaders().set("Content-Type", "application/json");

  constructor(private http: HttpClient) {}

  // Get all Prescriptions
  getPrescriptions() {
    return this.http.get(`${this.baseUri}/prescriptions`);
  }

  // Get Consultation Prescription
  getConsultationPrescription(id): Observable<any> {
    let url = `${this.baseUri}/consultations/${id}/prescription`;
    return this.http.get(url,{headers : this.headers}).pipe(catchError(this.errorMgmt));
  }

  // Add Prescription to Consultation
  createConsultationPrescription(id, data): Observable<any> {
    let url = `${this.baseUri}/consultations/${id}/prescription`;
    return this.http.post(url, data).pipe(catchError(this.errorMgmt));
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
