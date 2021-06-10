import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Data } from '../data';
import { ErrorService } from '../error.service';
import { ItemService } from '../item.service';
import { MessageService } from '../message.service';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-return-to-vendor',
  templateUrl: './return-to-vendor.component.html',
  styleUrls: ['./return-to-vendor.component.css']
})
export class ReturnToVendorComponent implements OnInit {
  id : any
  rtvNo : string = 'NA'

  descriptions  : any = []

  supplierNames : string[] = []

  _new : boolean      = false

  returned : boolean = false


  supplierId : any = null
  supplierCode : string
  supplierName : string = null

  public rtvs = {}
	//public rtvDetails = {}


  rtvDetails : RtvDetail [] = []

  rtv : Rtv = new Rtv()

  rtvDate : Date
  

  totalAmount        : number = 0


  detailId    : number = 0
  barcode     : string
  itemCode    : string
  description : string
  costPrice       : number
  qty         : number
  reason : string
  

  constructor(private httpClient: HttpClient ) {    
    this.detailId = 0
  }

  async ngOnInit(): Promise<void> {

     
    
    /**Load all item descriptions */
		((new ItemService(this.httpClient)).getItemsLongDescriptions())
		.then(
		res=>{
			Object.values(res).map((longDescription:string)=>{
			this.descriptions.push(longDescription)
			})
		}
		);
    /**Load all supplier names */
		((new SupplierService(this.httpClient)).getSuppliersNames())
		.then(
      res=>{
        Object.values(res).map((supplierName:string)=>{
        this.supplierNames.push(supplierName)
        })
      }
		);


  }

  

  //refreshAmount(detail : InvoiceDetail[]){
    //this.totalAmount = 0
    //for(var i = 0; i <detail.length; i++){
      //this.totalAmount = this.totalAmount + (detail[i].qty*detail[i].price)
   // }
  //}

  

  createRtv(){
    this.rtvDetails = []
    this.clearDetail()
    
    this.unlockInvoice()
    this.unlockSupplier()
    //this.unlockCustomer()
    //this.invoiceNo = 'NA'
    //this.invoiceDetails = []
    this._new = true
    //this.refreshAmount(this.invoiceDetails)

    this.returned = false
    

  }

  public addDetail(){
    if(this.returned == true){
      alert('Invalid operation, already returned')
      return
    }
    if(isNaN(this.qty)){
      alert('Invalid quantity amount, only numeric whole value is allowed')
      return
    }
    if(this.qty <= 0 || this.qty%1 > 0 ){
      alert("Invalid amount, negative or decimal amounts not allowed")
      return
    }

    if(this.validateDetail() == false){
      alert("Could not add item, invalid entries")
      return
    }
    //this.lockCustomer()

    //this.refreshAmount(this.invoiceDetails)
    

    var _rtvDetail : RtvDetail = new RtvDetail()
    this.detailId = this.detailId + 1
    _rtvDetail.detailId      = this.detailId
    _rtvDetail.barcode       = this.barcode
    _rtvDetail.itemCode      = this.itemCode
    _rtvDetail.description   = this.description
    _rtvDetail.qty           = this.qty
    _rtvDetail.costPrice     = this.costPrice    
    _rtvDetail.reason           = this.reason
    
    if(this.checkDuplicate(this.itemCode,this.rtvDetails) == false){
      this.rtvDetails.push(_rtvDetail)
      this.clearDetail()
      this.lockSupplier()
      
    }else{
      this.detailId = this.detailId - 1
    }
    //alert(this.detailId)
    //this.refreshAmount(this.invoiceDetails)
    

  }
  public checkDuplicate(itemCode : string, detail : RtvDetail[]) : boolean{
    var duplicate : boolean = false
    for(var i = 0; i <detail.length; i++){
      if(detail[i].itemCode==itemCode){
        duplicate = true
        alert('Could not add item, item exists in list, consider updating item quantity')
      }
      if(duplicate == true){
        //end for, implement later to save time
      }
    }
    return duplicate
  }
  public removeDetail(detailId : any){

  }

