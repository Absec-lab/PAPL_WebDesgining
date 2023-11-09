import { Component } from '@angular/core';
import { PortalServiceService } from './../serviceapi/portal-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormBuilder, FormGroup,FormControl , Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { ValidatorchklistService } from './../serviceapi/validatorchklist.service';
@Component({
  selector: 'app-home-owner-registration',
  templateUrl: './house-owner-registration.component.html',
  styleUrls: ['../../common.css', './house-owner-registration.component.css']
})
export class HouseOwnerRegistrationComponent {
  allOwner:any=[];
  legalbtn:boolean = false;
  upi:boolean = false;
  cash:boolean = false;
  heading:boolean = false;
  bank:boolean = false;
  legalheir:boolean = false;
  stateDtails:any = []
  houseRegistrationForm!: FormGroup<any>;
  constructor(private ngxLoader: NgxUiLoaderService, private formBuilder: FormBuilder, private route: Router, public portalServ: PortalServiceService, private httpClient: HttpClient, public vldChkLst: ValidatorchklistService) { }
  ngOnInit(): void {
    this.getAllOwner();
    this.getAllStateList()

    this.houseRegistrationForm = this.formBuilder.group({
      ownerName: [''],
      phone: [''],
      email: [''],
      idProof: [''],
      gIdproof: [''],
      add1: [''],
      add2: [''],
      state: [''],
      dist: [''],
      pin: [''],
      paymode: [''],
      status: [''],
      accHolName: [''],
      accounNum: [''],
      ifsc: [''],
      pan: [''],
      panPic: [''],
      desc: [''],
      upiId: [''],
      linkMobile: [''],
      qrCode: [''],
     
    });
  }
 
  bankStatusChk: any = 0;
  getAllStateList() {
    this.portalServ.get('PAPL/getAllState')
    .subscribe((res)=>{
      this.stateDtails = res
      //console.log(res)
    })
  }
  
  getAllOwner() {
    let param = {};
    // this.ngxLoader.start();
    this.portalServ.getAllOwner(param).subscribe(res => {
      this.allOwner = res;
      
    });
  }
  deleteOwner(id: any = 0) {
    this.portalServ.deleteOwner(id).subscribe(res => {  
      this.getAllOwner();
          
   }); 
  }

  ownerRegistration() {
    let data:any =[
      {
      
        "ownerId": null,
        "ownerName": this.houseRegistrationForm.value.ownerName,
        "prevOwonerId": '',
        "phoneNo":this.houseRegistrationForm.value.phone,
        "legalIdProof":'',
        "legalIdProofAddr": '',
        "emailId": this.houseRegistrationForm.value.email,
        "paymtMode": this.houseRegistrationForm.value.paymode,
        "address1":this.houseRegistrationForm.value.add1,
        "address2":this.houseRegistrationForm.value.add2,
        "state": {
          "stateId":this.houseRegistrationForm.value.state,
        },
        "district":this.houseRegistrationForm.value.dist,
        "pinCode":this.houseRegistrationForm.value.pin,
        "idProof":this.houseRegistrationForm.value.gIdproof,
        "idProofAddress": this.houseRegistrationForm.value.idProof,
        "accountHolderName":this.houseRegistrationForm.value.accHolName,
        "bankAccountNo": this.houseRegistrationForm.value.accounNum,
        "ifscCode": this.houseRegistrationForm.value.ifsc,
        "panNo": this.houseRegistrationForm.value.pan,
        "panCardAddress": this.houseRegistrationForm.value.panPic,
        "description": this.houseRegistrationForm.value.desc,
        "upiId": this.houseRegistrationForm.value.upiId,
        "upiPhoneNo":this.houseRegistrationForm.value.linkMobile,
        "uploadQuarCodeAdds":this.houseRegistrationForm.value.qrCode,
        "noofLegalParties": 0,
      }
    ]

    this.portalServ.post("PAPL/addOwners",data)
    .subscribe((res)=>{
    console.log(res)
    alert("House Owner Registation succcesfull")
  })
  }
  
 

  paymentmode(event:any) {
    console.log(event.target.value)
    let value = event.target.value;

    if(value == '2') {
        this.heading = false 
    } else {
      this.heading = true 
    }

    if(value=='1') {
      this.bank = true
      this.upi = false
    } else {
      this.bank = false;
      this.upi = true;
    }
  }
		
    

  

  

}
