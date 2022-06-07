import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicationService {

  baseUri = "http://localhost:5000/api/v1";
  headers = new HttpHeaders().set("Content-Type", "application/json");

  constructor(private http: HttpClient) {}

  // Get all Medications
  getMedications() {
    return this.http.get(`${this.baseUri}/medications`);
  }

  // Get Prescription Medications
  getPrescriptionMedications(id){
    let url = `${this.baseUri}/prescriptions/${id}/medications`;
    return this.http.get(url).pipe(catchError(this.errorMgmt));
  }

  // Add Drug to Prescription
  createPrescriptionDrug(id, data): Observable<any> {
    let url = `${this.baseUri}/prescriptions/${id}/medications`;
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
