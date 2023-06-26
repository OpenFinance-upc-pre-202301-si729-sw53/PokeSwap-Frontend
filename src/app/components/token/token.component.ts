import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Exchange } from 'src/app/models/exchange.model';
import { Token } from 'src/app/models/token.model';
import { User } from 'src/app/models/users.model';
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/services/auth.service';
import { Cryptos } from 'src/app/models/cryptos.model';
import { CryptosService } from 'src/app/services/cryptos.service';

import { Wallet } from 'src/app/models/wallet.model';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent {

  data!: User;
  exchange!:Exchange;
  cryptos: Cryptos[] = [];

  constructor(private cryptoService: CryptosService, private service: AuthService, public router: Router) {
    this.data = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : {};
    this.exchange = this.service.getExchange();
  }

  ngOnInit(): void {
    this.showCryptos();
  }

  showCryptos() {
    this.cryptoService.get_AllCryptos().subscribe((response: any) => {
      this.cryptos = response;
      console.log('Cryptos:', this.cryptos);
    });
  }

  useCrypto(crypt: Cryptos){
    const redirectUrl = '/exchange';
    this.router.navigate([redirectUrl]);
    this.service.setCrypto(crypt);
  }
}
