import { Injectable } from '@angular/core';
import { Plataform } from '../models/plataform.model';
import { Observable, catchError, throwError, retry } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlataformService {

  API_PLATAFORM = 'https://pokeswap-rest-api.up.railway.app/api/pokeswap/v1/platforms';

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

  get_Plataforms(): Observable<Plataform> {
    return this.http.get<Plataform>(this.API_PLATAFORM)
      .pipe(retry(1), catchError(this.checkError));
  }

  get_Item(plataform_Id: string): Observable<Plataform> {
    return this.http.get<Plataform>(`${this.API_PLATAFORM}/${plataform_Id}`)
      .pipe(retry(1), catchError(this.checkError));
  }

  create_Plataform(plataformData: Omit<Plataform, 'id'>): Observable<Plataform> {
    return this.http.post<Plataform>(this.API_PLATAFORM, plataformData, this.httpOptions)
      .pipe(
        catchError(this.checkError)
      );
  }

  update_Plataform(Plataform_Id: string, token: Plataform): Observable<Plataform> {
    return this.http.put<Plataform>(`${this.API_PLATAFORM}/${Plataform_Id}`, JSON.stringify(token), this.httpOptions)
      .pipe(retry(1), catchError(this.checkError));
  }

  delete_Plataform(Plataform_Id: string): Observable<Plataform> {
    return this.http.delete<Plataform>(`${this.API_PLATAFORM}/${Plataform_Id}`, this.httpOptions)
      .pipe(retry(1), catchError(this.checkError));
  }

}
