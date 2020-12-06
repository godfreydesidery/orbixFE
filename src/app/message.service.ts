import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }
  public static showMessage(message : string){
    window.alert(message)
  }
}
