import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Data } from '../data';
import { NgxSpinnerService } from "ngx-spinner";
import { ErrorService } from '../error.service';

@Component({
  selector: 'app-list-lpo',
  templateUrl: './list-lpo.component.html',
  styleUrls: ['./list-lpo.component.css']
})
export class ListLPOComponent implements OnInit {

  public lpos = {}

  constructor(private httpClient : HttpClient, private spinnerService : NgxSpinnerService) { }

  async ngOnInit(): Promise<void> {
    this.lpos = await this.getLpos()
  }
  refresh(){
    window.location.reload()
  }


  public async  getLpos (){
    /**
     * List all lpos
     */
    var lpos = {}
    await this.httpClient.get(Data.baseUrl+"/lpos")
    .toPromise()
    .then(
      data=>{
        lpos = data
      }
    )
    .catch(
      error=>{}
    )
    return lpos
  } 

  public async deleteLpo(id : any){
    /**Delete an lpo */
    this.spinnerService.show()
    await this.httpClient.delete(Data.baseUrl+"/lpos/"+id, {responseType : 'text'})
    .toPromise()
    .then(
      data => {

      }
    )
    .catch(
      (error) => {
        ErrorService.showHttpError(error, '')
      }
    )
    this.spinnerService.hide()
    this.refresh()
  }

  copyToClipboard(value : string){
    const selBox = document.createElement('textarea')
    selBox.style.position = 'fixed'
    selBox.style.left = '0'
    selBox.style.top = '0'
    selBox.style.opacity = '0'
    selBox.value = value
    document.body.appendChild(selBox)
    selBox.focus()
    selBox.select()
    document.execCommand('copy')
    document.body.removeChild(selBox)

  }

}
