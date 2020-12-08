import { Component, OnInit, AfterViewInit, Injectable } from '@angular/core';
import { Angulartics2Piwik } from 'angulartics2/piwik';
import { LoaderService } from './loader.service';
import * as fromRoot from './global.reducer';
import { Store } from '@ngrx/store';
import * as fromGlobal from './global.action';

import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'orbix3';
  public static baseUrl = "http://localhost:8080";
  public isShowSpinner = false;
  timer = null;

  
  constructor() { }
    ngOnInit() {
    }
  
}
