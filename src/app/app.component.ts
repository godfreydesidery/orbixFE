import { Component, OnInit, AfterViewInit, Injectable } from '@angular/core';
import { Angulartics2Piwik } from 'angulartics2/piwik';
import { LoaderService } from './loader.service';
import * as fromRoot from './global.reducer';
import { Store } from '@ngrx/store';
import * as fromGlobal from './global.action';

import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { TokenStorageService } from './token-storage.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'orbix3';
  //public static baseUrl = "http://localhost:8080";
  public isShowSpinner = false;
  timer = null;

  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;

  

  constructor(private tokenStorageService: TokenStorageService) { }
    ngOnInit() {
      this.isLoggedIn = !!this.tokenStorageService.getToken();

      if (this.isLoggedIn) {
        const user = this.tokenStorageService.getUser();
        this.roles = user.roles;

        //this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
        //this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

        this.username = user.username;
      }
    }

    logout() {
      this.tokenStorageService.signOut();
      window.location.reload();
    }
  
}
