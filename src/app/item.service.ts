import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from'./app.component'
import { Observable } from 'rxjs';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private baseUrl = (new AppComponent).baseUrl

  constructor(private httpClient: HttpClient) { }

  
}
