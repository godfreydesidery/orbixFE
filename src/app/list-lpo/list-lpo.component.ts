import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Data } from '../data';

@Component({
  selector: 'app-list-lpo',
  templateUrl: './list-lpo.component.html',
  styleUrls: ['./list-lpo.component.css']
})
export class ListLPOComponent implements OnInit {

  public lpos = {}

  constructor(private httpClient : HttpClient) { }

  async ngOnInit(): Promise<void> {
    this.lpos = await this.getLpos()
  }


  public async  getLpos (){
    /**
     * List all lpos
     */
    var lpos = {}
    await this.httpClient.get(Data.baseUrl+"/lpos")
    .toPromise()
    .then(
      data=>{
        lpos = data
      }
    )
    .catch(
      error=>{}
    )
    return lpos
  } 

}
