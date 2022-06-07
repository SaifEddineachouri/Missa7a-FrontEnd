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
export class MedicalFolderService {
  baseUri: string = "http://localhost:5000/api/v1";
  headers = new HttpHeaders().set("Content-Type", "application/json");

  constructor(private http: HttpClient) {}

  // Get all Medical Folders
  getMedicalFolders() {
    return this.http.get(`${this.baseUri}/dossiers`);
  }

  // Get Archived Medical Folders
  getArchivedMedicalFolders() {
    return this.http.get(`${this.baseUri}/dossiers/archived`);
  }

  // Get Medical Folder of Patient
  getPatientMedicalFolder(id): Observable<any> {
    let url = `${this.baseUri}/patients/${id}/dossier`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  // Get Medical Folder
  getMedicalFolder(id): Observable<any> {
    let url = `${this.baseUri}/dossiers/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  // Create Patient Medical Folder
  createPatientMedicalFolder(id, data): Observable<any> {
    let url = `${this.baseUri}/patients/${id}/dossier`;
    return this.http.post(url, data).pipe(catchError(this.errorMgmt));
  }

  // Update Medical Folder
  updateMedicalFolder(id, data): Observable<any> {
    let url = `${this.baseUri}/dossiers/${id}`;
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Unarchive Medical Folder
  unarchiveMedicalFolder(id): Observable<any> {
    let url = `${this.baseUri}/dossiers/${id}/restore`;
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
