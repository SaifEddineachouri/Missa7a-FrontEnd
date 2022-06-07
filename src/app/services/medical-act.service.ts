import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicalActService {
  consultationId ;
  baseUri = "http://localhost:5000/api/v1";
  headers = new HttpHeaders().set("Content-Type", "application/json");

  constructor(private http: HttpClient) { }

  // Get all Medical Acts
  getMedicalActs() {
    return this.http.get(`${this.baseUri}/acts`);
  }

  // Get Acts of Consultation
  getConsultationMedicalActs(id): Observable<any> {
    let url = `${this.baseUri}/consultations/${id}/acts`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  // Get Medical Act
  getMedicalAct(id): Observable<any> {
    let url = `${this.baseUri}/acts/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  // Add Medical Act to Consultation
  addConsultationMedicalAct(id, data): Observable<any> {
    let url = `${this.baseUri}/consultations/${id}/acts`;
    return this.http.post(url, data).pipe(catchError(this.errorMgmt));
  }

  // Update Medical Act
  updateMedicalAct(id, data): Observable<any> {
    let url = `${this.baseUri}/acts/${id}`;
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Delete Medical Act
  deleteMedicalAct(id): Observable<any> {
    let url = `${this.baseUri}/acts/${id}`;
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