  public clearDetail(){
    this.barcode     = '';
    this.itemCode    = '';
    this.description = '';
    this.costPrice       = null;
    this.qty         = null;
    this.reason      = ''
    this.unlockDetail()
  }
  public validateDetail() : boolean{
    var valid = true
    if(this.itemCode == ''){
      valid = false
    }
    return valid
  }
  
  clearRtv(){
    this.rtvDetails = []
  }
 

  async searchItemByBarcode(barcode : string){
    if(this.supplierName == null || this.supplierName == ''){
      alert("Missing Vendor information, please select Vendor")
      return
    }
		/**Search and display an item */
		var itemId = await (new ItemService(this.httpClient).getItemId(barcode , "", ""))
		if(itemId != '' && itemId !=null){
			var item = await (new ItemService(this.httpClient).getItem(itemId))
      this.lockDetail()
			this.setItem(item)
		}else{
			/** */
		}
	}
	async searchItemByItemCode(itemCode : string){
    if(this.supplierName == null || this.supplierName == ''){
      alert("Missing Vendor information, please select Vendor")
      return
    }
		/**Search and display an item */
		var itemId = await (new ItemService(this.httpClient).getItemId("" , itemCode, ""))
		if(itemId != '' && itemId !=null){
			var item = await (new ItemService(this.httpClient).getItem(itemId))
      this.lockDetail()
			this.setItem(item)
		}else{
			/** */
		}
	}
	async searchItemByDescription(description : string){
    if(this.supplierName == null || this.supplierName == ''){
      alert("Missing Vendor information, please select Vendor")
      return
    }
		/**Search and display an item */
		var itemId = await (new ItemService(this.httpClient).getItemId("" , "", description))
		if(itemId != '' && itemId !=null){
			var item = await (new ItemService(this.httpClient).getItem(itemId))
      this.lockDetail()
      this.setItem(item)
		}else{
			/** */
		}
	}
  setItem(item : any){
    this.itemCode    = item['itemCode']
    this.description = item['longDescription']
    this.costPrice       = item['unitCostPrice']
    
  }
  async confirmReturn(){
    if(this.returned == true){
      alert('Invalid operation, list already returned')
      return
    }
    if(window.confirm('Return goods. Confirm?') == false){
      return
    }
    this.rtv.id                    = this.id
    this.rtv.rtvNo                 = this.rtvNo
    this.rtv.rtvDate               = this.rtvDate
    this.rtv.rtvDetails            = this.rtvDetails
    var supplier = new Supplier()
    supplier.supplierName = this.supplierName
    this.rtv.supplier = supplier 
    
    await this.httpClient.post(Data.baseUrl + "/rtvs" , this.rtv)
			.toPromise()
			.then(
				data => {

          //this.invoiceNo = data['invoiceNo']
          //alert('Customer invoice '+data['invoiceNo']+ ' successifully saved.')
          this.returned = true
          this.rtvNo = data['rtvNo']
          alert("Returned successively")
				}
			)
			.catch(
				error => {
					alert(error['error']);
				}
			)

  }

  async approveRtv(rtvNo : string){
       /**Approve a pending RTV */
       if(rtvNo == ''){
         MessageService.showMessage('Error: No RTV selected!\nPlease select an RTV to approve')
       }else{
         if(window.confirm('Confirm approval?\nThe RTV will be approved.\nConfirm?')){
          /**Approve the selected rtv */
           await this.httpClient.put(Data.baseUrl + "/rtvs/approve/"+this.id, null,{responseType:'text'})
           .toPromise()
           .then(
             data => {
               MessageService.showMessage(data)
             },
             error => {
               MessageService.showMessage(error['error'])
             }
           )
         }
       }
     }
     async confirmRtv(rtvNo : string){
       /**Approve a pending RTV */
       if(rtvNo == ''){
         MessageService.showMessage('Error: No RTV selected!\nPlease select an RTV to approve')
       }else{
         if(window.confirm('Confirm return?\nGoods will be returned to vendor.\nConfirm?')){
           /**Approve the selected rtv */
           await this.httpClient.put(Data.baseUrl + "/rtvs/complete/"+this.id, null,{responseType:'text'})
           .toPromise()
           .then(
             data => {
               MessageService.showMessage(data)
             },
             error => {
               MessageService.showMessage(error['error'])
             }
           )
         }
       }
     }
     async printRtv(rtvNo : string){
       /**Print an approved RTV or reprint a printed RTV */
       if(rtvNo == ''){
         MessageService.showMessage('Error: No RTV selected!\nPlease select an RTV to print')
       }else{
         if(window.confirm('Confirm printing?\nThe RTV will be printed.\nConfirm?')){
           /**Print the selected rtv */
           await this.httpClient.put(Data.baseUrl+"/rtvs/print/"+this.id, null, {responseType:'text'})
           .toPromise()
           .then(
             data => {
               MessageService.showMessage(data)
               
             },
             error => {
               MessageService.showMessage(error['error'])
             }
           )
         }
       }
     }
     async cancelRtv(rtvNo : string){
       var canceled :boolean = false
       if(rtvNo == ''){
         MessageService.showMessage('Error: No RTV selected!\nPlease select an RTV to cancel')
       }else{
         if(window.confirm('Confirm Canceling?\nThe RTV will be canceled.\nConfirm?')){
           /**Cancel the selected rtv */
           await this.httpClient.put(Data.baseUrl+"/rtvs/cancel/"+this.id, null, {responseType:'text'})
           .toPromise()
           .then(
             data => {
               MessageService.showMessage(data)
               
             },
             error => {
              MessageService.showMessage(error['error'])
             }
           )
         }
       }
       return canceled
     }

