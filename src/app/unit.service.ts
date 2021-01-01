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
  public async getDepartmentId (departmentCode : string, departmentName : string){
    /**
     * Get a department id given code or name
     * on preference basis
     */
    var id = null
    if(departmentCode != ''){
      await this.httpClient.get(Data.baseUrl+"/departments/department_code="+departmentCode)
      .toPromise()
      .then(
        data=>{
          id=data['id']
        }
      )
      .catch(
        error=>{
          //alert(error['status']+" "+error['name'])
        }
      )
    }else if (departmentName != ''){
      await this.httpClient.get(Data.baseUrl+"/departments/department_name="+departmentName)
      .toPromise()
      .then(
        data=>{
          id=data['id']
        }
      )
      .catch(
        error=>{
          //alert(error['status']+" "+error['name'])
        }
      )
    }
    return id
  } 


  async getDepartment (id : any) {
    /**
     * Gets department details with a specified id from datastore
     */
    var department = {}
    await this.httpClient.get(Data.baseUrl+"/departments/"+id)
    .toPromise()
    .then(
      data=>{
        department=data
      },
      error=>{
        
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
    /**
     * Return the names of all the departments
     */
    var values: any= new Array()
    var departments: any=[]
    await this.httpClient.get(Data.baseUrl+"/departments/department_names")
    .toPromise()
    .then(
      data=>{
        values = data
      }
    )
    .catch(
      error=>{}
    )
    Object.values(values).map((data)=>{
      departments.push(data)
    })
    return departments
  }
  
   /**
    * Class
    */
   

   public async getClassId (classCode :string, className : string){
    /**
     * gets department id given departmentCode or departmentName
     * on preference basis
     */
    var id = null 
    if(classCode != '' ){
      
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
    }else if (className != '' ){
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

  async getClass (id : any) {
    /**
     * gets item details with a specified id from datastore
     */
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
  async geDepartments(){
    var departments = null
    await this.httpClient.get(Data.baseUrl+"/departments")
    .toPromise()
    .then(
      data=>{
        departments=data
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

    return departments
  }
  async getClasses(department : string){
    var classes = null
    await this.httpClient.get(Data.baseUrl+"/classes/department_name="+department)
    .toPromise()
    .then(
      data=>{
        classes=data
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


    return classes
  }
  async getSubClasses(class_){
    var subClasses
    await this.httpClient.get(Data.baseUrl+"/sub_classes/class_name="+class_)
    .toPromise()
    .then(
      data=>{
        subClasses=data
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

    return subClasses
  }
  
}
