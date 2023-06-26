import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { Plataform } from 'src/app/models/plataform.model';
import { PlataformService } from 'src/app/services/plataform.service';

import { Exchange } from 'src/app/models/exchange.model';

interface ICurrencies{
  name: string;
  trasaction_fee: number;
  transaction_minimum_depostit: number;
  transaction_time: string;
}

const CurrenciesData : ICurrencies[] = [
  { name: 'Coinbase', transaction_time: '2 days', trasaction_fee: 2.50, transaction_minimum_depostit: 60.00 },
  { name: 'Binance', transaction_time: '1 day', trasaction_fee: 1.75, transaction_minimum_depostit: 40.00 },
  { name: 'Huobi', transaction_time: '1-5 days', trasaction_fee: 1.50, transaction_minimum_depostit: 50.00 },
  { name: 'PokeSwap', transaction_time: 'Instant', trasaction_fee: 1.50, transaction_minimum_depostit: 35.00 }
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
    'trasaction_fee',
    'transaction_minimum_depostit',
    'transaction_time',
  ];

  plataformData!: Plataform;


  dataSource = new MatTableDataSource();

  ngOnInit(){
    /*this.dataSource.data = CurrenciesData;
    console.log(this.dataSource.data)*/
    this.plataformService.get_Plataforms().subscribe((data: Plataform) => {
      this.plataformData = data;
      console.log('asdjfñasdlkfjas', this.plataformData);
    });
  }

  data!: User;
  exchanges: Exchange[] = [
    { name: 'Coinbase', time: '2 days', comision: 2.50, minimunDesposit: 60.00 },
    { name: 'Binance', time: '1 day', comision: 1.75, minimunDesposit: 40.00 },
    { name: 'Huobi', time: '1-5 days', comision: 1.50, minimunDesposit: 50.00 },
    { name: 'PokeSwap', time: 'Instant', comision: 1.50, minimunDesposit: 35.00 }
  ]

  constructor(private service: AuthService, public router: Router, private plataformService: PlataformService) {
    this.data = this.service.getUserData();
    this.plataformData = {} as Plataform;
  }
  

  //Seleccion de plataforma

  useExchange(selected: Exchange) {
    const redirectUrl = '/token';
    this.router.navigate([redirectUrl]);
    this.service.setExchange(selected);
  }
}
