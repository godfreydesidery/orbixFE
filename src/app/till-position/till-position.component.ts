import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Data } from '../data';

@Component({
  selector: 'app-till-position',
  templateUrl: './till-position.component.html',
  styleUrls: ['./till-position.component.css']
})
export class TillPositionComponent implements OnInit {

  
  public tills : object = {}

  public id           : any
  public tillNo       : string
  public computerName : string
  public status       : string
  


  constructor(private httpClient: HttpClient) {
    this.id           = ''
    this.tillNo       = ''
    this.computerName = ''
    this.status       = ''
    
   }

  async ngOnInit(): Promise<void> { 
    
    /**
     * Load all tills to list on page
     */
    this.tills= await this.getTills()
  }


  public async  getTills (){
    /**
     * Return a list of all the users
     */
    var tills = {}
    await this.httpClient.get(Data.baseUrl+"/tills")
    .toPromise()
    .then(
      data=>{
        tills = data
      }
    )
    .catch(
      error=>{}
    )
    return tills
  } 

  

  
  

  
  

  
  
  

}
