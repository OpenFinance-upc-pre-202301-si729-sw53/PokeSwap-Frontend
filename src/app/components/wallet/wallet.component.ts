import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit{
  saldo: number = 1000;

  retirardinero!: string;
  agregardinero!: string;

  myForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
   }

  ngOnInit(){
    this.myForm = this.formBuilder.group({
      retirardinero: ['', Validators.required],
      agregardinero: ['', Validators.required]
    });

    this.agregardinero = '';
    this.retirardinero = '';
  }


  ADinero(){
    if(this.agregardinero == null || isNaN(parseInt(this.agregardinero))){
      alert("Ingrese un valor valido");
    }
    else{
      this.saldo = this.saldo + parseInt(this.agregardinero);
      this.agregardinero = '';
    }
  }

  RDinero(){
    if(this.retirardinero == null || isNaN(parseInt(this.agregardinero))){
      alert("Ingrese un valor valido");
    }
    else{
      this.saldo = this.saldo - parseInt(this.retirardinero);
      this.retirardinero= '';
    }
  }
}
