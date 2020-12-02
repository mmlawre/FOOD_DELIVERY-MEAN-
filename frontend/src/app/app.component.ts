import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { Router} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent{

  title(title: any) {
    throw new Error("Method not implemented.");
  }

  public theme = 'blue'

  constructor(public apiService: UserService, private route: Router) {
  }

}
