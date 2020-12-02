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
import { UnitService} from '../unit.service'

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})


export class DepartmentComponent implements OnInit {

  public departmentNames: string [] = []
  public departments : object = {}
    
  public id : any
  public departmentCode :string
  public departmentName :string

  constructor(private httpClient: HttpClient) {
    this.id             = ''
    this.departmentCode = ''
    this.departmentName = ''
   }

  async ngOnInit(): Promise<void> { 
    /**
     * load items description to enable autocomplete
     */
    ((new UnitService(this.httpClient)).getDepartmentNames())
    .then(
      res=>{
        Object.values(res).map((departmentName:string)=>{
          this.departmentNames.push(departmentName)
        })
      }
    );
    /**
     * Load all departments to list on page
     */
    this.departments= await this.getDepartments()
  }

  public async  getDepartments (){
    /**
     * Return a list of all the departments
     */
    var departments = {}
    await this.httpClient.get(Data.baseUrl+"/departments")
    .toPromise()
    .then(
      data=>{
        departments = data
      }
    )
    .catch(
      error=>{}
    )
    return departments
  } 

  getDepartmentData(){
    /**
     * gets department data from inputs
     */
    var departmentData = {
      id             : this.id,
      departmentCode : this.departmentCode,
      departmentName : this.departmentName,
    }
    return departmentData;
  }

  clear(){
    /**
     * clear the fields
     */
    this.id             ='';
    this.departmentCode ='';
    this.departmentName ='';
    
  }

  showDepartment(department : any){
    
    /**
     * render information for display, these are displayed 
     * automatically using two way data binding
     */
    this.id              = department['id']
    this.departmentCode  = department['departmentCode']
    this.departmentName  = department['departmentName']
    
  }

  validateData(){
    /**
     * validates user inputs
     * return false if validation fails
     */
    var valid : boolean = true
    if(this.departmentCode == ''){
      valid = false
      window.alert('Error: Department Code required!')
      return valid
    } 
    if(this.departmentName == ''){
      valid = false
      window.alert('Error: Department Name required!')
      return valid
    } 
    return valid
  }

  saveDepartment() { 
    /**
     * Create a new department, or
     * update an existing department
     */
    if(this.validateData()==true){
      var department = this.getDepartmentData()
      if( this.id == '' || this.id == null || this.id == 0 ) {
        //save a new department
        this.httpClient.post(Data.baseUrl + "/departments" , department)
        .subscribe(
          data=>{
            window.alert('Department created successifully')
            console.log(data)
            this.id=data['id']
          },
          error=>{
            alert('Error: Could not create department')
          }
        )
      } else {
        //update an existing item
        this.httpClient.put(Data.baseUrl + "/departments/" + this.id , department)
        .subscribe(
          data=>{
            window.alert('Department updated successifully')
            this.id=data['id']
          },
          error=>{
            alert('Error: Could not update department')
          }
        )
      }  
    }
  }
  async searchDepartment() { 
    /**
     * search department by id
     * gets id from getDepartmentId
     */
    var departmentId = null
    departmentId = await (new UnitService(this.httpClient)).getDepartmentId(this.departmentCode,this.departmentName)
    if(departmentId == null){
      if(this.departmentCode == '' && this.departmentName == ''){
        alert('Please enter a search key!')
      }else{
        alert('The requested record could not be found')
      }
    }else{
      var department : any
      department =await (new UnitService(this.httpClient)).getDepartment(departmentId)
      console.log(department)
      this.showDepartment(department)
    }
  }
  /**
   * 
   * @param id Search a the selected department
   */
  async search(id : any){
    this.clear()
    var department =await (new UnitService(this.httpClient)).getDepartment(id)
    this.showDepartment(department)
  }
  deleteDepartment() { 
    /**
     * Delete a department given department id
     * PRE:Department record originally in the database
     * POS:Department record removed from the database
     */
    var id = this.id
    if(id == ''){
      alert('Please select a department to delete')
      return
    }
    if(window.confirm('Delete the selected department?\nThe department will be removed and this action can not be undone.\nConfirm?')){
      this.httpClient.delete(Data.baseUrl+"/departments/"+id)
      .subscribe(
        data=>{
          console.log(data)
          if(data==null){
            this.clear()
            alert('Department Successiful deleted')
          }
        },
        error=>{
          alert('Could not delete the selected department')
        }
      )
    }
  }
}