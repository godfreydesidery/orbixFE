import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from'../app.component'
import { ItemService } from '../item.service'
import { Observable } from 'rxjs';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { StatusbarComponent } from '../statusbar/statusbar.component';
import { delay, retry } from 'rxjs/operators';
import { Data } from '../data';
import { SupplierService } from '../supplier.service';
import { Ng2CompleterModule } from 'ng2-completer';
import { CompleterService, CompleterData } from 'ng2-completer';
import { Crud } from '../crud';
import { UnitService} from '../unit.service'

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  public classNames: string [] = []
  public departmentNames: string [] = []
  public classes : object = {}
  //public classes: string [] = []

  id : any
  classCode : string
  className :string
  departmentName : string

  constructor(private httpClient : HttpClient) {
    this.id = ''
    this.classCode = ''
    this.className = ''
    this.departmentName = ''
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

    /**
     * Load all departments to list on page
     */
    this.classes= await this.getClasses()
    this.departmentNames = await (new UnitService(this.httpClient)).getDepartmentNames()

   }
  

  getClassData(){
    /**
     * gets department data from inputs
     */
    var classData = {
      id        : this.id,
      classCode : this.classCode,
      className : this.className,
      department:{
                  departmentName:this.departmentName
                  }
    }
    return classData;
  }

  public async  getClasses (){
    /**
     * Return a list of all the classes
     */
    var classes = {}
    await this.httpClient.get(Data.baseUrl+"/classes")
    .toPromise()
    .then(
      data=>{
        classes = data
      }
    )
    .catch(
      error=>{}
    )
    return classes
  } 

  clear(){
    /**
     * clear the fields
     */
    this.id             = '';
    this.classCode      = '';
    this.className      = '';
    this.departmentName = '';
    
  }

  showClass(_class : any){
    
    /**
     * render information for display, these are displayed 
     * automatically using two way data binding
     */
    this.id             = _class['id']
    this.classCode      = _class['classCode']
    this.className      = _class['className']
    this.departmentName = _class['department'].departmentName
    
  }

  validateData(){
    /**
     * validates user inputs
     * return false if validation fails
     */
    var valid : boolean = true
    if(this.classCode == ''){
      valid = false
      window.alert('Error: Class Code required!')
      return valid
    } 
    if(this.className == ''){
      valid = false
      window.alert('Error: Class Name required!')
      return valid
    } 
    if(this.departmentName == ''){
      valid = false
      window.alert('Error: Class Name required!')
      return valid
    } 
    return valid
  }

  saveClass() { 
    /**
     * Create a new class, or
     * update an existing class
     */
    if(this.validateData()==true){
      var _class = this.getClassData()
      if( this.id == '' || this.id == null || this.id == 0 ) {
        //save a new class
        this.httpClient.post(Data.baseUrl + "/classes" , _class)
        .subscribe(
          data=>{
            window.alert('Class created successifully')
            console.log(data)
            this.id=data['id']
          },
          error=>{
            console.log(error)
          }
        )
      } else {
        //update an existing item
        this.httpClient.put(Data.baseUrl + "/classes/" + this.id , _class)
        .subscribe(
          data=>{
            window.alert('Class updated successifully')
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
  async searchClass() { 
    /**
     * search class by id
     * gets id from getClassId
     */
    var classId = null
    classId = await (new UnitService(this.httpClient)).getClassId(this.classCode,this.className)
    if(classId == null){
      if(this.classCode == '' && this.className == ''){
        alert('Please enter a search key!')
      }else{
        alert('The requested record could not be found')
      }
    }else{
      var _class : any
      _class =await (new UnitService(this.httpClient)).getClass(classId)
      console.log(_class)
      this.showClass(_class)
    }
  }


  /**
   * 
   * @param id Search a the selected class
   */
  async search(id : any){
    this.clear()
    var _class =await (new UnitService(this.httpClient)).getClass(id)
    this.showClass(_class)
  }

  deleteClass() { 
    /**
     * Delete a class given class id
     * PRE:Class record originally in the database
     * POS:Class record removed from the database
     */
    var id = this.id
    if(id == ''){
      alert('Please select a class to delete')
      return
    }
    if(window.confirm('Delete the selected class?\nThe class will be removed and this action can not be undone.\nConfirm?')){
      this.httpClient.delete(Data.baseUrl+"/classes/"+id)
      .subscribe(
        data=>{
          console.log(data)
          if(data==null){
            this.clear()
            alert('Class Successiful deleted')
          }
        },
        error=>{
          alert('Could not delete the selected class')
        }
      )
    }
  }


}
