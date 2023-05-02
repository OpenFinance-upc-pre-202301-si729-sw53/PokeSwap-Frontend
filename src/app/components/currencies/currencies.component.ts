import { Component } from '@angular/core';

interface Exchange  {
    name: string,
    time: string,
    comision: number,
    minimunDesposit: number,
}

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss']
})

export class CurrenciesComponent {
  //Esteban
  //Escoger Metodo de Intercambio (Metodo 1 - Al instante + comision, etc)
  
  exchanges: Exchange[] = [
    {name: 'Coinbase', time: 'Instant', comision: 3.50, minimunDesposit: 10.00},
    {name: 'Binance', time: 'Instant', comision: 3.75, minimunDesposit: 15.00},
    {name: 'Huobi', time: '1-5 days', comision: 1.50, minimunDesposit:5.00},
  ]

  //Seleccion de plataforma

}
