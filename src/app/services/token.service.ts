import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, catchError, retry } from 'rxjs';

import { Token } from '../models/token.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  API_TOKEN = 'https://basic-crypto-rest-api-production.up.railway.app/api/pokeswap/v1/tokens';

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

  get_Tokens(): Observable<Token> {
    return this.http.get<Token>(this.API_TOKEN)
      .pipe(retry(1), catchError(this.checkError));
  }

  get_Item(token_Id: string): Observable<Token> {
    return this.http.get<Token>(`${this.API_TOKEN}/${token_Id}`)
      .pipe(retry(1), catchError(this.checkError));
  }

  // create_Token(token: Token): Observable<Token> {
  //   return this.http.post<Token>(this.API_TOKEN, JSON.stringify(token), this.httpOptions)
  //     .pipe(retry(1), catchError(this.checkError));
  // }
  create_Token(tokenData: Omit<Token, 'id'>): Observable<Token> {
    return this.http.post<Token>(this.API_TOKEN, tokenData, this.httpOptions)
      .pipe(
        catchError(this.checkError)
      );
  }

  update_Token(token_Id: string, token: Token): Observable<Token> {
    return this.http.put<Token>(`${this.API_TOKEN}/${token_Id}`, JSON.stringify(token), this.httpOptions)
      .pipe(retry(1), catchError(this.checkError));
  }

  delete_Token(token_Id: string): Observable<Token> {
    return this.http.delete<Token>(`${this.API_TOKEN}/${token_Id}`, this.httpOptions)
      .pipe(retry(1), catchError(this.checkError));
  }
}
