import { Component, OnInit } from '@angular/core';
import { AppComponent } from'../app.component'
import { ItemService } from '../item.service'
import { Observable } from 'rxjs';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { StatusbarComponent } from '../statusbar/statusbar.component';
import { delay, retry } from 'rxjs/operators';
import { Data } from '../data';
import { SupplierService } from '../supplier.service';
import { Ng2CompleterModule } from 'ng2-completer';
import { CompleterService, CompleterData } from 'ng2-completer';
import { Crud } from '../crud';
import { UnitService } from '../unit.service';

@Component({
  selector: 'app-sub-class',
  templateUrl: './sub-class.component.html',
  styleUrls: ['./sub-class.component.css']
})
export class SubClassComponent implements OnInit {

  public subClassNames: string [] = []
  public clasNames: string [] = []
  public departmentNames: string [] = []

  public id
  public subClassCode
  public subClassName 
  public clasName :string
  public departmentName :string

  public subClasses : object = {}

  constructor(private httpClient : HttpClient) {
    this.id = ''
    this.subClassCode = ''
    this.subClassName = ''
   }

   async ngOnInit(): Promise<void> { 
    /**
     * load items description to enable autocomplete
     */
    /*((new UnitService(this.httpClient)).getClassNames(this))
    .then(
      res=>{
        Object.values(res).map((className:string)=>{
          this.classes.push(className)
        })
      }
    );*/
    this.subClasses= await this.getSubClasses()
    this.departmentNames = await (new UnitService(this.httpClient)).getDepartmentNames()

   }
  

  getSubClassData(){
    /**
     * 
     */
    var subClassData = {
      id           : this.id,
      subClassCode : this.subClassCode,
      subClassName : this.subClassName,
      clas         : {clasName : this.clasName},
      department   : {departmentName : this.departmentName}
    }
    return subClassData
  }

  clear(){
    /**
     * clear the fields
     */
    this.id        = '';
    this.subClassCode = '';
    this.subClassName = '';
    this.clasName='';
    this.departmentName='';
  }

  showSubClass(subClass){
    
    /**
     * render information for display, these are displayed 
     * automatically using two way data binding
     */
    this.id            = subClass['id']
    this.subClassCode  = subClass['subClassCode']
    this.subClassName  = subClass['subClassName']
    this.clasName  = subClass['clas'].clasName
    this.departmentName  = subClass['department'].departmentName
    
  }

  validateData(){
    /**
     * validates user inputs
     * return false if validation fails
     */
    var valid : boolean = true
    if(this.subClassCode == ''){
      valid = false
      window.alert('Subclass required')
      return valid
    } 
    return valid
  }

  saveSubClass() { 
    /**
     * create or update an 
     * first, check validation
     */
    if(this.validateData()==true){

      var subClass = this.getSubClassData()
      if( this.id == '' || this.id == null || this.id == 0 ) {
        //save a new department
        this.httpClient.post(Data.baseUrl + "/sub_classes", subClass)
        .subscribe(
          data=>{
            window.alert('Subclass created successifully')
            console.log(data)
            this.id=data['id']
          },
          error=>{
            console.log(error)
          }
        )
      } else {
        //update an existing item
        this.httpClient.put(Data.baseUrl + "/sub_classes/" + this.id, subClass)
        .subscribe(
          data=>{
            window.alert('Subclass updated successifully')
            console.log(data)
            this.id=data['id']
          },
          error=>{
            console.log(error)
          }
        )
      }  
    }
  }
  async searchSubClass() { 
    /**
     * search department by id
     * gets id from getDepartmentId
     */
    var subClassId=''
    this.clear
    subClassId = await (new UnitService(this.httpClient)).getClassId(this.subClassCode,this.subClassName)
    if(subClassId == ''||subClassId == null){
      alert('No matching record')
    }else{
      var subClass
      subClass =await (new UnitService(this.httpClient)).getSubClass(subClassId)
      console.log(subClass)
      this.showSubClass(subClass)
    }
  }
  deleteSubClass() { 
    /**
     * delete an department given its id
     */
    var id = this.id
    this.httpClient.delete(Data.baseUrl+"/sub_classes/"+id)
    .subscribe(
      data=>{
        console.log(data)
        if(data==null){
          this.clear()
          alert('Subclass successifully deleted')
        }
      },
      error=>{
        console.log(error)
      }
    )
  }

  public async  getSubClasses (){
    /**
     * Return a list of all the classes
     */
    var subClasses = {}
    await this.httpClient.get(Data.baseUrl+"/sub_classes")
    .toPromise()
    .then(
      data=>{
        subClasses = data
      }
    )
    .catch(
      error=>{}
    )
    return subClasses
  } 
  
  getClasses(departmentName){
    for( var i = 0; i <= this.clasNames.length; i++ ){
      this.clasNames.pop()
    }
    ((new UnitService(this.httpClient)).getClasses(departmentName))
    .then(
      res=>{
        Object.values(res).map((clas:string)=>{
          this.clasNames.push(clas['clasName'])
        })
      }
    );
  }
  async search(id){
    var subClass
      subClass = await (new UnitService(this.httpClient)).getSubClass(id)
      this.showSubClass(subClass)
  }
}
