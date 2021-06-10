
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from './data';
import { TokenStorageService } from './token-storage.service';

const AUTH_API = Data.baseUrl+"/auth/";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public static loggedIn : boolean = false
  public static loggedOff : boolean = true
  public static loginFailed : boolean = true

  constructor(private http: HttpClient, private tokenStorage : TokenStorageService) { }

  login(user : any): Observable<any> {
    return this.http.post(AUTH_API + 'login', user);
  }
  isAuthenticated() : boolean{
    if (this.tokenStorage.getToken()) {
      return true
    }
    return true //return true to be able to be authenticated without logged in user, in development mode
  }
}
