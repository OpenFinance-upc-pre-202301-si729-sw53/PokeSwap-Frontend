import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/users.model';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  userData: User;

  @ViewChild('userForm', { static: false })
  userForm!: NgForm;

  constructor(private service: AuthService, public router: Router, private _snackBar: MatSnackBar) {
    this.userData = {} as User;
  }

  async onSubmit() {
    console.log(this.userData);
    
    const registrationSuccessful = await this.service.register({
      email: this.userData.email,
      password: this.userData.password,
      name: this.userData.name,
      phone: this.userData.phone.toString(),
      country: this.userData.country,
      address: this.userData.address
    });

    if (registrationSuccessful) {
      console.log('Registration successful');
      this._snackBar.open('Registro Exitoso', '', { duration: 2000 });
      const redirectUrl = '/login';
      this.router.navigate([redirectUrl]);
      this.userForm.resetForm();
    } else {
      this._snackBar.open('Registro Fallido', '', { duration: 2000 });
      console.log('Registration failed');
    }
  }
}
