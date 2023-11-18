import { Component } from '@angular/core';
import { PortalServiceService } from './../serviceapi/portal-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormBuilder, FormGroup,FormControl , Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { ValidatorchklistService } from './../serviceapi/validatorchklist.service';
import { takeUntil } from 'rxjs';
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
  updatebtn:boolean = false;
  descripinput:boolean = false;
  constructor(private ngxLoader: NgxUiLoaderService, private formBuilder: FormBuilder, private route: Router, public portalServ: PortalServiceService, private httpClient: HttpClient, public vldChkLst: ValidatorchklistService) { }
  ngOnInit(): void {
    this.getAllOwner();
    this.getAllStateList()

    this.houseRegistrationForm = this.formBuilder.group({
      ownerId:[''],
      ownerName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      idProof: [''],
      gIdproof: [''],
      add1: [''],
      add2: [''],
      state: ['', Validators.required],
      dist: [''],
      pin: [''],
      paymode: ['', Validators.required],
      status: ['1'],
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
      if(res) {
        alert("Owner Deactivated !")
      }
      this.getAllOwner();
          
   }); 
  }

  onImageChange(event: any): void {
		const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
		const file = inputElement.files[0];
	  
		if (file) {
		  // You can optionally display a preview of the selected image
		  // For example, you can use FileReader to read the file and set it as a preview.
	  
		  const reader = new FileReader();
		  reader.onload = (e) => {
			// Set the image form control's value to the file
			this.houseRegistrationForm.value.gIdproof.setValue(file);
		  };
		  reader.readAsDataURL(file);
		}
    }
	  }

  ownerRegistration() {
    if(this.houseRegistrationForm.valid) {
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
      this.getAllOwner();
      this.houseRegistrationForm.reset()
    })
    } else {
      alert("Please Enter Required field")
    }
  }
  
  editOwner(item:any){
    console.log(item)
    this.updatebtn = true;
    this.descripinput = true;
    this.houseRegistrationForm.patchValue({
      ownerId:item.ownerId,
      ownerName: item.ownerName,
      phone: item.phoneNo,
      email: item.emailId,
      idProof: '',
      gIdproof: item.idProofAddress,
      add1: item.address1,
      add2: item.address2,
      state: item.state.stateId,
      dist: item.district,
      pin: item.pinCode,
      paymode: item.paymtMode,
      status: '',
      accHolName: item.accountHolderName,
      accounNum: item.bankAccountNo,
      ifsc: item.ifscCode,
      pan: item.panNo,
      panPic: item.panCardAddress,
      desc:item.description,
      upiId: item.upiId,
      linkMobile: item.upiPhoneNo,
      qrCode:item.uploadQuarCodeAdds,
    })
  }
  
  updateowner() {
    let data = {
      "accountHolderName": this.houseRegistrationForm.value.accHolName,
      "address1": this.houseRegistrationForm.value.add1,
      "address2": this.houseRegistrationForm.value.add2,
      "bankAccountNo":  this.houseRegistrationForm.value.accounNum,
      "description": this.houseRegistrationForm.value.desc,
      "district": this.houseRegistrationForm.value.dist,
      "emailId": this.houseRegistrationForm.value.email,
      "idProof": this.houseRegistrationForm.value.gIdproof,
      "idProofAddress":this.houseRegistrationForm.value.idProof,
      "ifscCode":this.houseRegistrationForm.value.ifsc,
      "legalIdProof": "",
      "legalIdProofAddr": "",
      "noofLegalParties": 0,
      "ownerId": this.houseRegistrationForm.value.ownerId,
      "ownerName":this.houseRegistrationForm.value.ownerName,
      "panCardAddress": this.houseRegistrationForm.value.panPic,
      "panNo":  this.houseRegistrationForm.value.pan,
      "paymtMode": this.houseRegistrationForm.value.paymode,
      "phoneNo":this.houseRegistrationForm.value.phone,
      "pinCode":this.houseRegistrationForm.value.pin,
      "prevOwonerId": '',
      "state": {
        "stateId": this.houseRegistrationForm.value.state,
      }
    
    }
    
    this.portalServ.put("PAPL/updateOwner",data)
    .subscribe(res => {
      console.log(res)
      this.getAllOwner();
      this.houseRegistrationForm.reset()
      alert("House Owner Registration succesfull")
      this.updatebtn = false;
    })
  }
  legalbtnh:boolean = false
  showLegal(event:any) {
    const value = event.target.value;
    console.log(value)
    if(value ==0){
      this.legalheir = true;
    } else {
      this.legalheir = false;
    }
  }

  togglelegal() {
    this.legalbtnh = !this.legalbtnh
    this.legalheir = false;
    this.descripinput= false
  }
  legalheading= false;
  legalbank = false;
  legalupi = false;
  paymentmode(event:any,userType:string) {
    console.log(event.target.value, userType)
    let value = event.target.value;

    if(userType=='owner') {
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
    } else if(userType=='legal' ) {
      if(value == '2') {
        this.legalheading = false 
      } else {
      this.legalheading = true 
      }

      if(value=='1') {
        this.legalbank = true
        this.legalupi = false
      } else {
        this.legalbank = false;
        this.legalupi = true;
      }
    }
  }
		
    

  

  

}
