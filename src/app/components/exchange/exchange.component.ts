import { Component, Inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Exchange } from 'src/app/models/exchange.model';
import { Token } from 'src/app/models/token.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

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

  data: User | undefined = undefined;
  exchange: Exchange | undefined = undefined;
  token: Token | undefined = undefined;
  quantity: number | undefined = undefined;
  tokenArr: Token[] = [];
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


  constructor(private service: AuthService, public dialog: MatDialog) {
    this.data = this.service.getUserData();
    this.exchange = this.service.getExchange();
    this.token = this.service.getToken();
    console.log(this.data, this.exchange, this.token)
    if (this.token) {
      this.quantity = this.token.quantity * this.token.exchangeRate;
      this.tokenArr.push(this.token);
    }
  }

  onSubmit(): void {
    let num = this.token!.quantity * this.token!.exchangeRate * this.excV.value;
    let operation = '2342' 
    const dialogRef = this.dialog.open(ExchangeDialog, {
      data: { name: operation, value: num },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.success = result;
    });
  }

  myFunc() {
    this.quantity = this.token!.quantity * this.token!.exchangeRate * this.excArr[0].value;
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