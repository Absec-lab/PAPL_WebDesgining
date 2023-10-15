import { Component } from '@angular/core';
import { PortalServiceService } from './../serviceapi/portal-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  constructor(private ngxLoader: NgxUiLoaderService, private formBuilder: FormBuilder, private route: Router, public portalServ: PortalServiceService, private httpClient: HttpClient, public vldChkLst: ValidatorchklistService) { }
  ngOnInit(): void {
    this.getAllOwner();
  }
  sowner:any=[{
    "accountHolderName": "",
    "address1": "",
    "address2": "",
    "bankAccountNo": '',
    "district": "",
    "emailId": "",
    "idProof": "",
    "idProofAddress": "",
    "ifscCode": "",
    "ownerId": null,
    "ownerName": "",
    "panCardAddress": "",
    "panNo": "",
    "paymtMode": "",
    "phoneNo": '',
    "pinCode": 1,
    "state": {     
      "stateId": 2  
    }
  }];
  bankStatusChk: any = 0;
  validateData() {
    let vSts = true;
    if (!this.vldChkLst.blankCheck(this.sowner[0].ownerName, "Owner Name ")) {
      vSts = false;
    }
    else if (!this.vldChkLst.blankCheck(this.sowner[0].phoneNo, "Phone No ")) {
      vSts = false;
    }
    else if (!this.vldChkLst.blankCheck(this.sowner[0].emailId, "Email Id ")) {
      vSts = false;
    }
    else if (!this.vldChkLst.blankCheck(this.sowner[0].idProof, "Id Proof ")) {
      vSts = false;
    }
    else if (!this.vldChkLst.blankCheck(this.sowner[0].address1, "Address 1 ")) {
      vSts = false;
    }
    else if (!this.vldChkLst.blankCheck(this.sowner[0].address2, "Address 2")) {
      vSts = false;
    }
    else if (!this.vldChkLst.blankCheck(this.sowner[0].state.stateId, "State")) {
      vSts = false;
    }
    else if (!this.vldChkLst.blankCheck(this.sowner[0].district, "District")) {
      vSts = false;
    }
    else if (!this.vldChkLst.blankCheck(this.sowner[0].pinCode, "Pin Code")) {
      vSts = false;
    }
    else if (!this.vldChkLst.blankCheck(this.sowner[0].paymtMode, "Paymt Mode")) {
      vSts = false;
    }
    else {
      vSts = true;
    }
    return vSts;
  }
  saveOwner(){
    let vSts = this.validateData();
    if (vSts) {
      let param = this.sowner;
      this.ngxLoader.start();
      this.portalServ.addOwners(param).subscribe(res => {
        this.ngxLoader.stop();
        if (res.length>0) {
          
          this.sowner = [{
            "accountHolderName": "",
            "address1": "",
            "address2": "",
            "bankAccountNo": '',
            "district": "",
            "emailId": "",
            "idProof": "",
            "idProofAddress": "",
            "ifscCode": "",
            "ownerId": null,
            "ownerName": "",
            "panCardAddress": "",
            "panNo": "",
            "paymtMode": "",
            "phoneNo": '',
            "pinCode": 1,
            "state": {     
              "stateId": 2
            }
          }];
          Swal.fire({
            icon: 'success',
            text: 'Record Saved Successfully'
          });
          this.getAllOwner();
        } else {
          Swal.fire({
            icon: 'error',
            text: res.message
          });
        }

      }, error => {
        this.ngxLoader.stop();
        Swal.fire({
          icon: 'error',
          text: 'Error in Data Insertion'
        });
      });
    }
  }
<<<<<<< HEAD
  onClick2() {
    // Your button click logic here
    alert('Add Successfully!!');
  }


  onSubmit() {
    // Handle form submission and validation here
=======
  getAllOwner() {
    let param = {};
    this.ngxLoader.start();
    this.portalServ.getAllOwner(param).subscribe(res => {
      this.ngxLoader.stop();
      if (res.length > 0) {
        this.allOwner = res;
      } else {
        this.allOwner = [];
      }
    }, error => {
      this.ngxLoader.stop();
    });
>>>>>>> d58b13466c8cb8d2327ec11ba84f4164a0cdb372
  }
  deleteOwner(id: any = 0) {
    Swal.fire({
			//icon: 'warning',
			text: "Are you sure you want to Delete the details?",
			showCancelButton: true,
			confirmButtonText: 'Yes',
			cancelButtonText: 'No',
			cancelButtonColor: '#df1141'
		}).then((result) => {
			if (result.isConfirmed) {
        let param = {
          "id": id
        };
        this.ngxLoader.start();
        this.portalServ.deleteOwner(param).subscribe(res => {
          this.ngxLoader.stop();
          if (res.responseCode == 200) {
            Swal.fire({
              icon: 'success',
              text: 'Record Deleted Successfully'
            });
            this.getAllOwner();
          } else {
            Swal.fire({
              icon: 'error',
              text: res.message
            });
          }
        },error => {
          this.ngxLoader.stop();
          Swal.fire({
            icon: 'error',
            text: 'Error'
          });
        });
			}
		});

  }
  onPaymentModeChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.bankStatusChk = selectedValue;
    // switch (selectedValue) {
    //   case '1':
    //     this.router.navigate(['/portal/house-owner-registration-payment-mode-bank-ac']);
    //     break;
    //     case '2':
    //     this.router.navigate(['/portal/house-owner-registration']);
    //     break;
    //     case '3':
    //     this.router.navigate(['/portal/house-owner-registration-payment-mode-upi']);
    //     break;
    //     case '4':
    //     this.router.navigate(['/portal/house-owner-registration-payment-mode-upi']);
    //     break;
    //   case '5':
    //     this.router.navigate(['/portal/house-owner-registration-payment-mode-upi']);
    //     break;
    //     case '6':
    //     this.router.navigate(['/portal/house-owner-registration-payment-mode-upi']);
    //     break;
    //   // Add more cases for other payment modes if needed

    // }
  }

}