     async searchRtv(rtvNo : string){
          /**Searches specified rtv, displays rtv and return true if found,
           * else return false
           */
          if(rtvNo == ''){
            MessageService.showMessage('Please enter RTV No!')
            return
          }
          var found : boolean = false
          this.lockRtv()
          this.lockSupplier()
          //this.spinnerService.show()
          await this.httpClient.get(Data.baseUrl+"/rtvs/rtv_no="+rtvNo)
            .toPromise()
            .then(
              data => {
                //this.showRtv(data)
              }
            )
            .catch(
              error => {
                ErrorService.showHttpError(error, 'The requested RTV could not be found')
                return
              }
            )
            //this.spinnerService.hide()
          return found
        }

        searchBySupplierName(){
          this.supplierCode = ''
          this.searchSupplier()
        }
        async searchSupplier(){
          /**Search a supplier */
          var found : boolean = false
          var supplierId = await (new SupplierService(this.httpClient)).getSupplierId(this.supplierCode, this.supplierName)
          var supplier = await (new SupplierService(this.httpClient)).getSupplier(supplierId)
          this.supplierCode = supplier['supplierCode']
          this.supplierName = supplier['supplierName']
          if(supplier != '' && supplierId != null){
            found = true
          }
          return found
        }


  /**Lock variables */
	lockedSaleReturn : boolean     = true
  lockedInvoice : boolean     = true

  lockedBarcode : boolean     = false
  lockedItemCode : boolean    = false
  lockedDescription : boolean = false
	
	private lockInvoice(){
		this.lockedInvoice = true
	}
	
	private unlockInvoice(){
		this.lockedInvoice = false
	}
  private lockSaleReturn(){
		this.lockedSaleReturn = true
	}
	
	private unlockSaleReturn(){
		this.lockedSaleReturn = false
	}

  private lockDetail(){
    this.lockedBarcode     = true
    this.lockedItemCode     = true
    this.lockedDescription = true
  }
  private unlockDetail(){
    this.lockedBarcode     = false
    this.lockedItemCode     = false
    this.lockedDescription = false
  }



  /**Lock variables */
    lockedSupplier : boolean = true
    lockedRtv      : boolean = true
    lockedItem     : boolean = false
    lockedAdd      : boolean = true
    private lockSupplier(){
      this.lockedSupplier = true
    }
    private lockRtv(){
      this.lockedRtv = true
    }
    private lockItem(){
      this.lockedItem = true
    }
    private lockAdd(){
      this.lockedAdd = true
    }
    private unlockSupplier(){
      this.lockedSupplier = false
    }
    private unlockLpo(){
      this.lockedRtv = false
    }
    private unlockItem(){
      this.lockedItem = false
    }
    private unlockAdd(){
      this.lockedAdd = false
    }
}




