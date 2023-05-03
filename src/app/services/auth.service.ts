import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { User } from '../models/user.model';
import { Exchange } from '../models/exchange.model';
import { Token } from '../models/token.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  id: number | undefined = undefined;
  userData: User | undefined = undefined;
  redirectUrl: string | null = null;
  exchange: Exchange | undefined = undefined;
  token: Token | undefined = undefined;

  constructor(private service: UserService) { }

  async login(name: string, pass: string): Promise<boolean> {
    try {
      const response = await this.service.getUsers().toPromise();
      console.log(response)
      const matchingUser = response!.find(user => user.name === name && user.password === pass);
      if (matchingUser) {
        this.isLoggedIn = true;
        this.userData = matchingUser;
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

  getUserData(): User {
    return this.userData!;
  }

  setExchange(obj: Exchange): void {
    this.exchange = obj;
  }

  getExchange(): Exchange {
    return this.exchange!;
  }

  setToken(obj: Token): void {
    this.token = obj;
  }

  getToken(): Token {
    return this.token!;
  }

  logout(): void {
    this.userData = undefined;
    this.exchange = undefined;
    this.token = this.token;
    this.isLoggedIn = false;
  }
}
