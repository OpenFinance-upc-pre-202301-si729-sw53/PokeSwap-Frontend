import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Exchange } from 'src/app/models/exchange.model';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/users.model';
import { AuthService } from 'src/app/services/auth.service';
import { Cryptos } from 'src/app/models/cryptos.model';
import { CryptosService } from 'src/app/services/cryptos.service';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import * as _ from 'lodash'


@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent {
  displayedColumns: string[] = [
    'name',
    'balance',
    'exchangeRate',
    'action'
  ]

  dataSource = new MatTableDataSource();

  data!: User;
  exchange!:Exchange;
  //cryptos: Cryptos[] = [];
  @ViewChild('cryptoForm', {static: false}) cryptoForm!: NgForm;

  cryptoData!: Cryptos;
  isEditMode = false;
  constructor(private cryptoService: CryptosService, private service: AuthService, public router: Router, private location: Location) {
    this.data = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : {};
    this.exchange = this.service.getExchange();
    this.cryptoData = {} as Cryptos;
  }

  ngOnInit(): void {
    
    this.loadCryptos();
  }

  loadCryptos() {
    this.cryptoService.get_AllCryptos().subscribe((response: any) => {
      const activeCrypto = response.filter((o: any) => o.isActive === true);
      this.dataSource.data = activeCrypto;
      console.log('Cryptos:', this.dataSource.data);

      /*this.cryptos = response;
      console.log('Cryptos:', this.cryptos);*/
    });
  }

  editItem(element: any){
    this.cryptoData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  Item :Cryptos = {} as Cryptos;
  deleteItem(id: string){

    const userObj = {
      user: {
        id: 1
      }
    };
    this.cryptoService.get_Crypto(id).toPromise().then((response: any) => {
      this.Item = response;
      this.Item.user=userObj.user;
      this.Item.isActive = false;
      console.log('Crypto to delete:', this.Item);

      this.cryptoService.update_Crypto(id, this.Item).subscribe((response: any) => {
        this.dataSource.data = this.dataSource.data.filter((o: any) => {
          if(o.id !== id){
            o = response;
            this.refreshPage();
          }
          else{
            return o;
          }
        });
      });
    });

      /*this.cryptoService.delete_Crypto(id).subscribe(
        (response: any) => {
          this.dataSource.data = this.dataSource.data.filter((o: any) => {
          return o.id !== id? o :false;
        });
      });
      console.log(this.dataSource.data);*/
  }

  addCrypto(){

    if(this.cryptoData.symbol==null){
      this.cryptoData.symbol="strings";
    }
    const userObj = {
      user: {
        id: 1
      }
    };
    this.cryptoData.user=userObj.user;

    console.log('cryptoData:', this.cryptoData);


    if (!this.validNames.includes(this.cryptoData.name)) {
      alert("Please enter a valid name");
    } 
    else if (this.dataSource.data.some((o: any) => o.name === this.cryptoData.name && o.isActive)) {
      alert("An active object with the same name already exists");
    }
    else {
      this.cryptoService.create_Crypto(this.cryptoData).subscribe(
        (response: any) => {
          this.dataSource.data.push({ ...response });
          this.dataSource.data = this.dataSource.data.map((o: any) => {
            return o;
          });
        }
      );
    }

  }


   validNames = [
    "Bitcoin",
    "Ethereum",
    "Tether",
    "Binance Coin",
    "U.S. Dollar Coin",
    "XRP",
    "Cardano",
    "Dogecoin",
    "TRON"
  ];

  updateCrypto(){
    console.log('Crypto to update:', this.cryptoData);

    /*console.log('id:', this.cryptoData.id);
    console.log('name:', this.cryptoData.name);
    console.log('balance:', this.cryptoData.balance);
    console.log('exchangeRate:', this.cryptoData.exchangeRate);
    console.log('isActive:', this.cryptoData.isActive);
    console.log('user:', this.cryptoData.user);*/


    const userObj = {
      user: {
        id: 1
      }
    };
    this.cryptoData.user=userObj.user;


    if (!this.validNames.includes(this.cryptoData.name)) {
      alert("Please enter a valid name");
    } 
    else if (this.dataSource.data.some((o: any) => o.name === this.cryptoData.name && o.isActive)) {
      alert("An active object with the same name already exists");
    }
    else {
      this.cryptoService.update_Crypto(String(this.cryptoData.id), this.cryptoData).subscribe(
        (response: any) => {
          this.dataSource.data = this.dataSource.data.map((o: any) => {
            if (o.id === this.cryptoData.id) {
              return response;
            }
            return o;
          });
        }
      );
    }
  }
  
  onSubmit(){
    if(this.cryptoForm.form.valid){
      console.log('valid', this.cryptoData);
      if(this.isEditMode){
        console.log('about update')
        this.updateCrypto();
      }
      else{
        console.log('about create')
        this.addCrypto();
      }
      this.cancelEdit();
    }
    else{
      console.log('invalid');
    }
  }

  cancelEdit(){
    this.isEditMode = false;
    this.cryptoForm.resetForm();
  }




  refreshPage(): void {
    this.location.go(this.location.path()); // Navega a la URL actual
    window.location.reload(); // Recarga la página
  }
  

  useCrypto(crypt: Cryptos){
    const redirectUrl = '/exchange';
    this.router.navigate([redirectUrl]);
    this.service.setCrypto(crypt);
  }
}