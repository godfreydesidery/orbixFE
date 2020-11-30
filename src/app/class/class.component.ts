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

  public classes: string [] = []

  id
  classCode
  className

  constructor(private httpClient : HttpClient) {
    this.id = ''
    this.classCode = ''
    this.className = ''
   }

   ngOnInit(): void { 
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

   }
  

  getClassData(){
    /**
     * gets department data from inputs
     */
    var classData = {
      id        : this.id,
      classCode : this.classCode,
      className : this.className,
    }
    return classData;
  }

  clear(){
    /**
     * clear the fields
     */
    this.id        = '';
    this.classCode = '';
    this.className = '';
    
  }

  showClass(_class){
    
    /**
     * render information for display, these are displayed 
     * automatically using two way data binding
     */
    this.id         = _class['id']
    this.classCode  = _class['classCode']
    this.className  = _class['className']
    
  }

  validateData(){
    /**
     * validates user inputs
     * return false if validation fails
     */
    var valid : boolean = true
    if(this.classCode == ''){
      valid = false
      window.alert('Barcode required')
      return valid
    } 
    return valid
  }

  saveClass() { 
    /**
     * create or update an 
     * first, check validation
     */
    if(this.validateData()==true){
      var _class = this.getClassData()
      if( this.id == '' || this.id == null || this.id == 0 ) {
        //save a new department
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
     * search department by id
     * gets id from getDepartmentId
     */
    var classId=''
    this.clear
    classId = await (new UnitService(this.httpClient)).getClassId(this.classCode,this.className)
    if(classId == ''||classId == null){
      alert('No matching record')
    }else{
      var _class
      _class =await (new UnitService(this.httpClient)).getClass(classId)
      console.log(_class)
      this.showClass(_class)
    }
  }
  deleteClass() { 
    /**
     * delete an department given its id
     */
    var id = this.id
    this.httpClient.delete(Data.baseUrl+"/classes/"+id)
    .subscribe(
      data=>{
        console.log(data)
        if(data==null){
          this.clear()
          alert('Class successifully deleted')
        }
      },
      error=>{
        console.log(error)
      }
    )
  }


}
