import { Component, Inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Exchange } from 'src/app/models/exchange.model';
import { Token } from 'src/app/models/token.model';
import { User } from 'src/app/models/users.model';
import { AuthService } from 'src/app/services/auth.service';
import { Cryptos } from 'src/app/models/cryptos.model';
import { CryptosService } from 'src/app/services/cryptos.service';
import { Platforms } from 'src/app/models/platforms.model';
import { PlatformsService } from 'src/app/services/platforms.service';
import { DataConfigService } from 'src/app/services/data-config.service';

export interface DialogData {
  name: string;
  value: number;
}

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
})
export class ExchangeComponent {

  isVisible = false;
  showForm() {
    this.isVisible = true;
    this.router.navigate(['/dashboard']);
  }

  data: User | undefined = undefined;
  // exchange: Exchange | undefined = undefined;
  exchange: Platforms | undefined = undefined;
  crypto: Cryptos | undefined = undefined;
  quantity: number | undefined = undefined;
  cryptoArr: Cryptos[] = [];
  nameFrom: string = '';
  nameTo: string = '';
  success:any = undefined;
  excV = {
    name: 'PEN',
    value: 1
  };
  excArr = [
    {
      name: 'PEN',
      value: 1
    },
    {
      name: 'USD',
      value: 4
    },
  ]
  @ViewChild('exchangeForm', { static: false })
  userForm!: NgForm;
  //Obtener data de otro componente:
  //https://angular.io/guide/inputs-outputs

  //Realizar intercambio -> Patron Observer + Patron Chain of Responsibility
  //https://refactoring.guru/es/design-patterns/chain-of-responsibility/typescript/example


  constructor(private service: AuthService, public dialog: MatDialog, private platformService: PlatformsService, private cryptoService: CryptosService, private dataService: DataConfigService, private router: Router) {
    this.data = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : {};
    // this.exchange = this.service.getExchange() || {};

    // this.crypto = this.service.getCrypto() || {};
    console.log(this.data, this.exchange, this.crypto)
  }
  
  ngOnInit(): void {
    this.platformService.get_Platforms('1').subscribe((response: any) => {
      this.exchange = response;
      console.log('Exchange:', this.exchange);
    });
    
    this.cryptoService.get_Crypto('1').subscribe((response: any) => {
      this.crypto = response;
      console.log('Crypto:', this.crypto);
      this.quantity = this.crypto!.balance * this.crypto!.exchangeRate;
      this.cryptoArr.push(this.crypto!);
      console.log('CryptoArr:', this.cryptoArr);
    });
    
    
    
    this.nameFrom = this.dataService.getSelectedOptionFrom();
    this.nameTo = this.dataService.getSelectedOptionTo();
    console.log('nameFrom:',this.nameFrom);
    if (this.crypto) {
      this.quantity = this.crypto.balance * this.crypto.exchangeRate;
      this.cryptoArr.push(this.crypto);
    }
  }

  onSubmit(): void {
    let num = this.crypto!.balance * this.crypto!.exchangeRate * this.excV.value;
    let operation = '2342' 
    const dialogRef = this.dialog.open(ExchangeDialog, {
      data: { name: operation, value: num },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
      this.success = result;
    });
  }

  myFunc() {
    this.quantity = this.crypto!.balance * this.crypto!.exchangeRate * this.excArr[0].value;
  }
  //Pago -> Facade
}

@Component({
  selector: 'exchange-dialog',
  templateUrl: 'exchange-dialog.html',
})
export class ExchangeDialog {
  constructor(
    public dialogRef: MatDialogRef<ExchangeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public router: Router
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
    const redirectUrl = '/dashboard/portfolio';
      this.router.navigate([redirectUrl]);
  }
}