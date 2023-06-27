import { Injectable } from '@angular/core';
import { UserService } from './users.service';
import { User } from '../models/users.model';
import { Exchange } from '../models/exchange.model';
import { Token } from '../models/token.model';
import { Cryptos } from '../models/cryptos.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Platforms } from '../models/platforms.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = `${environment.baseURL}auth`;
  
  httpOptions = {
    headers: new HttpHeaders ({ 'Content-Type': 'application/json' })
  };

  isLoggedIn = false;
  id: number | undefined = undefined;
  userData: User | undefined = undefined;
  redirectUrl: string | null = null;
  exchange: Exchange | undefined = undefined;
  platform: Platforms | undefined = undefined;
  token: Token | undefined = undefined;
  crypto: Cryptos | undefined = undefined;

  constructor(private service: UserService, private http: HttpClient) { }

  async login(name: string, pass: string): Promise<boolean> {
    const path = `${this.baseUrl}/login`;
    console.log(path);
    const obj: any = { email: name, password: pass };
    console.log(obj);
    
    try {
      const response:any = await this.http.post(path, obj, this.httpOptions).toPromise();
      
      if (response) {
        console.log(response);
        this.isLoggedIn = true;
        //this.id = response.id;
        this.userData = {} as User;
        localStorage.setItem('token', JSON.stringify(response.token));
        return true;
      }
      
      return false;
    } catch (error:any) {
      if (error.status === 400) {
        console.log('Bad request:', error.error);
      } else {
        console.log('Error while logging in:', error);
      }
      return false;
    }
  }
  

async register(obj: any): Promise<boolean> {
  try {
    const path = `${this.baseUrl}/register`;
    console.log(path);
    const response = this.http.post(path, obj, this.httpOptions);

    if (response) {
      console.log(response);
      this.isLoggedIn = true;
      this.userData = {
        id: 10,
        name: "Jhosaim Ricardo",
        email: "jhos.ricardo14@gmail.com",
        password: "c0fdf7b234f7d4aa",
        phone: "932204128",
        country: "Peru",
        address: "Cusco - San Sebastian",
      } as User;
      return true;
    }
    return false;
  } catch (error) {
    console.log('Error while registering', error);
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
    localStorage.removeItem('token');
    this.userData = undefined;
    this.exchange = undefined;
    this.isLoggedIn = false;
  }
}
