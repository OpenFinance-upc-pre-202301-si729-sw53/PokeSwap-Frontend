import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL: string = environment.baseURL; //URL to web api

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //TODO: add authorization with users
      //Authorization: 'my-auth-token'
    })
  };

  //TODO: Add Error Handler in services
  handleError(error:HttpErrorResponse){
    if (error.error instanceof ErrorEvent) {
      console.log(`An error ocurred ${error.status}, body was: ${error.error}`)
    }
    else {
      console.log(`Backend returned cod ${error.status}, body was: ${error.error}`)
    }
    return throwError(
      () => new Error('Something Happened with the request, please try again.')
    );
  }

  constructor(private http: HttpClient) { }

  /** GET Users from the server */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseURL)
      .pipe(
        catchError(this.handleError)
      );
  }

  /** GET User by ID from the server */
  getUser(id:number): Observable<User> {
    const url = `${this.baseURL}/${id}`; // GET api/users/3
    return this.http.get<User>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  //////// Save methods //////////

  /** POST: add a new user to the database */
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseURL, user, this.httpOptions)//test: JSON.stringify(user)
      .pipe(
        catchError(this.handleError)
      );
  }

  /** DELETE: delete the user from the server */
  deleteUser(id: number): Observable<unknown> {
    const url = `${this.baseURL}/${id}`; // DELETE api/users/3
    return this.http.delete(url, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /** PUT: update the user on the server. Returns the updated user upon success. */
  updateUser(id: number,user: User): Observable<User> {
    //TODO: Add Auth
    //httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');

    const url = `${this.baseURL}/${id}`; // PUT api/users/32
    return this.http.put<User>(url, user, this.httpOptions)//test: JSON.stringify(user)
      .pipe(
        catchError(this.handleError)
      );
  }
}
