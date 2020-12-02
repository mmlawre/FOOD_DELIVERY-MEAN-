
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Router} from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {

  userData : any;
  user_id: any;


    constructor(private apiService: UserService ,private router: Router, private route: ActivatedRoute){}
    ngOnInit() {
      this.user_id = localStorage.getItem('currentUserID')
      this.apiService.getProfile(this.user_id).subscribe(data=>this.userData = data)
    }

    update(){
      this.apiService.updateUser(this.userData, this.user_id)
    }


}