export class Rtv{
  id            : any
  rtvNo         : string
  supplier      : Supplier
  rtvDate       : any
  rtvDetails    : RtvDetail[]
}
export class RtvDetail{
  detailId    : any
  barcode     : string
  itemCode    : string
  description : string
  qty         : number
  costPrice   : number
  reason      : string
}
export class Supplier{
  supplierName : string
}






















  

 // /**LPO field variakbles */
//	id             : any
	//rtvNo          : string
//	supplierCode   : string
//	supplierName   : string
//	createdBy      : string
//	approvedBy     : string
	//rtvDate        : Date
	//status         : string
	
//	/**Lpo detail field variables */
//	rtvDetailId : any
//	barcode     : any
	//itemCode    : string
//	description : string
//	qty         : number
//	price       : number
//	reason      : string

//	/**Collections */
//	descriptions  : string[] = []
	//supplierNames : string[] = []

	//public rtvs = {}
//	//public rtvDetails = {}

  

  //public rtvDetails : RtvDetail [] = []

  //rtv : Rtv = new Rtv()
  

  //totalAmount        : number = 0


  //constructor(private httpClient : HttpClient, private spinnerService : NgxSpinnerService) { }

  //async ngOnInit(): Promise<void> {
	//	/**Load rtvs */
	//	this.rtvs = await this.getRtvs();
	//	/**Load all supplier names */
	//	((new SupplierService(this.httpClient)).getSuppliersNames())
	//	.then(
	//	res=>{
	//		Object.values(res).map((supplierName:string)=>{
	//		this.supplierNames.push(supplierName)
	//		})
	//	}
	//	);
	//	/**Load all item descriptions */
	//	((new ItemService(this.httpClient)).getItemsLongDescriptions())
	//	.then(
	//	res=>{
	//		Object.values(res).map((longDescription:string)=>{
	//		this.descriptions.push(longDescription)
	//		})
	//	}
//		);
//	}

//  public async  getRtvs (){
//		/**
//		 * List all lpos
//		 */
//		var _rtvs = {}
//		await this.httpClient.get(Data.baseUrl+"/rtvs")
//		.toPromise()
//		.then(
//		  data=>{
//			_rtvs = data
//		  }
//		)
//		.catch(
//		  error=>{}
//		)
//		return _rtvs
 //   }
 //   
 //   generateRtvNo(){
 //     /**Generate a unique LPO No */
  
  //    var anysize = 5;//the size of string 
  //    var charset1 = "123456789"; //from where to create
  //    var charset2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  
  //    var result1="";
  //    var result2=""
  //    for( var i=0; i < anysize; i++ )
 //       result1 += charset1[Math.floor(Math.random() * charset1.length)];
  //    for( var i=0; i < 1; i++ )
  //      result2 += charset2[Math.floor(Math.random() * charset2.length)];
  //    return "RTV-"+result1+result2
  //  }
 //   createRtv(){
 //     /**Create a new rtv with the specified details
  //     * Return back the newly created rtv details and
  //     * assign them to the rtv variables
 //     */
 //     return {
   //     rtvNo          : this.rtvNo,
    //    supplier       :{
    //            supplierCode   : this.supplierCode,
    //            supplierName   : this.supplierName,
   //             },
   //     createdBy      : this.createdBy,
    //    approvedBy     : '',
   //     rtvDate        : this.rtvDate
   //   }
   // }



    
  //  newRtv(){
   //   /**Create a new Rtv */
   //   var created : boolean =false
  //    this.clear()
  //    this.lockRtv()
  //    this.unlockSupplier()
  //    this.unlockItem()
   //   this.lockAdd()
   //   this.rtvNo = this.generateRtvNo()
  //    return created
  //  }
  //  editRtv(){
  //    /**Prompts user to edit an existing rtv */
  //    this.clear()
  //    this.lockSupplier()
  //    this.unlockLpo()
  //    this.lockAdd()
 //  }
  //  clear(){
  //    this.id             = ''
  //    this.barcode        = ''
  //    this.rtvNo          = ''
   //   this.supplierCode   = ''
  //    this.supplierName   = ''
  //    this.createdBy      = ''
  //    this.approvedBy     = ''
  //    this.rtvDate        = null
  //    this.status         = ''
 //     /**Lpo details */
  //    this.rtvDetailId  = ''
 //     this.itemCode     = ''
  //    this.description  = ''
  //    this.qty          = null
  //    this.price        = null
  //    this.reason       = ''
  
  
  
 //     this.rtvDetails   = null
  //  }
  //  clearItem(){
  //    /**Clear item data */
  //    this.rtvDetailId      = ''
  //    this.itemCode         = ''
 //     this.description      = ''
