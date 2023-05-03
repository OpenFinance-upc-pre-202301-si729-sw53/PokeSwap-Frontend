import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
//John abc123
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  userData: User;

  @ViewChild('userForm', { static: false })
  userForm!: NgForm;

  constructor(private service: AuthService, public router: Router) {
    this.userData = {} as User;
  }

  async onSubmit() {
    console.log(this.userData)
    if (await this.service.login(this.userData.name, this.userData.password)) {
      console.log('valid data')
      const redirectUrl = '/dashboard/currencies';
      this.router.navigate([redirectUrl]);
    }
    else console.log('invalid data')
    this.userForm.resetForm();

  }
}
