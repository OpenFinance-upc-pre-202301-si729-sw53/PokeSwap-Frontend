import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, catchError, retry } from 'rxjs';

import { Operations } from '../models/operations.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  API_OPERATION = 'https://pokeswap-rest-api.up.railway.app/api/pokeswap/v1/operations';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders ({ 'Content-Type': 'application/json' })
  };

  checkError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      console.log(`ERROR OCURRED ${error.status}, BODY WAS: ${error.error}`);
    }
    else { console.log(`BACKEND RETURNED COD ${error.status}, BODY WAS: ${error.error}`); }
    return throwError (
      'SOMETHING HAPPEND WITH REQUEST, TRY AGAIN.'
    );
  }

  get_AllOperations(): Observable<Operations> {
    return this.http.get<Operations>(this.API_OPERATION)
      .pipe(retry(1), catchError(this.checkError));
  }

  get_Operation(operation_Id: string): Observable<Operations> {
    return this.http.get<Operations>(`${this.API_OPERATION}/${operation_Id}`)
      .pipe(retry(1), catchError(this.checkError));
  }

  create_Operation(operationData: Omit<Operations, 'id'>): Observable<Operations> {
    return this.http.post<Operations>(this.API_OPERATION, operationData, this.httpOptions)
      .pipe(retry(1), catchError(this.checkError));
  }
  
  update_Operation(operation_Id: string, operation: Operations): Observable<Operations> {
    return this.http.put<Operations>(`${this.API_OPERATION}/${operation_Id}`, JSON.stringify(operation), this.httpOptions)
      .pipe(retry(1), catchError(this.checkError));
  }

  delete_Operation(operation_Id: string): Observable<Operations> {
    return this.http.delete<Operations>(`${this.API_OPERATION}/${operation_Id}`, this.httpOptions)
      .pipe(retry(1), catchError(this.checkError));
  }
}
