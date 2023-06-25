import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, catchError, retry } from 'rxjs';

import { Cryptos } from '../models/cryptos.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CryptosService {

  API_CRYPTO = 'https://pokeswap-rest-api.up.railway.app/api/pokeswap/v1/cryptos';

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

  get_AllCryptos(): Observable<Cryptos> {
    return this.http.get<Cryptos>(this.API_CRYPTO)
      .pipe(retry(1), catchError(this.checkError));
  }

  get_Crypto(crypto_Id: string): Observable<Cryptos> {
    return this.http.get<Cryptos>(`${this.API_CRYPTO}/${crypto_Id}`)
      .pipe(retry(1), catchError(this.checkError));
  }

  create_Crypto(cryptoData: Omit<Cryptos, 'id'>): Observable<Cryptos> {
    return this.http.post<Cryptos>(this.API_CRYPTO, cryptoData, this.httpOptions)
      .pipe(retry(1), catchError(this.checkError));
  }

  update_Crypto(crypto_Id: string, crypto: Cryptos): Observable<Cryptos> {
    return this.http.put<Cryptos>(`${this.API_CRYPTO}/${crypto_Id}`, JSON.stringify(crypto), this.httpOptions)
      .pipe(retry(1), catchError(this.checkError));
  }

  delete_Crypto(crypto_Id: string): Observable<Cryptos> {
    return this.http.delete<Cryptos>(`${this.API_CRYPTO}/${crypto_Id}`, this.httpOptions)
      .pipe(retry(1), catchError(this.checkError));
  }
}
