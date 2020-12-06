import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Data } from '../data';

@Component({
  selector: 'app-till-administration',
  templateUrl: './till-administration.component.html',
  styleUrls: ['./till-administration.component.css']
})
export class TillAdministrationComponent implements OnInit {

  
  public tillNames: string [] = []
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
    this.tills= await this.getTills()
    this.tillNames = await this.getTillNames()
  }

  public async getTillNames(){
    /**
     * Return the names of all the roles
     */
    var values: any= new Array()
    var tillNames: any=[]
    await this.httpClient.get(Data.baseUrl+"/tills/till_names")
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
      tillNames.push(data)
    })
    return tillNames
    
  }

  async getTill (id : any) {
    /**
     * Gets user details with a specified id from datastore
     */
    var user = {}
    await this.httpClient.get(Data.baseUrl+"/tills/"+id)
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

  getTillData(){
    /**
     * gets user data from inputs
     */
    var userData = {
      id           : this.id,
      tillNo       : this.tillNo,
      computerName : this.computerName,
      status       : this.status
    }
    return userData;
  }

  clear(){
    /**
     * clear the fields
     */
    this.id           = ''
    this.tillNo       = ''
    this.computerName = ''
    this.status       = ''
   
  }

  showTill(till : any){
    
    /**
     * render information for display, these are displayed 
     * automatically using two way data binding
     */
    this.id           = till['id']
    this.tillNo       = till['tillNo']
    this.computerName = till['computerName']
    this.status       = till['status']
  }

  validateData(){
    /**
     * validates user inputs
     * return false if validation fails
     */
    var valid : boolean = true
    var message : string = ''
    if(this.tillNo == ''){
      valid = false
      message = message+'\Till no is a required field!'
    }

    if (message != ''){
      alert('Error:'+message)
    }
    return valid
  }

  saveTill() { 
    /**
     * Create a new user, or
     * update an existing user
     */
    if(this.validateData()==true){
      var till = this.getTillData()
      if( this.id == '' || this.id == null || this.id == 0 ) {
        //save a new user
        this.httpClient.post(Data.baseUrl + "/tills" , till)
        .subscribe(
          data=>{
            window.alert('Till created successifully')
            console.log(data)
            this.id=data['id']
          },
          error=>{
            alert('Error: Could not create user')
          }
        )
      } else {
        //update an existing user
        this.httpClient.put(Data.baseUrl + "/tills/" + this.id , till)
        .subscribe(
          data=>{
            window.alert('Till updated successifully')
            this.id=data['id']
          },
          error=>{
            alert('Error: Could not update user')
          }
        )
      }  
    }
  }


  public async getTillId (tillNo : string){
    /**
     * Get a user id given code or name
     * on preference basis
     */
    var id = null
    if(tillNo != ''){
      await this.httpClient.get(Data.baseUrl+"/tills/till_no="+tillNo)
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

  async searchTill() { 
    /**
     * search user by id
     * gets id from getUserId
     */
    var tillId = null
    tillId = await (this.getTillId(this.tillNo))
    if(tillId == null){
      if(this.tillNo == ''){
        alert('Please enter a search key!')
      }else{
        alert('The requested record could not be found')
      }
    }else{
      var till : any
      till =await (this.getTill(tillId))
      this.showTill(till)
    }
  }
  /**
   * 
   * @param id Search a the selected user
   */
  async search(id : any){
    this.clear()
    var user =await (this.getTill(id))
    this.showTill(user)
  }
  deleteTill() { 
    /**
     * Delete a user given user id
     * PRE:User record originally in the database
     * POS:User record removed from the database
     */
    var id = this.id
    if(id == ''){
      alert('Please select a till to delete')
      return
    }
    if(window.confirm('Delete the selected till?\nThe till will be removed and this action can not be undone.\nConfirm?')){
      this.httpClient.delete(Data.baseUrl+"/users/"+id)
      .subscribe(
        data=>{
          console.log(data)
          if(data==null){
            this.clear()
            alert('Till Successiful deleted')
          }
        },
        error=>{
          alert('Could not delete the selected till')
        }
      )
    }
  }

  }