///      this.qty              = null
 //     this.price            = null
//      this.reason           =''
//      this.unlockItem()
//      this.lockAdd()
 //   }
    
 //   async searchRtv(rtvNo : string){
  //    /**Searches specified rtv, displays rtv and return true if found,
 //      * else return false
  //     */
  //    if(rtvNo == ''){
  //      MessageService.showMessage('Please enter RTV No!')
  //      return
  //    }
  //    var found : boolean = false
  //    this.lockRtv()
  //    this.lockSupplier()
   //   this.spinnerService.show()
  //    await this.httpClient.get(Data.baseUrl+"/rtvs/rtv_no="+rtvNo)
  //      .toPromise()
  ////      .then(
  //        data => {
  //          this.showRtv(data)
  //        }
  //      )
  //      .catch(
   //       error => {
   //         ErrorService.showHttpError(error, 'The requested RTV could not be found')
  //          return
   //       }
   //     )
   //     this.spinnerService.hide()
  //    return found
  //  }
  //  async searchRtvDetail(id : any){
 //     /**Search rtv detail by id,
 //      * display detail in input fields for further processing */
 //     this.spinnerService.show()
 //     await this.httpClient.get(Data.baseUrl+"/rtv_details/"+id)
 //     .toPromise()
 //     .then(
 //       data => {
 //         this.showRtvDetail(data)
  //      }
  //    )
 //     .catch(
  //      () => {
 //         return
  //      }
 //     )
 //     this.spinnerService.hide()
  //  }
  //  saveRtv(){
  //    /**Save a new or update an existing RTV */
   //   var saved : boolean = false
  
  //    return saved
  //  }
  //  showRtv(rtv : any){
  //    /**Renders rtv information for display */
  //    this.id             = rtv['id']
  //    this.rtvNo          = rtv['rtvNo']
  //    this.createdBy      = rtv['createdBy']
  //    this.approvedBy     = rtv['approvedBy']
  //    this.rtvDate        = rtv['rtvDate']
   //   this.status         = rtv['status']
  //    if(rtv['supplier'] != null){
  //      this.supplierCode   = rtv['supplier'].supplierCode
  ///      this.supplierName   = rtv['supplier'].supplierName
 //     }else{
  //      this.supplierCode = ''
  //      this.supplierName = ''
  //    }
  //    if(rtv['rtvDetail'] != null){
  //      this.rtvDetails = rtv['rtvDetail']
   //   }else{
     //   this.rtvDetails = []
  //    }
   //   this.refreshDetails(this.id)
  //  }
  //  getRtvData(){
   //   /**Return an LPO object for further processing */
   //   return  {
  //      id             : this.id,
  //      rtvNo          : this.rtvNo,
  //      supplierCode   : this.supplierCode,
  //      supplierName   : this.supplierName,
  //      createdBy      : this.createdBy,
  //      approvedBy     : this.approvedBy,
  //      rtvDate        : this.rtvDate,
  //     status         : this.status
   //   }
 //   }
  //  async approveRtv(rtvNo : string){
   //   /**Approve a pending RTV */
  //    if(rtvNo == ''){
  //      MessageService.showMessage('Error: No RTV selected!\nPlease select an RTV to approve')
  //    }else{
   //     if(window.confirm('Confirm approval?\nThe RTV will be approved.\nConfirm?')){
   //       /**Approve the selected rtv */
   //       await this.httpClient.put(Data.baseUrl + "/rtvs/approve/"+this.id, null,{responseType:'text'})
   //       .toPromise()
   //       .then(
  //          data => {
   //           MessageService.showMessage(data)
  //          },
  //          error => {
  //            MessageService.showMessage(error['error'])
   //         }
   //       )
   //     }
  //    }
  //  }
   // async confirmRtv(rtvNo : string){
   //   /**Approve a pending RTV */
  //    if(rtvNo == ''){
   //     MessageService.showMessage('Error: No RTV selected!\nPlease select an RTV to approve')
  //    }else{
   //     if(window.confirm('Confirm return?\nGoods will be returned to vendor.\nConfirm?')){
  //        /**Approve the selected rtv */
   //       await this.httpClient.put(Data.baseUrl + "/rtvs/complete/"+this.id, null,{responseType:'text'})
   //       .toPromise()
   //       .then(
  //          data => {
  //            MessageService.showMessage(data)
  //          },
  //          error => {
  //            MessageService.showMessage(error['error'])
  //          }
  //        )
  //      }
   //   }
   // }
   // async printRtv(rtvNo : string){
   //   /**Print an approved RTV or reprint a printed RTV */
  //    if(rtvNo == ''){
  //      MessageService.showMessage('Error: No RTV selected!\nPlease select an RTV to print')
  //    }else{
  //      if(window.confirm('Confirm printing?\nThe RTV will be printed.\nConfirm?')){
  //        /**Print the selected rtv */
  //        await this.httpClient.put(Data.baseUrl+"/rtvs/print/"+this.id, null, {responseType:'text'})
  //        .toPromise()
  //        .then(
  //          data => {
   //           MessageService.showMessage(data)
              
 //           },
 //           error => {
  //            MessageService.showMessage(error['error'])
