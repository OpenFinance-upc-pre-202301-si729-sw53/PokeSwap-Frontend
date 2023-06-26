import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tokens-list',
  templateUrl: './tokens-list.component.html',
  styleUrls: ['./tokens-list.component.scss']
})
export class TokensListComponent {
  //Portfolio: Brando
  //Viste de Tokens (Cards)
  //Patron: Decorator


  nombre!: string;
  apellido!: string;
  newnombre!: string;
  newapellido!: string;

  myForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(){
    this.myForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required]
    });

    this.nombre = 'Brando';
    this.apellido = 'Gonzalez';
  }

  guardar() {
    if(this.newnombre == null || this.newapellido == null){
      alert("No se puede dejar campos vacios");
    }
    else{
      this.nombre = this.newnombre;
      this.apellido = this.newapellido;
      this.newnombre='';
      this.newapellido='';
    }
  }
}
