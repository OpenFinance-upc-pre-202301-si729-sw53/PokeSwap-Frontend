import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  userData: User;

  @ViewChild('userForm', { static: false })
  userForm!: NgForm;
  router: any;

  constructor(private service: UserService) {
    this.userData = {} as User;
  }

  onSubmit() {
    console.log(this.userData);
    this.service.addUser(this.userData);
    this.userForm.resetForm();
    const redirectUrl = '/login';
    this.router.navigate([redirectUrl]);
  }
}
