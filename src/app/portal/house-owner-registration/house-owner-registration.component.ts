import { Component, ElementRef, ViewChild } from '@angular/core';
import { PortalServiceService } from './../serviceapi/portal-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { ValidatorchklistService } from './../serviceapi/validatorchklist.service';
import { takeUntil } from 'rxjs';
import { CommonValidatorService } from 'src/app/common-validator.service';
@Component({
  selector: 'app-home-owner-registration',
  templateUrl: './house-owner-registration.component.html',
  styleUrls: ['../../common.css', './house-owner-registration.component.css']
})
export class HouseOwnerRegistrationComponent {
  allOwner: any[] = [];
  legalbtn: boolean = false;
  upi: boolean = false;
  cash: boolean = false;
  heading: boolean = false;
  bank: boolean = false;
  legalheir: boolean = false;
  stateDtails: any = []
  houseRegistrationForm!: FormGroup<any>;
  updatebtn: boolean = false;
  descripinput: boolean = false;
  legalheirForm!: FormGroup;
  noOfLegalParties: any;
  @ViewChild('fileInput') fileInput!: ElementRef;
  constructor(private ngxLoader: NgxUiLoaderService, private formBuilder: FormBuilder, private route: Router, public portalServ: PortalServiceService, private httpClient: HttpClient, public vldChkLst: ValidatorchklistService) { }
  ngOnInit(): void {
    this.getAllOwner();
    this.getAllStateList()

    this.houseRegistrationForm = this.formBuilder.group({
      ownerId: [''],
      ownerName: ['', [Validators.required, CommonValidatorService.fullNameValidator]],
      phone: ['', Validators.required],
      email: ['', [Validators.required, CommonValidatorService.validateEmail]],
      idProofDoc: [''],
      idProofDocPrifix: [''],
      gIdproof: ['', Validators.required],
      add1: ['', Validators.required],
      add2: [''],
      state: ['', Validators.required],
      dist: ['', Validators.required],
      pin: ['', Validators.required],
      paymode: ['', Validators.required],
      status: ['1'],
      accHolName: ['', Validators.required],
      accounNum: ['', Validators.required],
      ifsc: ['', Validators.required],
      pan: ['', Validators.required],
      panPic: [''],
      panNoPrifix: [''],
      desc: [''],
      upiId: [''],
      linkMobile: [''],
      qrCode: [''],
      uploadlegalheir: [''],
      legalprifix: ['']

    });

    this.legalheirForm = this.formBuilder.group({
      // ownerName: ['', [Validators.required, CommonValidatorService.fullNameValidator]],

      legal: this.formBuilder.array([])
    })
  }

  get legalheirarray(): any {
    return this.legalheirForm.get('legal') as FormArray;
  }

  addlegaleirform() {
    const legalform = this.formBuilder.group({
      prevOwonerId: [this.houseRegistrationForm.value.ownerId],
      ownerName: ['', Validators.required, [CommonValidatorService.fullNameValidator]],
      phoneNo: ['', Validators.required],
      emailId: ['', [CommonValidatorService.validateEmail]],
      idProofDoc: [''],
      idProofDocPrifix: [''],
      idProof: [''],
      address1: [''],
      address2: [''],
      stateId: [''],
      district: [''],
      pinCode: [''],
      paymtMode: [''],
      isActive: ['1'],
      accountHolderName: [''],
      bankAccountNo: [''],
      ifscCode: [''],
      panNo: [''],
      panCardAddress: [''],
      panNoDoc: [''],
      panNoPrifix: [''],
      upiId: [''],
      upiPhoneNo: [''],
      uploadQuarCodeAdds: [''],
      quarCodePrifix: [''],
      quarCodeDoc: ['']

    })
    console.log(typeof this.noOfLegalParties);
    console.log(this.noOfLegalParties);
    this.legalheirarray.insert(0, legalform);
    // if( this.legalheirarray.length > this.noOfLegalParties ) {

    // }
  }

  removelegalform(index: number) {
    this.legalheirarray.removeAt(index)
  }
  bankStatusChk: any = 0;
  getAllStateList() {
    this.portalServ.get('PAPL/getAllState')
      .subscribe((res) => {
        this.stateDtails = res
        //console.log(res)
      })
  }



  getAllOwner() {
    let param = {};
    // this.ngxLoader.start();
    this.portalServ.getAllOwner(param).subscribe(res => {
      this.allOwner = res.data;
      console.log(res);

    });
  }
  deleteOwner(id: any = 0) {
    this.portalServ.deleteOwner(id).subscribe(res => {
      if (res) {
        alert("Owner Deactivated !")
      }
      this.getAllOwner();

    });
  }

