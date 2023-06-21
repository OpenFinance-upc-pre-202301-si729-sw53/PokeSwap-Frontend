import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Exchange } from 'src/app/models/exchange.model';
import { Token } from 'src/app/models/token.model';
import { User } from 'src/app/models/user.model';
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/services/auth.service';

import { Wallet } from 'src/app/models/wallet.model';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent {

  data!: User;
  exchange!:Exchange;
  tokens: Token[] = [];

  constructor(private tokenService: TokenService, private service: AuthService, public router: Router) {
    this.data = this.service.getUserData();
    this.exchange = this.service.getExchange();
  }


  ngOnInit() {
    
    this.crearToken();
    // this.showTokens();
  }

  crearToken() {
    const nuevoToken: Omit<Token, 'id'> = {
      balance: 10.10,
      exchange_rate: 50000,
      name: 'Bitcoin',
      symbol: 'BTC',
      wallet_id: 3
    };
    console.log('Nuevo token:', nuevoToken);

    this.tokenService.create_Token(nuevoToken).subscribe(
      (response: Token) => {
        console.log('Token creado:', response);
      },
      (error: any) => {
        console.error('Error al crear el token:', error);
      }
    );
  }

  
  showTokens() {
    this.tokenService.get_Tokens().subscribe((response: any) => {
      this.tokens = response;
      console.log('Tokens:', this.tokens);
    });
  }

  useToken(tkn:Token){
    const redirectUrl = '/exchange';
    this.router.navigate([redirectUrl]);
    this.service.setToken(tkn);
  }
  // data!: User;
  // exchange!:Exchange;
  // tokens: Token[] = [
  //   { name: 'BTC', quantity: 10.10, exchangeRate: 50000 },
  //   { name: 'ETH', quantity: 5.5, exchangeRate: 2500 },
  //   { name: 'DOGE', quantity: 1000, exchangeRate: 0.5 },
  //   { name: 'XRP', quantity: 1200, exchangeRate: 1.2 },
  //   { name: 'LTC', quantity: 25, exchangeRate: 200 }
  // ];

  // constructor(private service: AuthService, public router: Router) {
    // this.data = this.service.getUserData();
    // this.exchange = this.service.getExchange();
  // }

  // useToken(tkn:Token){
  //   const redirectUrl = '/exchange';
  //   this.router.navigate([redirectUrl]);
  //   this.service.setToken(tkn);
  // }
}
