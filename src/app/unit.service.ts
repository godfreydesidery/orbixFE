import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from'./app.component'
import { Observable } from 'rxjs';

import { HttpClient, HttpErrorResponse, HttpHandler } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { delay, retry } from 'rxjs/operators';
import { Data } from './data';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor(private httpClient : HttpClient) { }

  /**
   * Department
   * getdepdid
   * getdeptnames
   */
  public async getDepartmentId (departmentCode,departmentName){
    /**
     * gets department id given departmentCode or departmentName
     * on preference basis
     */
    var id = '' 
    if(departmentCode != '' && departmentCode != null){
      
      await this.httpClient.get(Data.baseUrl+"/departments/department_code="+departmentCode)
      .toPromise()
      .then(
        data=>{
          id=data['id']
        }
      )
      .catch(
        error=>{}
      )
    }else if (departmentName != '' && departmentName != null){
      await this.httpClient.get(Data.baseUrl+"/departments/department_name="+departmentName)
      .toPromise()
      .then(
        data=>{
          id=data['id']
        }
      )
      .catch(
        error=>{}
      )
    }
    return id
  } 


  async getDepartment (id) {
    /**
     * gets item details with a specified id from datastore
     */
    //this.clear
    var department = {}
    await this.httpClient.get(Data.baseUrl+"/departments/"+id)
    .toPromise()
    .then(
      data=>{
        department=data
      },
      error=>{
        if(error['status']==404){

        }else if (error['status']==400){
          window.alert('Bad request, undefined operation!')
        }
        console.log(error)
      }
    )
    .catch(
      error=>{
        alert('Error code: '+error['status'])
      }
    )
    return department
  }

  

  public async getDepartmentNames(){
    var depts = ['1','2','3']

    return depts
  }
  
   /**
    * Class
    */
   public async getClassNames(dep){
     var _classes

     return _classes
   }

   public async getClassId (classCode,className){
    /**
     * gets department id given departmentCode or departmentName
     * on preference basis
     */
    var id = '' 
    if(classCode != '' && classCode != null){
      
      await this.httpClient.get(Data.baseUrl+"/classes/class_code="+classCode)
      .toPromise()
      .then(
        data=>{
          id=data['id']
        }
      )
      .catch(
        error=>{}
      )
    }else if (className != '' && className != null){
      await this.httpClient.get(Data.baseUrl+"/classes/class_name="+className)
      .toPromise()
      .then(
        data=>{
          id=data['id']
        }
      )
      .catch(
        error=>{}
      )
    }
    return id
  } 

  async getClass (id) {
    /**
     * gets item details with a specified id from datastore
     */
    //this.clear
    var _class = {}
    await this.httpClient.get(Data.baseUrl+"/classes/"+id)
    .toPromise()
    .then(
      data=>{
        _class=data
      },
      error=>{
        if(error['status']==404){

        }else if (error['status']==400){
          window.alert('Bad request, undefined operation!')
        }
        console.log(error)
      }
    )
    .catch(
      error=>{
        alert('Error code: '+error['status'])
      }
    )
    return _class
  }

  /**
   * SubClass
   */
  public async getSubClassNames(_class){
    var subClasses

    return subClasses
  }
  public async getSubClassId (subClassCode,subClassName){
    /**
     * gets department id given departmentCode or departmentName
     * on preference basis
     */
    var id = '' 
    if(subClassCode != '' && subClassCode != null){
      
      await this.httpClient.get(Data.baseUrl+"/sub_classes/sub_class_code="+subClassCode)
      .toPromise()
      .then(
        data=>{
          id=data['id']
        }
      )
      .catch(
        error=>{}
      )
    }else if (subClassName != '' && subClassName != null){
      await this.httpClient.get(Data.baseUrl+"/sub_classes/sub_class_name="+subClassName)
      .toPromise()
      .then(
        data=>{
          id=data['id']
        }
      )
      .catch(
        error=>{}
      )
    }
    return id
  } 
  
  async getSubClass (id) {
    /**
     * gets item details with a specified id from datastore
     */
    //this.clear
    var subClass = {}
    await this.httpClient.get(Data.baseUrl+"/sub_classes/"+id)
    .toPromise()
    .then(
      data=>{
        subClass=data
      },
      error=>{
        if(error['status']==404){

        }else if (error['status']==400){
          window.alert('Bad request, undefined operation!')
        }
        console.log(error)
      }
    )
    .catch(
      error=>{
        alert('Error code: '+error['status'])
      }
    )
    return subClass
  }
  
}
