import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }
  public static showHttpError( error : any, message : string){
    alert(error['status']+' '+error['error']+' '+message)
  }
}
