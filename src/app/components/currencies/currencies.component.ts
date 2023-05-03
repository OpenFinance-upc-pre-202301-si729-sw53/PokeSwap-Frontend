import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { Exchange } from 'src/app/models/exchange.model';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss']
})

export class CurrenciesComponent {
  //Esteban
  //Escoger Metodo de Intercambio (Metodo 1 - Al instante + comision, etc)

  data!: User;
  exchanges: Exchange[] = [
    { name: 'Coinbase', time: 'Instant', comision: 3.50, minimunDesposit: 10.00 },
    { name: 'Binance', time: 'Instant', comision: 3.75, minimunDesposit: 15.00 },
    { name: 'Huobi', time: '1-5 days', comision: 1.50, minimunDesposit: 5.00 },
  ]

  constructor(private service: AuthService, public router: Router) {
    this.data = this.service.getUserData();
  }
  

  //Seleccion de plataforma

  useExchange(selected: Exchange) {
    const redirectUrl = '/token';
    this.router.navigate([redirectUrl]);
    this.service.setExchange(selected);
  }
}
