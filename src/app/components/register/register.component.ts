import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private service: UserService, public router: Router) {
    this.userData = {} as User;
  }

  generateNewUserIdAndHash(): void {
    let maxId = 0;
    this.service.getUsers().subscribe((response) => {
      for (const user of response) {
        if (user.id > maxId) {
          maxId = user.id;
        }
      }
      this.userData.id = maxId + 1;
      // Generate a new password hash
      const newPassword = this.userData.password; // Replace this with the logic to generate a new password
      this.userData.password_hash = this.service.generatePasswordHash(newPassword);
    });
  }
  

  async onSubmit() {
    this.generateNewUserIdAndHash();

    await this.service.addUser(this.userData).subscribe(response=>console.log(response));
    this.service.getUsers().subscribe((response => console.log('user created!',response)))

    const redirectUrl = '/login';
    this.router.navigate([redirectUrl]);
    this.userForm.resetForm();
  }
}
