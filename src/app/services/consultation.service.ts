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
export class ConsultationService {
  AddedConsultationId : string ;
  prescriptionId : string;
  baseUri = "http://localhost:5000/api/v1";
  headers = new HttpHeaders().set("Content-Type", "application/json");

  constructor(private http: HttpClient) {}

  // Get all Consultations
  getConsultations() {
    return this.http.get(`${this.baseUri}/consultations`);
  }

  getMedicalFolderConsultations(id){
    return this.http.get(`${this.baseUri}/dossiers/${id}/consultations`);
  }

  // Get Today Consultations
  getTodayConsultations() {
    return this.http.get(`${this.baseUri}/consultations/today`);
  }

  // Get Consultation
  getSingleConsultation(id): Observable<any> {
    let url = `${this.baseUri}/consultations/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  // Add Consultation to Patient Medical Folder
  addConsultation(id, data): Observable<any> {
    let url = `${this.baseUri}/dossiers/${id}/consultations`;
    return this.http.post(url, data).pipe(catchError(this.errorMgmt));
  }

  // Update Consultation
  updateConsultation(id, data): Observable<any> {
    let url = `${this.baseUri}/consultations/${id}`;
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Pay Consultation
  payConsultation(id,data): Observable<any> {
    let url = `${this.baseUri}/consultations/${id}/payment`;
    return this.http
      .put(url, data, { headers: this.headers })
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
