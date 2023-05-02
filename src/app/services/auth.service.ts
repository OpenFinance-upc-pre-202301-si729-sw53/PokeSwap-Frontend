import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Observable, delay, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  id: number | undefined = undefined;
  redirectUrl: string | null = null;

  constructor(private service: UserService) {  }

  login(): Observable<boolean> {
    return of(true).pipe(
      delay(10),  
      tap(() => {
        
        this.isLoggedIn = true
      })
    );
  }

  logout():void {
    this.isLoggedIn=false;
  }
}
