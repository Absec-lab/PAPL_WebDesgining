import { Component } from '@angular/core';
import { PortalServiceService } from './../serviceapi/portal-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormBuilder, FormGroup,FormControl , Validators, FormArray } from '@angular/forms';
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
  legalheirForm!: FormGroup;
  noOfLegalParties:any;
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
      uploadlegalheir:['']
     
    });

    this.legalheirForm = this.formBuilder.group({
      legal:this.formBuilder.array([])
    })
  }
  
  get legalheirarray() : any {
    return this.legalheirForm.get('legal') as FormArray;
  }

  addlegaleirform() {
    const legalform = this.formBuilder.group({
      prevOwonerId:[this.houseRegistrationForm.value.ownerId],
      ownerName:[''],
      phoneNo:[''],
      emailId:[''],
      idProofDoc:[''],
      idProof:[''],
      address1:[''],
      address2:[''],
      stateId:[''],
      district:[''],
      pinCode:[''],
      paymtMode:[''],
      isActive:[''],
      accountHolderName:[''],
      bankAccountNo:[''],
      ifscCode:[''],
      panNo:[''],
      panCardAddress:[''],
      upiId:[''],
      upiPhoneNo:[''],
      uploadQuarCodeAdds:[''],
      
    })
    console.log(typeof this.noOfLegalParties);
    console.log( this.noOfLegalParties);
       this.legalheirarray.insert(0, legalform);
    // if( this.legalheirarray.length > this.noOfLegalParties ) {

    // }
  }

  removelegalform(index:number) {
    this.legalheirarray.removeAt(index)
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

  onImageChange(event: any, formControlName: string, formArrName?: string, index?: number): void {
    console.log("formControlName",formControlName);
    
    const inputElement = event.target as HTMLInputElement;
  
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
     
      if (file) {
        const reader = new FileReader();
  
        reader.onload = (e) => {
          const imageDataUrl = e.target?.result as string;
          console.log(imageDataUrl);
          
          if (formArrName && index !== undefined) {
            // Update image value in a FormArray at a specific index
            const formArray = this.legalheirForm.get(formArrName) as FormArray;
  
            if (formArray && index >= 0 && index < formArray.length) {
              const formGroup = formArray.at(index) as FormGroup;
              formGroup.get(formControlName)?.setValue(imageDataUrl);
            }
          } else {
            // Update image value in a regular FormControl
            const formControl = this.houseRegistrationForm.get(formControlName);
  
            if (formControl) {
              formControl.setValue(imageDataUrl);
            }
          }
        };
  
        reader.readAsDataURL(file);
      }
    }
    console.log(this.houseRegistrationForm);
    
  }

  validateData() {
    const formControls = [
      { control: this.houseRegistrationForm.get('ownerName'), name: "Owner Name" },
      { control: this.houseRegistrationForm.get('phone'), name: "Phone" },
      { control: this.houseRegistrationForm.get('email'), name: "Email" },
      { control: this.houseRegistrationForm.get('state'), name: "State" },
      { control: this.houseRegistrationForm.get('paymode'), name: "Paymode" },
     
    ];
     
    let vSts = true;
  
    for (const formControl of formControls) {
      if(formControl.control?.valid) {
        vSts = true;
      } else {
        Swal.fire({
          // icon: 'error',
          text: `Please select ${formControl.name}`
        });
        vSts = false
        break;
      }
      
    }
    return vSts;
  }

  ownerRegistration() {
    let valid = this.validateData();
    if(valid) {
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
      this.ngxLoader.start();
      this.portalServ.post("PAPL/addOwners",data)
      .subscribe((res)=>{
        this.ngxLoader.stop();
      console.log(res)
      this.getAllOwner();
      this.houseRegistrationForm.reset()
      Swal.fire({
        icon: 'success',
        text: 'Record Saved Successfully'
      });
      
    })
    } 
  }
  
  editOwner(item:any){
    console.log(item)
    this.updatebtn = true;
    this.descripinput = true;
    this.paymentmode(item.paymtMode == 'string' ? 2 :item.paymtMode ,'owner')
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
      paymode:item.paymtMode == 'string' ? 2 :item.paymtMode,
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
      "legalHeirRequestDto":this.legalheirarray.value ,
      "ownerRegistrationRequestDto": {
        "ownerId":  this.houseRegistrationForm.value.ownerId,
        "ownerName": this.houseRegistrationForm.value.ownerName,
        "phoneNo": this.houseRegistrationForm.value.phone,
        "emailId": this.houseRegistrationForm.value.email,
        "paymtMode": this.houseRegistrationForm.value.paymode,
        "address1":  this.houseRegistrationForm.value.add1,
        "address2":  this.houseRegistrationForm.value.add2,
        "stateId":  this.houseRegistrationForm.value.state,
        "district": this.houseRegistrationForm.value.dist,
        "pinCode":this.houseRegistrationForm.value.pin,
        "idProof":  this.houseRegistrationForm.value.gIdproof,
        "idProofDoc": this.houseRegistrationForm.value.idProof,
        "isActive":this.houseRegistrationForm.value.status,
        "accountHolderName":this.houseRegistrationForm.value.accHolName,
        "bankAccountNo": this.houseRegistrationForm.value.accounNum,
        "ifscCode": this.houseRegistrationForm.value.ifsc,
        "panNo":  this.houseRegistrationForm.value.pan,
        "panCardAddress":this.houseRegistrationForm.value.panPic,
        "upiId":this.houseRegistrationForm.value.upiId,
        "upiPhoneNo": this.houseRegistrationForm.value.linkMobile,
        "uploadQuarCodeDoc": this.houseRegistrationForm.value.qrCode,
        "legalIdProof": "testing",
        "legalIdProofDoc": "testing",
        "noofLegalParties": this.noOfLegalParties
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
      if(this.legalbtnh) {
        this.legalbtnh = false
      }
    }
  }

  togglelegal() {
    this.legalbtnh = !this.legalbtnh
    this.legalheir = false;
    this.addlegaleirform()
   // this.descripinput= false
  }
  legalheading= false;
  legalbank = false;
  legalupi = false;
  paymentmode(event:any,userType:string, index?:any) {
    console.log("image");
    let value:any;
    console.log(event, userType, typeof(event))
    if(typeof(event)=='number') {
      value = event
    } else {

      value = event.target.value;
    }
    
   
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
      // if(value == '2') {
      //   this.legalheading = false 
      // } else {
      // this.legalheading = true 
      // }

      // if(value=='1') {
        
      //   this.legalbank = true
      //   this.legalupi = false
      // } else {
      //   this.legalbank = false;
      //   this.legalupi = true;
      // }
    }

    
    
  }
		
    

  showhidebankdetails(indes:any) {
   // this.legalheirarray.constrols
   console.log([3,4,5,6].includes(this.legalheirarray.value[indes].paymtMode));
   console.log(typeof this.legalheirarray.value[indes].paymtMode);
    if(this.legalheirarray.value[indes].paymtMode == 1) {
      return "Bank"
    }  else if([3,4,5,6].includes(+this.legalheirarray.value[indes].paymtMode) ) {
     
      
      return "upi"
    }
      return 'false'
  }

  

}
