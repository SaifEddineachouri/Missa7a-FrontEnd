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
export class PatientService {
  baseUri: string = "http://localhost:5000/api/v1";
  headers = new HttpHeaders().set("Content-Type", "application/json");

  // get patient Id in consultation Component
  patientId : string;
  // get Appointment Start Time
  StartTime : Date ;
  // get Appointment Subject
  Subject : string;

  constructor(private http: HttpClient) { }

  // Get all Patients
  getPatients() {
    return this.http.get(`${this.baseUri}/patients/visible`);
  }

  // Get archived Patients
  getArchivedPatients() {
    return this.http.get(`${this.baseUri}/patients/hidden`);
  }

  // Get Patient
  getPatient(id): Observable<any> {
    let url = `${this.baseUri}/patients/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  // Get Patient with Cin
  getPatientWithCin(cin): Observable<any> {
    let url = `${this.baseUri}/patients/cin/${cin}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }


  // Create Patient
  createPatient(data): Observable<any> {
    let url = `${this.baseUri}/patients`;
    return this.http.post(url, data).pipe(catchError(this.errorMgmt));
  }

  // Update Patient
  updatePatient(id, data): Observable<any> {
    let url = `${this.baseUri}/patients/${id}`;
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Archive Patient
  archivePatient(id) {
    let url = `${this.baseUri}/patients/archive/${id}`;
    return this.http.put(url, {}).pipe(catchError(this.errorMgmt));
  }

  // Unarchive Patient
  unarchivePatient(id) {
    let url = `${this.baseUri}/patients/${id}/restore`;
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
