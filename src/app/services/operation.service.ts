import { Injectable } from '@angular/core';
import { Operation } from '../models/operations.model';
import { Observable, catchError, throwError, retry } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class OperationService {

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

  get_Operations(): Observable<Operation> {
    return this.http.get<Operation>(this.API_OPERATION)
      .pipe(retry(2), catchError(this.checkError));
  }

  get_Item(Operation_Id: string): Observable<Operation> {
    return this.http.get<Operation>(`${this.API_OPERATION}/${Operation_Id}`)
      .pipe(retry(1), catchError(this.checkError));
  }

  create_Operation(operationData: Omit<Operation, 'id'>): Observable<Operation> {
    return this.http.post<Operation>(this.API_OPERATION, operationData, this.httpOptions)
      .pipe(
        catchError(this.checkError)
      );
  }

  update_Operation(Operation_Id: string, token: Operation): Observable<Operation> {
    return this.http.put<Operation>(`${this.API_OPERATION}/${Operation_Id}`, JSON.stringify(token), this.httpOptions)
      .pipe(retry(1), catchError(this.checkError));
  }

  delete_Operation(Operation_Id: string): Observable<Operation> {
    return this.http.delete<Operation>(`${this.API_OPERATION}/${Operation_Id}`, this.httpOptions)
      .pipe(retry(1), catchError(this.checkError));
  }
}
