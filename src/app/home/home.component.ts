import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { TokenStorageService } from '../token-storage.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  form: any = {};
  username : string = 'username'
  password : string = 'password'
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  content: string;

  loggedIn : boolean = AuthService.loggedIn
  loggedOff : boolean = AuthService.loggedOff
  loginFailed : boolean = AuthService.loginFailed

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private userService: UserService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
    }

    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

  /*onSubmit() {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }
  */

  reloadPage() {
    window.location.reload();
  }
  

  login(){

   /* this.tokenStorage.saveToken("1");

    this.isLoginFailed = false;
    this.isLoggedIn = true;
    //AuthService.loginFailed = false
    //AuthService.loggedOff = false
    this.loggedIn  = this.isLoggedIn //AuthService.loggedIn
    //this.loggedOff  = AuthService.loggedOff
    */

    var user : User = new User()
    user.username = this.username
    user.password = this.password
    this.authService.login(user).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      error => {
        this.errorMessage = error.message;
        this.isLoginFailed = true;
        alert(error['error'])
      }
    );

  }
  

}
class User{
  username : string
  password : string
  accessToken : string
}
