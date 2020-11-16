import { Injectable } from '@angular/core';
//import { Headers, Http } from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http'
import {HttpClient} from '@angular/common/http'
 
import 'rxjs/add/operator/toPromise';
 
import { ProductMasterComponent } from './product-master/product-master.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
}
