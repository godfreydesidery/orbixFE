import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Data } from '../data';

@Component({
  selector: 'app-user-enrolment',
  templateUrl: './user-enrolment.component.html',
  styleUrls: ['./user-enrolment.component.css']
})
export class UserEnrolmentComponent implements OnInit {

  public roleNames: string [] = []
  public users : object = {}

  public id              : any
  public username        : string
  public payRollNo       : string
  public firstName       : string
  public secondName      : string
  public lastName        : string
  public roleName            : string
  public password        : string
  public confirmPassword : string


  constructor(private httpClient: HttpClient) {
    this.id              = ''
    this.username        = ''
    this.payRollNo       = ''
    this.firstName       = ''
    this.secondName      = ''
    this.lastName        = ''
    this.roleName            = ''
    this.password        = ''
    this.confirmPassword = ''
   }

  async ngOnInit(): Promise<void> { 
    /**
     * load role names to enable autocomplete
     *
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
    this.users= await this.getUsers()
    this.roleNames = await this.getRoleNames()
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

  async getUser (id : any) {
    /**
     * Gets user details with a specified id from datastore
     */
    var user = {}
    await this.httpClient.get(Data.baseUrl+"/users/"+id)
    .toPromise()
    .then(
      data=>{
        user=data
      },
      error=>{
        
      }
    )
    .catch(
      error=>{
        alert('Error code: '+error['status'])
      }
    )
    return user
  }
  

  public async  getUsers (){
    /**
     * Return a list of all the users
     */
    var users = {}
    await this.httpClient.get(Data.baseUrl+"/users")
    .toPromise()
    .then(
      data=>{
        users = data
      }
    )
    .catch(
      error=>{}
    )
    return users
  } 

  getUserData(){
    /**
     * gets user data from inputs
     */
    var userData = {
      id              : this.id,
      username        : this.username,
      payRollNo       : this.payRollNo,
      firstName       : this.firstName,
      secondName      : this.secondName,
      lastName        : this.lastName,
      role            :{roleName:this.roleName},
      password        : this.password,
      confirmPassword : this.confirmPassword
    }
    return userData;
  }

  clear(){
    /**
     * clear the fields
     */
    this.id              = ''
    this.username        = ''
    this.payRollNo       = ''
    this.firstName       = ''
    this.secondName      = ''
    this.lastName        = ''
    this.roleName        = ''
    this.password        = ''
    this.confirmPassword = ''
    
  }

  showUser(user : any){
    
    /**
     * render information for display, these are displayed 
     * automatically using two way data binding
     */
    this.id              = user['id']
    this.username        = user['username']
    this.payRollNo       = user['payRollNo']
    this.firstName       = user['firstName']
    this.secondName      = user['secondName']
    this.lastName        = user['lastName']
    //this.password        = user['password']
    //this.confirmPassword = user['confirmPassword']
    this.roleName        = user['role'].roleName    
  }

  validateData(){
    /**
     * validates user inputs
     * return false if validation fails
     */
    var valid : boolean = true
    var message : string = ''
    if(this.username == ''){
      valid = false
      message = message+'\nUsername is a required field!'
    }

    if(this.password != this.confirmPassword){
      valid = false
      message = message+'\nThe password and confirm password fields must match!'
    }

    if (message != ''){
      alert('Error:'+message)
    }
    return valid
  }

  saveUser() { 
    /**
     * Create a new user, or
     * update an existing user
     */
    if(this.validateData()==true){
      var user = this.getUserData()
      if( this.id == '' || this.id == null || this.id == 0 ) {
        //save a new user
        this.httpClient.post(Data.baseUrl + "/users" , user)
        .subscribe(
          data=>{
            window.alert('User created successifully')
            console.log(data)
            this.id=data['id']
          },
          error=>{
            alert('Error: Could not create user')
          }
        )
      } else {
        //update an existing user
        this.httpClient.put(Data.baseUrl + "/users/" + this.id , user)
        .subscribe(
          data=>{
            window.alert('User updated successifully')
            this.id=data['id']
          },
          error=>{
            alert('Error: Could not update user')
          }
        )
      }  
    }
  }


  public async getUserId (payRollNo : string){
    /**
     * Get a user id given code or name
     * on preference basis
     */
    var id = null
    if(payRollNo != ''){
      await this.httpClient.get(Data.baseUrl+"/users/pay_roll_no="+payRollNo)
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

  async searchUser() { 
    /**
     * search user by id
     * gets id from getUserId
     */
    var userId = null
    userId = await (this.getUserId(this.payRollNo))
    if(userId == null){
      if(this.payRollNo == ''){
        alert('Please enter a search key!')
      }else{
        alert('The requested record could not be found')
      }
    }else{
      var user : any
      user =await (this.getUser(userId))
      this.showUser(user)
    }
  }
  /**
   * 
   * @param id Search a the selected user
   */
  async search(id : any){
    this.clear()
    var user =await (this.getUser(id))
    this.showUser(user)
  }
  deleteUser() { 
    /**
     * Delete a user given user id
     * PRE:User record originally in the database
     * POS:User record removed from the database
     */
    var id = this.id
    if(id == ''){
      alert('Please select a user to delete')
      return
    }
    if(window.confirm('Delete the selected user?\nThe user will be removed and this action can not be undone.\nConfirm?')){
      this.httpClient.delete(Data.baseUrl+"/users/"+id)
      .subscribe(
        data=>{
          console.log(data)
          if(data==null){
            this.clear()
            alert('User Successiful deleted')
          }
        },
        error=>{
          alert('Could not delete the selected user')
        }
      )
    }
  }


}
