import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/users.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { Exchange } from 'src/app/models/exchange.model';
import { Platforms } from 'src/app/models/platforms.model';
import { PlatformsService } from 'src/app/services/platforms.service';

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
    'time', 
    'comision', 
    'minimunDesposit'
  ];

  dataSource = new MatTableDataSource();
  
  constructor(private service: AuthService, public router: Router, private platformService: PlatformsService) {
    this.data = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : {};
  }

  ngOnInit() {
    this.loadPlatform();
    console.log(this.dataSource.data)
  }

  loadPlatform(): void {
    this.platformService.get_AllPlatforms().subscribe((response: any) => {
      const activePlatforms = response.filter((o: any) => o.isActive === true);
      this.dataSource.data = activePlatforms;
      console.log('Platforms:', this.dataSource.data);
    });
  }

  
  data!: User;
  exchanges: Exchange[] = [
    { name: 'Coinbase', time: 'Instant', comision: 3.50, minimunDesposit: 10.00 },
    { name: 'Binance', time: 'Instant', comision: 3.75, minimunDesposit: 15.00 },
    { name: 'Huobi', time: '1-5 days', comision: 1.50, minimunDesposit: 5.00 },
  ]

  //Seleccion de plataforma

  useExchange(selected: Exchange) {
    const redirectUrl = '/token';
    this.router.navigate([redirectUrl]);
    this.service.setExchange(selected);
  }
}