//            }
  //        )
  //      }
  //    }
  //  }
 //   async cancelRtv(rtvNo : string){
 //     var canceled :boolean = false
  //    if(rtvNo == ''){
 //       MessageService.showMessage('Error: No RTV selected!\nPlease select an RTV to cancel')
 //     }else{
 //       if(window.confirm('Confirm Canceling?\nThe RTV will be canceled.\nConfirm?')){
 //         /**Cancel the selected rtv */
 //         await this.httpClient.put(Data.baseUrl+"/rtvs/cancel/"+this.id, null, {responseType:'text'})
  //        .toPromise()
  //        .then(
   //         data => {
  //            MessageService.showMessage(data)
              
  //          },
   //         error => {
  //           MessageService.showMessage(error['error'])
   //         }
  //        )
  //      }
  //    }
  //    return canceled
  //  }
  
    
 //   saveRtvDetail(){
 //     if(this.rtvNo == ''){
 //       MessageService.showMessage('RTV number required.\nSelect new for a new RTV')
 //       return
  //    }
  //    if(this.supplierCode == ''){
  //      MessageService.showMessage('Please select a supplier')
  //      return
  //    }
  //    if(this.itemCode == ''){
  //      MessageService.showMessage('Please select an item')
  //      return
  //    }
  //    if(this.qty <= 0 || isNaN(this.qty)){
 //       MessageService.showMessage('Error: Invalid quantity!\nQuantity must be numeric and more than zero')
 //       return
  //    }
  //    if(this.reason==''){
  //      MessageService.showMessage('Please enter reason for return')
  //      return
  //    }
  //    if(this.rtvDetailId == ''){
  //      this.addRtvDetail()
  //    }else{
  //      this.updateRtvDetail()
  //    }
 //   }
  
  //  async addRtvDetail(){
  //    var added : boolean = false
  //    this.lockRtv()
  //    this.lockSupplier()
  //    if(this.rtvDate == null){
  //      alert('Please enter RTV date')
  //      return
 //     }
 //     this.spinnerService.show()
  //    if(this.id == ''){
  //      /**post rtv and return newly created rtv details and
  //       * assign it to the field variables
  //       */
        
  //      await this.httpClient.post(Data.baseUrl + "/rtvs" , this.createRtv())
  //      .toPromise()
  //      .then(
  //        data => {
  //          this.id=data['id']
  //        }
  //      )
  //      .catch(
  //        error => {
  //          alert(error['error']);
  //        }
 //       )
 //       if(this.id == ''){
 //         return
  //      }
  //      await this.httpClient.get(Data.baseUrl+"/rtvs/"+this.id)
  //      .toPromise()
  //      .then(
  //        data => {
   //         this.showRtv(data)
  //        }
  //      )
  //      .catch(
  //        () => {
  //          return
  //        }
  //      )
  //      if(this.id == ''){
  //        return
  //      }
  //    }
  //    /**Add a new RTV detail */
  //    if(this.validateSupplier() == true){
  //      /**Add item */
  //      this.httpClient.post(Data.baseUrl + "/rtv_details" , this.getRtvDetailData())
  //      .toPromise()
  //      .then(
  //        () => {
  //          added = true
  //          this.clearItem()
  //          this.unlockItem()
  //          this.refreshDetails(this.id)
  //       }
  //      )
 //       .catch(
  //        error => {
 //           added = false
 //           ErrorService.showHttpError(error, '')
  //        }
  //      )
  //    }else{
  //      MessageService.showMessage('Error: Could not add item\nItem may not be available for this supplier')
  //    }
  //    this.spinnerService.hide()
 //     return added
  //  }
  //  updateRtvDetail(){
  //    /**Update an existing RTV detail */
  //    var updated : boolean =false
  //    this.spinnerService.show()
 //     this.httpClient.put(Data.baseUrl + "/rtv_details/"+this.rtvDetailId , this.getRtvDetailData(),{responseType : 'text'})
 //     .toPromise()
 //     .then(
 //       () => {
  //        updated = true
  //        this.clearItem()
  //        this.unlockItem()
  //        this.refreshDetails(this.id)
  //        //MessageService.showMessage('Item updated successifully')
  //      }
  //    )
   //   .catch(
  //      error => {
 //         updated = false
 //         ErrorService.showHttpError(error, '')
  //      }
  //    )
  //    this.spinnerService.hide()
  //    return updated
 //   }
    
  //  deleteRtvDetail(id : any){
   //   /**Delete an RTV detail */
   //   var deleted : boolean = false
   //   if(id == ''){
   //     MessageService.showMessage('Error: No item selected!\nPlease select an item to delete')
  //    }else{
   //     /**Delete the selected item */
   //     this.spinnerService.show()
  //      this.httpClient.delete(Data.baseUrl+"/rtv_details/"+id, {responseType : 'text'})
  //      .toPromise()
  //      .then(
  //        () => {
  //          this.clearItem()
  //          this.refreshDetails(this.id)
  //        }
  //      )
  //      .catch(
  //        (error) => {
 //          console.log(error)
  //          alert(error['error'])
  //          //MessageService.showMessage('Could not delete')
  //        }
   //     )
 //       this.spinnerService.hide()
