import { Injectable } from '@angular/core';
import { UserService } from './users.service';
import { User } from '../models/users.model';
import { Exchange } from '../models/exchange.model';
import { Token } from '../models/token.model';
import { Cryptos } from '../models/cryptos.model';
import { Platforms } from '../models/platforms.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  id: number | undefined = undefined;
  userData: User | undefined = undefined;
  redirectUrl: string | null = null;
  exchange: Exchange | undefined = undefined;
  platform: Platforms | undefined = undefined;
  token: Token | undefined = undefined;
  crypto: Cryptos | undefined = undefined;

  constructor(private service: UserService) { }

  async login(name: string, pass: string): Promise<boolean> {
    try {
      const response = await this.service.getUsers().toPromise();
      console.log(response)
      const matchingUser = response!.find(user => user.name === name && user.password === pass);
      if (matchingUser) {
        this.isLoggedIn = true;
        this.userData = matchingUser;
        console.log(this.userData);
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

  getPlatform(): Platforms {
    return this.platform!;
  }

  setToken(obj: Token): void {
    this.token = obj;
  }

  setCrypto(obj: Cryptos): void {
    this.crypto = obj;
  }

  getToken(): Token {
    return this.token!;
  }

  getCrypto(): Cryptos {
    return this.crypto!;
  }

  logout(): void {
    this.userData = undefined;
    this.exchange = undefined;
    this.token = this.token;
    this.isLoggedIn = false;
  }
}
