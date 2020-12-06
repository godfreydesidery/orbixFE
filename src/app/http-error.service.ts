import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorService {

  constructor() { }
  public static showErro(error : any){
    if(error['status'] == 0){
      alert(error['status']+'  Error: No connection!')
    }else if(error['status'] == 404){
      //alert(error['status']+'  Error: Resource not found!')
    }else if(error['status'] == 500){
      alert(error['status']+'  Error: Operation failed!')
    }else{
      alert(error['status']+'  Error: Operation failed!')
      console.log(error)
    }
    
  }
}