//        deleted = true
 //     }
  //    return deleted
  //  }
  //  showRtvDetail(rtvDetail : any){
 //     /**Renders rtv detail information for display */
 //     this.lockItem()
  //    this.rtvDetailId = rtvDetail['id']
  //    this.itemCode    = rtvDetail['itemCode']
  //    this.description = rtvDetail['description']
  //    this.qty         = rtvDetail['qty']
  //    this.price       = rtvDetail['price']
  //    this.reason      = rtvDetail['reason']
  //    if(this.rtvDetailId != ''){
  //      this.unlockAdd()
  //    }else{
  //      this.lockAdd()
  //    }
  //  }
 //   getRtvDetailData(){
 //     /**Gets the rtv details from inputs for further processing */
 //     return {
  //      id          : this.rtvDetailId,
  //      itemCode    : this.itemCode,
  //      description : this.description,
  //      qty         : this.qty,
  ///      price       : this.price,
   //     reason      : this.reason,
  //      rtv 		    : {
  //                     id    : this.id,
  //                     rtvNo : this.rtvNo
  //                    }
  //    }
 //  }
  //  validateSupplier(){
  //    /**Validate the supplier of a particular item,
 //     * checks if the item is supplied by that particular supplier and
   //    * returns true if supplier is active and supplies that particular item
  //     */
   //   var valid : boolean = true  //change to false!
  
   //   return valid
 //   }
