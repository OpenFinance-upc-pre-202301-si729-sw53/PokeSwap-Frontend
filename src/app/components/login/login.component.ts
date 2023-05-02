import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  userData:User;

  @ViewChild('userForm', {static:false})
  userForm!:NgForm;

  constructor(private service: UserService) {
    this.userData = {} as User;
  }

  onSubmit(){
    console.log(11)
    console.log(this.userData)
    this.userForm.resetForm();
  }
}
