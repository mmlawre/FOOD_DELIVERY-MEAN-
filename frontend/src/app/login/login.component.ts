import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'Login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent {

loginData = {
  'email': '',
  'password': ''
}

  constructor (private apiService: UserService){ }

  login(){
    this.apiService.loginUser(this.loginData);
  }

}