//    clearSupplier(){
//      this.supplierCode = ''
//      this.supplierName = ''
 //   }
 //   searchBySupplierName(){
 //     this.supplierCode = ''
 //     this.searchSupplier()
 //   }
 //   async searchSupplier(){
  //    /**Search a supplier */
 //     var found : boolean = false
  //    var supplierId = await (new SupplierService(this.httpClient)).getSupplierId(this.supplierCode, this.supplierName)
  //    var supplier = await (new SupplierService(this.httpClient)).getSupplier(supplierId)
 //     this.supplierCode = supplier['supplierCode']
 //     this.supplierName = supplier['supplierName']
 //     if(supplier != '' && supplierId != null){
 //       found = true
 //     }
 //     return found
 //   }
 //   async searchItem(barcode : string, itemCode : string, description : string){
 //     /**Search and display an item */
  //    var itemId = await (new ItemService(this.httpClient).getItemId(barcode , itemCode, description))
  //    if(itemId != '' && itemId !=null){
  //      var item = await (new ItemService(this.httpClient).getItem(itemId))
  //      this.itemCode = item['itemCode']
 //       this.description = item['longDescription']
 //       this.price = item['unitCostPrice']
 //       this.lockItem()
 //       this.unlockAdd()
 //       this.lockSupplier()
  //    }else{
  //      /** */
  //    }
 //   }
 //   async searchItemByBarcode(barcode : string){
  //    /**Search and display an item */
  //    var itemId = await (new ItemService(this.httpClient).getItemId(barcode , "", ""))
  //    if(itemId != '' && itemId !=null){
  //      var item = await (new ItemService(this.httpClient).getItem(itemId))
  //      this.itemCode = item['itemCode']
  //      this.description = item['longDescription']
   //     this.price = item['unitCostPrice']
        
  //      this.lockItem()
  //      this.unlockAdd()
  //      this.lockSupplier()
 //     }else{
 //       /** */
  //    }
  //  }
  //  async searchItemByItemCode(itemCode : string){
  //    /**Search and display an item */
  //    var itemId = await (new ItemService(this.httpClient).getItemId("" , itemCode, ""))
  //    if(itemId != '' && itemId !=null){
 //       var item = await (new ItemService(this.httpClient).getItem(itemId))
 //       this.itemCode = item['itemCode']
  //      this.description = item['longDescription']
  //      this.price = item['unitCostPrice']
        
  //      this.lockItem()
  //      this.unlockAdd()
  //      this.lockSupplier()
  //    }else{
  //      /** */
  //    }
  //  }
  //  async searchItemByDescription(description : string){
  //    /**Search and display an item */
  //    var itemId = await (new ItemService(this.httpClient).getItemId("" , "", description))
   //   if(itemId != '' && itemId !=null){
   //     var item = await (new ItemService(this.httpClient).getItem(itemId))
   //     this.itemCode = item['itemCode']
   //     this.description = item['longDescription']
   //     this.price = item['unitCostPrice']
        
   //     this.lockItem()
   //     this.unlockAdd()
   //     this.lockSupplier()
   //   }else{
  //      /** */
  //    }
 //   }
  //  async refreshDetails(id : string){
   //   await this.httpClient.get(Data.baseUrl+"/rtvs/"+id)
  //    .toPromise()
  //    .then(
   //     data => {
   //       this.rtvDetails = data['rtvDetail']
   //     }
  //    )
  //  }
  //  refresh(){
  //    window.location.reload()
  //  }
  //  pasteFromClipboard(){
  //    if(this.lockedRtv == false){
  //      this.rtvNo = window.getSelection().toString()
  //    }
  //  }
  //  /**Lock variables */
  //  lockedSupplier : boolean = true
  //  lockedRtv      : boolean = true
  //  lockedItem     : boolean = false
  //  lockedAdd      : boolean = true
  //  private lockSupplier(){
  //    this.lockedSupplier = true
  //  }
  //  private lockRtv(){
  //    this.lockedRtv = true
  //  }
 //   private lockItem(){
  //    this.lockedItem = true
 //   }
 //   private lockAdd(){
  //    this.lockedAdd = true
  //  }
  //  private unlockSupplier(){
  //    this.lockedSupplier = false
  //  }
  //  private unlockLpo(){
  //    this.lockedRtv = false
  //  }
  //  private unlockItem(){
  //    this.lockedItem = false
  //  }
  //  private unlockAdd(){
  //    this.lockedAdd = false
 //   }
    





//}

//export class Rtv{
  //id : any
  //RtvNo : string
 // rtvDate : any
  //rtvDetail : RtvDetail[]
//}
//export class RtvDetail{
  //detailId    : any
 // barcode     : string
  //itemCode    : string
  //description : string
  //qtyReturned : number
  //reason      : string
//}
