import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatTableDataSource } from '@angular/material/table';

import { Exchange } from 'src/app/models/exchange.model';

interface ICurrencies{
  name: string;
  comision: number;
  minimunDesposit: number;
  time: string;
}

const CurrenciesData : ICurrencies[] = [
  { name: 'Coinbase', time: '2 days', comision: 2.50, minimunDesposit: 60.00 },
  { name: 'Binance', time: '1 day', comision: 1.75, minimunDesposit: 40.00 },
  { name: 'Huobi', time: '1-5 days', comision: 1.50, minimunDesposit: 50.00 },
  { name: 'PokeSwap', time: 'Instant', comision: 1.50, minimunDesposit: 35.00 }
];



@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss']
})

export class CurrenciesComponent {
  //Esteban
  //Escoger Metodo de Intercambio (Metodo 1 - Al instante + comision, etc)

  displayedColumns: string[] = [
    'name',
    'comision',
    'minimunDesposit',
    'time',
  ];
  dataSource = new MatTableDataSource();

  ngOnInit(){
    this.dataSource.data = CurrenciesData;
    console.log(this.dataSource.data)
  }

  data!: User;
  exchanges: Exchange[] = [
    { name: 'Coinbase', time: '2 days', comision: 2.50, minimunDesposit: 60.00 },
    { name: 'Binance', time: '1 day', comision: 1.75, minimunDesposit: 40.00 },
    { name: 'Huobi', time: '1-5 days', comision: 1.50, minimunDesposit: 50.00 },
    { name: 'PokeSwap', time: 'Instant', comision: 1.50, minimunDesposit: 35.00 }
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
