import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-mass-manager',
  templateUrl: './mass-manager.component.html',
  styleUrls: ['./mass-manager.component.css']
})
export class MassManagerComponent implements OnInit {

  data : [][]
  progress : boolean = false
  progressValue : number

  constructor() {
   }

  ngOnInit(): void {
  }

  onFileChange(evt : any){
    if(this.progress == true){
      alert('Could not process, a mass operation going on')
      return
    }
    const target : DataTransfer = <DataTransfer> (evt.target)
    if(target.files.length !== 1){
      alert("Cannot use multiple files")
      return
    }
    const reader : FileReader = new FileReader()
    reader.onload = (e : any) => {
      const bstr : string = e.target.result
      const wb : XLSX.WorkBook = XLSX.read(bstr, {type : 'binary'})
      const wsname : string = wb.SheetNames[0]
      const ws : XLSX.WorkSheet = wb.Sheets[wsname]
      this.data = (XLSX.utils.sheet_to_json(ws, {header : 1}))


      this.progress = true
      if(this.validateData(this.data) == true){
        this.uploadData(this.data)
      }
      this.progress = false


    }
    
    
    reader.readAsBinaryString(target.files[0])

  }

  validateData(data : [][]) : boolean{
    var valid = true
    for(let j = 0; j < data[0].length; j++){
      //validate the row header
    }
    for(let i = 1; i < data.length; i++) {
      for(let j = 0; j < data[i].length; j++) {
        //validate content
        //alert((data[i][j]))

      }
    }
    return valid;
  }
  uploadData(data : [][]){
    var object : any
    for(let i = 1; i < data.length; i++) {
      for(let j = 0; j < data[i].length; j++) {
        //assign value to object attributes

      }
      //upload object to server

    }
  }
}
