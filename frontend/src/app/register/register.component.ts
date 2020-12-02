import { Component } from '@angular/core';
import { UserService } from '../services/user.service';




@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerData = {
    'firstname':'',
    'lastname':'',
    'email': '',
    'password': '' ,
    'telephone':'',

  }

    constructor(private apiService: UserService){}

      Post(){
        this.apiService.sendUserRegistration(this.registerData);
      }



}
