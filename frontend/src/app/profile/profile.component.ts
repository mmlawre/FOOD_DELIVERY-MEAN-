import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor( public apiService: UserService, private router: Router, private route: ActivatedRoute) { }

  profile: any;
  user_id: any;

  ngOnInit() {
    // let id = this.route.snapshot.params.id;
    // this.apiService.getProfile(id).subscribe(data => this.profile = data)
    this.user_id = localStorage.getItem('currentUserID')
    this.apiService.getProfile(this.user_id).subscribe(data=>this.profile = data)
  }
  GotoUpdate(){
    this.router.navigateByUrl('update')
  }
  Delete() {
    this.apiService.deleteUser(this.user_id);
  }
}
