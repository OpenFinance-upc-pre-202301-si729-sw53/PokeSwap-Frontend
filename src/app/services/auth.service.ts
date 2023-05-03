import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Observable, delay, of, tap, map } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  id: number | undefined = undefined;
  redirectUrl: string | null = null;

  constructor(private service: UserService) { }

  async login(name: string, pass: string): Promise<boolean> {
    try {
      const response = await this.service.getUsers().toPromise();
      console.log(response)
      const matchingUser = response!.find(user => user.name === name && user.password === pass);
      if (matchingUser) {
        this.isLoggedIn = true;
        console.log('Logged in successfully');
        return true;
      }
      console.log('Invalid credentials');
      return false;
    } catch (error) {
      console.log('Error while logging in', error);
      return false;
    }
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