  onImageChange(event: any, formControlName: string, formArrName?: string, index?: number): void {
    console.log("formControlName", formControlName);

    const inputElement = event.target as HTMLInputElement;

    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];

      if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          const imageDataUrl = e.target?.result as string;
          const base64Content = imageDataUrl.split(',')[1];
          // Determine file extension based on file type
          const fileExtension = this.getFileExtension(file.type);
          const extn = '.' + fileExtension

          if (formControlName == 'idProofDoc') {
            this.houseRegistrationForm.get('idProofDocPrifix')?.setValue(extn)
          } else if (formControlName == 'panPic') {
            this.houseRegistrationForm.get('panNoPrifix')?.setValue(extn)
          } else if (formControlName == 'qrCode') {
            this.houseRegistrationForm.get('quarCodePrifix')?.setValue(extn)
          } else if (formControlName == 'uploadlegalheir') {
            this.houseRegistrationForm.get('legalprifix')?.setValue(extn)
          }
          // Use base64Content and fileExtension as needed
          console.log('Base64 Content:', base64Content);
          console.log('File Extension:', extn, "form control", this.houseRegistrationForm.value.idProofDocPrifix);

          if (formArrName && index !== undefined) {
            // Update image value in a FormArray at a specific index
            const formArray = this.legalheirForm.get(formArrName) as FormArray;

            if (formArray && index >= 0 && index < formArray.length) {
              const formGroup = formArray.at(index) as FormGroup;
              if (formControlName == 'idProofDoc') {
                formGroup.get('idProofDocPrifix')?.setValue(extn);
              } else if (formControlName == 'panNoDoc') {
                formGroup.get('panNoPrifix')?.setValue(extn);
              } else if (formControlName == 'quarCodeDoc') {
                formGroup.get('quarCodePrifix')?.setValue(extn);
              }
              formGroup.get(formControlName)?.setValue(base64Content);
            }
          } else {
            // Update image value in a regular FormControl
            const formControl = this.houseRegistrationForm.get(formControlName);

            if (formControl) {
              formControl.setValue(base64Content);
            }
          }
        };

        if (file.type.startsWith('image/') || file.type === 'application/pdf') {
          reader.readAsDataURL(file);
        } else {
          console.error('Invalid file type. Please select an image or PDF file.');
        }
      }
    }
    console.log(this.houseRegistrationForm);
  }

  getFileExtension(mimeType: string): string {
    const types: { [key: string]: string } = {
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'application/pdf': 'pdf',
      // Add more as needed
    };

    return types[mimeType] || 'unknown';
  }

  validateData() {
    const formControls = [
      { control: this.houseRegistrationForm.get('ownerName'), name: "Owner Name" },
      { control: this.houseRegistrationForm.get('phone'), name: "Phone" },
      { control: this.houseRegistrationForm.get('email'), name: "Email" },
      { control: this.houseRegistrationForm.get('gIdproof'), name: "Govt. Id Proof" },
      { control: this.houseRegistrationForm.get('add1'), name: "Address 1" },
      // { control: this.houseRegistrationForm.get('add2'), name: "Address 2" },

      { control: this.houseRegistrationForm.get('state'), name: "State" },
      { control: this.houseRegistrationForm.get('dist'), name: "District" },
      { control: this.houseRegistrationForm.get('pin'), name: "Pin Code" },

      { control: this.houseRegistrationForm.get('paymode'), name: "Payment mode" },
      { control: this.houseRegistrationForm.get('accHolName'), name: "Account holder name" },
      { control: this.houseRegistrationForm.get('accounNum'), name: "Account Number" },
      { control: this.houseRegistrationForm.get('ifsc'), name: "IFSC" },
      { control: this.houseRegistrationForm.get('pan'), name: "PAN" },
      //   if (this.upi == true) {
      //   { control: this.houseRegistrationForm.get('upiId'), name: "UPI Id" },
      //   { control: this.houseRegistrationForm.get('linkMobile'), name: "Linked Mobile No." },
      // }


    ];

    let vSts = true;

    for (const formControl of formControls) {
      if (formControl.control?.valid) {
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
    let errFlag = 0;
    let emailId: any = this.houseRegistrationForm.value.emailId;
    let gIdproof: any = this.houseRegistrationForm.value.gIdproof;
    const emailIdcheck = this.houseRegistrationForm.get('emailId');
    if (errFlag == 0 && emailIdcheck && emailIdcheck.hasError('email')) {
      errFlag = 1;
      emailIdcheck.markAsTouched();
    }
    if (
      errFlag == 0 &&
      !this.vldChkLst.isAlphaNumericKey(
        'gIdproof',
        gIdproof,
        'Govt. Id Proof'
      )
    ) {
      errFlag = 1;
    }

    let valid = this.validateData();
    if (valid) {
      let data: any =
      {
        "ownerName": this.houseRegistrationForm.value.ownerName,
        "phoneNo": this.houseRegistrationForm.value.phone,
        "emailId": this.houseRegistrationForm.value.email,
        "paymtMode": this.houseRegistrationForm.value.paymode,
        "address1": this.houseRegistrationForm.value.add1,
        "address2": this.houseRegistrationForm.value.add2,
        "stateId": this.houseRegistrationForm.value.state,
        "district": this.houseRegistrationForm.value.dist,
        "pinCode": this.houseRegistrationForm.value.pin,
        "idProofDoc": this.houseRegistrationForm.value.idProofDoc,
        "idProof": this.houseRegistrationForm.value.gIdproof,
        "idProofDocPrifix": this.houseRegistrationForm.value.idProofDocPrifix,
        "isActive": this.houseRegistrationForm.value.status,
        "accountHolderName": this.houseRegistrationForm.value.accHolName,
        "bankAccountNo": this.houseRegistrationForm.value.accounNum,
        "ifscCode": this.houseRegistrationForm.value.ifsc,
        "panNo": this.houseRegistrationForm.value.pan,
        "panNoDoc": this.houseRegistrationForm.value.panPic,
        "panNoPrifix": this.houseRegistrationForm.value.panNoPrifix,
        "panCardAddress": "string",
        "upiId": this.houseRegistrationForm.value.upiId,
        "upiPhoneNo": this.houseRegistrationForm.value.linkMobile,
        "quarCodeDoc": this.houseRegistrationForm.value.qrCode,
        "quarCodePrifix": this.houseRegistrationForm.value.quarCodePrifix,
      }

      this.ngxLoader.start();
      this.portalServ.post("PAPL/addOwners", data)
        .subscribe((res) => {
          this.ngxLoader.stop();
          console.log(res)
          this.getAllOwner();
          this.houseRegistrationForm.reset();
          this.fileInput.nativeElement.value = '';
          this.houseRegistrationForm.patchValue({
            idProofDoc: '',
            status: '1'
          });
          console.log(this.houseRegistrationForm.value);

          // this.houseRegistrationForm.get('isActive')?.setValue("1")
          Swal.fire({
            icon: 'success',
            text: 'Owner Registation Successfull'
          });
          //  this.houseRegistrationForm.value.isActive.setValue('1')


        })
    }
  }

  editOwner(item: any) {
    console.log(item)
    this.updatebtn = true;
    this.descripinput = true;
    this.paymentmode(item.paymtMode == 'string' ? 2 : item.paymtMode, 'owner')
    this.houseRegistrationForm.patchValue({
      ownerId: item.ownerId,
      ownerName: item.ownerName,
      phone: item.phoneNo,
      email: item.emailId,
      // idProof: item.idProofAddress,
      gIdproof: item.idProof,
      add1: item.address1,
      add2: item.address2,
      state: item.stateId,
      dist: item.district,
      pin: item.pinCode,
      paymode: item.paymtMode == 'string' ? 2 : item.paymtMode,
      status: item.isActive,
      accHolName: item.accountHolderName,
      accounNum: item.bankAccountNo,
      ifsc: item.ifscCode,
      pan: item.panNo,
      panPic: item.panCardAddress,
      desc: item.description,
      upiId: item.upiId,
      linkMobile: item.upiPhoneNo,
      qrCode: item.uploadQuarCodeAdds,
    })
  }

  validateLegalData() {
    const formControlss = [
      // { control: this.legalheirForm.get('ownerName'), name: "House Owner Name" },
      { control: this.legalheirForm.get('phoneNo'), name: "Phone" },
      { control: this.legalheirForm.get('emailId'), name: "Email" },
      { control: this.legalheirForm.get('idProof'), name: "Govt. Id Proof" },
      { control: this.legalheirForm.get('address1'), name: "Address 1" },
      // { control: this.legalheirForm.get('add2'), name: "Address 2" },

      { control: this.legalheirForm.get('stateId'), name: "State" },
      { control: this.legalheirForm.get('district'), name: "District" },
      { control: this.legalheirForm.get('pinCode'), name: "Pin Code" },

      { control: this.legalheirForm.get('paymtMode'), name: "Payment mode" },
      { control: this.legalheirForm.get('accHolName'), name: "Account holder name" },
      { control: this.legalheirForm.get('accounNum'), name: "Account Number" },
      { control: this.legalheirForm.get('ifsc'), name: "IFSC" },
      { control: this.legalheirForm.get('pan'), name: "PAN" },
      //   if (this.upi == true) {
      //   { control: this.legalheirForm.get('upiId'), name: "UPI Id" },
      //   { control: this.legalheirForm.get('linkMobile'), name: "Linked Mobile No." },
      // }


    ];

    let vStss = true;

    for (const formControl of formControlss) {
      if (formControl.control?.valid) {
        vStss = true;
      } else {
        Swal.fire({
          // icon: 'error',
          text: `Please select ${formControl.name}`
        });
        vStss = false
        break;
      }

    }
    return vStss;
  }

  updateowner() {
    // let valid = this.validateLegalData();
    // if (valid) {
      let data = {
        "legalHeirRequestDto": this.legalheirarray.value,
        "ownerRegistrationRequestDto": {
          "ownerId": this.houseRegistrationForm.value.ownerId,
          "ownerName": this.houseRegistrationForm.value.ownerName,
          "phoneNo": this.houseRegistrationForm.value.phone,
          "emailId": this.houseRegistrationForm.value.email,
          "paymtMode": this.houseRegistrationForm.value.paymode,
          "address1": this.houseRegistrationForm.value.add1,
          "address2": this.houseRegistrationForm.value.add2,
          "stateId": this.houseRegistrationForm.value.state,
          "district": this.houseRegistrationForm.value.dist,
          "pinCode": this.houseRegistrationForm.value.pin,
          "idProof": this.houseRegistrationForm.value.gIdproof,
          "idProofDoc": this.houseRegistrationForm.value.idProof,
          "isActive": this.houseRegistrationForm.value.status,
          "accountHolderName": this.houseRegistrationForm.value.accHolName,
          "bankAccountNo": this.houseRegistrationForm.value.accounNum,
          "ifscCode": this.houseRegistrationForm.value.ifsc,
          "panNo": this.houseRegistrationForm.value.pan,
          "panCardAddress": this.houseRegistrationForm.value.panPic,
          "upiId": this.houseRegistrationForm.value.upiId,
          "upiPhoneNo": this.houseRegistrationForm.value.linkMobile,
          "uploadQuarCodeDoc": this.houseRegistrationForm.value.qrCode,
          "legalIdProof": "testing",
          "legalIdProofDocPrifix": this.houseRegistrationForm.value.legalprifix,
          "legalIdProofDoc": this.houseRegistrationForm.value.uploadlegalheir,
          "noofLegalParties": this.noOfLegalParties,
          "description": this.houseRegistrationForm.value.desc,
        }
      }
      console.log(this.legalheirarray.value);

      this.portalServ.put("PAPL/updateOwner", data)
        .subscribe(res => {
          console.log(res)
          this.getAllOwner();
          this.houseRegistrationForm.reset()
          alert("House Owner Update succesfull")
          window.location.reload()
          this.legalheirarray.controls.forEach((control: any) => {
            control.reset();
          });
          this.legalbtnh = false;
        })
    // }
  }
  legalbtnh: boolean = false
  showLegal(event: any) {
    const value = event.target.value;
    console.log(value)
    if (value == 0) {
      this.legalheir = true;
    } else {
      this.legalheir = false;
      if (this.legalbtnh) {
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
  legalheading = false;
  legalbank = false;
  legalupi = false;
  paymentmode(event: any, userType: string, index?: any) {
    console.log("image");
    let value: any;
    //console.log(event, userType, typeof(event))
    if (typeof (event) == 'string') {
      value = event
    } else {

      value = event.target.value;
    }


    if (userType == 'owner') {
      if (value == '2') {
        this.heading = false
      } else {
        this.heading = true
      }

      if (value == '1') {
        this.bank = true
        this.upi = false
      } else {
        this.bank = false;
        this.upi = true;
      }
    } else if (userType == 'legal') {
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



  showhidebankdetails(indes: any) {
    // this.legalheirarray.constrols
    console.log([3, 4, 5, 6].includes(this.legalheirarray.value[indes].paymtMode));
    console.log(typeof this.legalheirarray.value[indes].paymtMode);
    if (this.legalheirarray.value[indes].paymtMode == 1) {
      return "Bank"
    } else if ([3, 4, 5, 6].includes(+this.legalheirarray.value[indes].paymtMode)) {


      return "upi"
    }
    return 'false'
  }



}
