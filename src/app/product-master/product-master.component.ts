import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';



@Component({
  selector: 'app-product-master',
  templateUrl: './product-master.component.html',
  styleUrls: ['./product-master.component.css']
})
export class ProductMasterComponent implements OnInit {

  constructor() { }

  itemCode = new FormControl('');

  ngOnInit(): void {
  }

  productForm = new FormGroup({
    itemCode: new FormControl(''),
  });

  onSubmit() {
    // TODO: Use EventEmitter with form value
    alert(this.itemCode.value);
  }

}
