import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
import { Data } from '../data';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  
  constructor(private httpClient : HttpClient, private spinnerService : NgxSpinnerService) { }
  ngOnInit() {
    this.httpClient.post(Data.baseUrl + "/days/refresh" , null)
    .toPromise()
    .then(
      data => {

      }
    )
    .catch(
      error => {
        alert('error')
      }
    )
  }
}
class Day{
	id : any
	syetemDate : Date
  startedAt : Date
  
}
