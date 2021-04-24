import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Data } from '../data';

@Component({
  selector: 'app-end-of-day',
  templateUrl: './end-of-day.component.html',
  styleUrls: ['./end-of-day.component.css']
})
export class EndOfDayComponent implements OnInit {

  id : any
  systemDate : Date
  startedAt : Date
  computerDate : Date

  constructor(private httpClient: HttpClient ) {
    this.systemDate = null
    this.startedAt = null
    this.computerDate = new Date()
   }

  async ngOnInit(): Promise<void> {
    
    await this.httpClient.get(Data.baseUrl+"/days/get_current")
    .toPromise()
    .then(
      data => {
        this.systemDate = data['systemDate']
        this.startedAt = data['startedAt']
      }
    )
    .catch(
      error => {
        alert(error['error'])
      }
    )
  }

  async endDay(){
    var day = new Day
    day.systemDate = this.systemDate

    if(window.confirm("You are about to end the current day "+day.systemDate+". Confirm?")){

    

      await this.httpClient.post(Data.baseUrl+"/days/end_current", day)
      .toPromise()
      .then(
        data => {
          this.systemDate = data['systemDate']
          this.startedAt = data['startedAt']
          alert("Day ended successifully, you will be logged out")
        }
      )
      .catch(
        error => {
          alert(error['error'])
        }
      )
    }
  }
}
export class Day {
  id : any
  systemDate : Date
  startedAt : Date
  computerDate : Date
  status : string
}
