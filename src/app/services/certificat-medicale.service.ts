import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CertificatMedicaleService {
  consultationId : string;
  nomPatient: string;
  prenomPatient : string;
  baseUri = "http://localhost:5000/api/v1";
  headers = new HttpHeaders().set("Content-Type", "application/json");

  constructor(private http: HttpClient) { }

  // Get all Medical Certificates
  getMedicalCertificates() {
    return this.http.get(`${this.baseUri}/certifications`);
  }

  // Get Medical Certificate of Consultation
  getConsultationMedicalCertificate(id): Observable<any> {
    let url = `${this.baseUri}/consultations/${id}/certification`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  // Get Medical Certificate
  getMedicalCertificate(id): Observable<any> {
    let url = `${this.baseUri}/certifications/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  // Add Medical Certificate to Consultation
  addConsultationMedicalCertificate(id, data): Observable<any> {
    let url = `${this.baseUri}/consultations/${id}/certification`;
    return this.http.post(url, data).pipe(catchError(this.errorMgmt));
  }

  // Update Medical Certificate
  updateMedicalCertificate(id, data): Observable<any> {
    let url = `${this.baseUri}/certifications/${id}`;
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Delete Medical Certificate
  deleteMedicalAct(id): Observable<any> {
    let url = `${this.baseUri}/certifications/${id}`;
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
