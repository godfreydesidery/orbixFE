import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Data } from '../data';

@Component({
  selector: 'app-access-control',
  templateUrl: './access-control.component.html',
  styleUrls: ['./access-control.component.css']
})
export class AccessControlComponent implements OnInit {

  public roleNames: string [] = []
  public roles : object = {}
  public id : any
  public roleName :string

  constructor(private httpClient: HttpClient) {
    this.id   = ''
    this.roleName = ''
   }

  async ngOnInit(): Promise<void> { 
    /**
     * load role names to enable autocomplete
     */
    (this.getRoleNames())
    .then(
      res=>{
        Object.values(res).map((role:string)=>{
          this.roleNames.push(role)
        })
      }
    )
    /**
     * Load all roles to list on page
     */
    this.roles= await this.getRoles()
  }

  public async getRoleNames(){
    /**
     * Return the names of all the roles
     */
    var values: any= new Array()
    var roleNames: any=[]
    await this.httpClient.get(Data.baseUrl+"/roles/role_names")
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
      roleNames.push(data)
    })
    return roleNames
  }

  async getRole (id : any) {
    /**
     * Gets role details with a specified id from datastore
     */
    var role = {}
    await this.httpClient.get(Data.baseUrl+"/roles/"+id)
    .toPromise()
    .then(
      data=>{
        role=data
      },
      error=>{
        
      }
    )
    .catch(
      error=>{
        alert('Error code: '+error['status'])
      }
    )
    return role
  }
  

  public async  getRoles (){
    /**
     * Return a list of all the roles
     */
    var roles = {}
    await this.httpClient.get(Data.baseUrl+"/roles")
    .toPromise()
    .then(
      data=>{
        roles = data
      }
    )
    .catch(
      error=>{}
    )
    return roles
  } 

  getRoleData(){
    /**
     * gets role data from inputs
     */
    var roleData = {
      id             : this.id,
      roleName : this.roleName,
    }
    return roleData;
  }

  clear(){
    /**
     * clear the fields
     */
    this.id   ='';
    this.roleName ='';
    
  }

  showRole(role : any){
    
    /**
     * render information for display, these are displayed 
     * automatically using two way data binding
     */
    this.id    = role['id']
    this.roleName  = role['roleName']
    
  }

  validateData(){
    /**
     * validates user inputs
     * return false if validation fails
     */
    var valid : boolean = true
    var message : string = ''
    if(this.roleName == ''){
      valid = false
      message = message+'\nRole is a required field!'
    }
    if (message != ''){
      alert('Error:'+message)
    }
    return valid
  }

  saveRole() { 
    /**
     * Create a new role, or
     * update an existing role
     */
    if(this.validateData()==true){
      var role = this.getRoleData()
      if( this.id == '' || this.id == null || this.id == 0 ) {
        //save a new role
        this.httpClient.post(Data.baseUrl + "/roles" , role)
        .subscribe(
          data=>{
            window.alert('Role created successifully')
            console.log(data)
            this.id=data['id']
          },
          error=>{
            alert('Error: Could not create role')
          }
        )
      } else {
        //update an existing role
        this.httpClient.put(Data.baseUrl + "/roles/" + this.id , role)
        .subscribe(
          data=>{
            window.alert('Role updated successifully')
            this.id=data['id']
          },
          error=>{
            alert('Error: Could not update role')
          }
        )
      }  
    }
  }


  public async getRoleId (role : string){
    /**
     * Get a role id given code or name
     * on preference basis
     */
    var id = null
    if(role != ''){
      await this.httpClient.get(Data.baseUrl+"/roles/role="+role)
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

  async searchRole() { 
    /**
     * search department by id
     * gets id from getDepartmentId
     */
    var roleId = null
    roleId = await (this.getRoleId(this.roleName))
    if(roleId == null){
      if(this.roleName == ''){
        alert('Please enter a search key!')
      }else{
        alert('The requested record could not be found')
      }
    }else{
      var role : any
      role =await (this.getRole(roleId))
      console.log(role)
      this.showRole(role)
    }
  }
  /**
   * 
   * @param id Search a the selected department
   */
  async search(id : any){
    this.clear()
    var role =await (this.getRole(id))
    this.showRole(role)
  }
  deleteRole() { 
    /**
     * Delete a role given role id
     * PRE:Role record originally in the database
     * POS:Role record removed from the database
     */
    var id = this.id
    if(id == ''){
      alert('Please select a role to delete')
      return
    }
    if(window.confirm('Delete the selected role?\nThe role will be removed and this action can not be undone.\nConfirm?')){
      this.httpClient.delete(Data.baseUrl+"/roles/"+id)
      .subscribe(
        data=>{
          console.log(data)
          if(data==null){
            this.clear()
            alert('Role Successiful deleted')
          }
        },
        error=>{
          alert('Could not delete the selected role')
        }
      )
    }
  }

}
