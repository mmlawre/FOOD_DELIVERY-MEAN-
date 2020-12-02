import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { environment } from 'src/environments/environment';


@Injectable()
export class UserService{


    constructor(private http: HttpClient, private route: Router) {}


    users = []
    TOKEN_KEY = 'token'
    path = environment.path;
    authPath = 'http://localhost:3000/api/users';



    get token(){
        return localStorage.getItem(this.TOKEN_KEY);
    }

    get isAuthenticated(){
        return !!localStorage.getItem(this.TOKEN_KEY)
    }

  logout() {
        localStorage.clear();
        localStorage.removeItem(this.TOKEN_KEY);
        this.route.navigateByUrl("/login");
    }
    getProfile(id) {
        return this.http.get(this.authPath +'/' + id)
    }
    sendUserRegistration(regData) {
        this.http.post<any>(this.authPath + '/register', regData).subscribe(res => {
          localStorage.setItem(this.TOKEN_KEY, res.token)
          if(this.isAuthenticated){
            localStorage.setItem('currentUserID',res.user._id);
            this.route.navigateByUrl("/profile")
          }else{
              console.log("Registration Failed")
          }
        })

    };
    loginUser(loginData) {
        this.http.post<any>(this.authPath + '/login', loginData).subscribe(res =>{
          localStorage.setItem(this.TOKEN_KEY, res.token)
            if(this.isAuthenticated){
              localStorage.setItem('currentUserID',res.user._id);
              this.route.navigateByUrl("/profile")
            }else{
                console.log("Login Failed")
            }
        })
    };
    deleteUser(id) {
        this.http.delete<any>(this.authPath + '/' + id).subscribe(res => {
            localStorage.removeItem(this.TOKEN_KEY);
            this.route.navigateByUrl("/login")
        })
    }
    updateUser(userData, id) {
        this.http.patch<any>(this.authPath + '/' + id, userData).subscribe(res => {
            console.log('Your update was successful')
            this.route.navigateByUrl('profile')
        })
    }
}
