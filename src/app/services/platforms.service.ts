import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, catchError, retry } from 'rxjs';

import { Platforms } from '../models/platforms.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlatformsService {

  API_PLATFORM = 'https://pokeswap-rest-api.up.railway.app/api/pokeswap/v1/platforms';

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
  
  get_AllPlatforms(): Observable<Platforms> {
    return this.http.get<Platforms>(this.API_PLATFORM)
      .pipe(retry(1), catchError(this.checkError));
  }

  get_Platforms(platform_Id: string): Observable<Platforms> {
    return this.http.get<Platforms>(`${this.API_PLATFORM}/${platform_Id}`)
      .pipe(retry(1), catchError(this.checkError));
  }

  create_Platform(platformData: Omit<Platforms, 'id'>): Observable<Platforms> {
    return this.http.post<Platforms>(this.API_PLATFORM, platformData, this.httpOptions)
      .pipe(retry(1), catchError(this.checkError));
  }
  
  update_Platform(platform_Id: string, operation: Platforms): Observable<Platforms> {
    return this.http.put<Platforms>(`${this.API_PLATFORM}/${platform_Id}`, JSON.stringify(operation), this.httpOptions)
      .pipe(retry(1), catchError(this.checkError));
  }

  delete_Platform(platform_Id: string): Observable<Platforms> {
    return this.http.delete<Platforms>(`${this.API_PLATFORM}/${platform_Id}`, this.httpOptions)
      .pipe(retry(1), catchError(this.checkError));
  }
}