import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from './data';

@Injectable({
  providedIn: 'root'
})
export class CompanyProfileService {

  constructor( private httpClient: HttpClient ) { }

  
  public async  getCompany (){
    /**
     * List all suppliers
     */
    var company = {}
    await this.httpClient.get(Data.baseUrl+"/company")
    .toPromise()
    .then(
      data=>{
        company = data
      }
    )
    .catch(
      error=>{}
    )
    return company
  } 
}
