import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Data } from '../data';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;
  systemDate : Date

  constructor(private httpClient : HttpClient, private tokenStorageService: TokenStorageService,  private tokenStorage: TokenStorageService) { }

  async ngOnInit(): Promise<void> {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }

    await this.httpClient.get(Data.baseUrl+"/days/get_current")
    .toPromise()
    .then(
      data => {
        this.systemDate = data['systemDate']
      }
    )
    .catch(
      error => {
        alert(error['error'])
      }
    )
  }
  

  logout() {
    if(window.confirm("Confirm Log out")){
      this.tokenStorageService.signOut();
      this.isLoggedIn = false
      window.location.reload();
    }
  }

}
