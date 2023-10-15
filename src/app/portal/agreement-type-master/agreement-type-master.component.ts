import { Component } from '@angular/core';
import { PortalServiceService } from './../serviceapi/portal-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { ValidatorchklistService } from './../serviceapi/validatorchklist.service';

@Component({
  selector: 'app-agreement-type-master',
  templateUrl: './agreement-type-master.component.html',
  styleUrls: ['../../common.css', './agreement-type-master.component.css']
})
export class AgreementTypeMasterComponent {
  constructor(private ngxLoader: NgxUiLoaderService, private formBuilder: FormBuilder, private route: Router, public portalServ: PortalServiceService, private httpClient: HttpClient, public vldChkLst: ValidatorchklistService) { }
  ngOnInit(): void {
    this.getAllAgreementType();
  }
  tableData: any = [];
  aggrementType: any = '';
  aggreStDate: any = '';
  aggreEdDate: any = '';
  aggrementTypeDesc: any = '';
  aggreTypeId: any = '';

  onClick() {
    // Your button click logic here
    alert('Deleted Successfully!!');
  }
  validateData() {
    let vSts = true;
    if (!this.vldChkLst.blankCheck(this.aggrementType, "Aggrement Type ")) {
      vSts = false;
    }
    else if (!this.vldChkLst.blankCheck(this.aggreStDate, "Aggrement Start Date ")) {
      vSts = false;
    }
    else if (!this.vldChkLst.blankCheck(this.aggreEdDate, "Aggrement End Date ")) {
      vSts = false;
    }
    else {
      vSts = true;
    }
    return vSts;
  }
  saveAgreementType() {
    let vSts = this.validateData();
    if (vSts) {
      let param = {
        "aggreEdDate": this.aggreEdDate,
        "aggreStDate": this.aggreStDate,
        "aggreTypeId": null,
        "aggreTypeName": this.aggrementType,
        "description": this.aggrementTypeDesc
      };
      this.ngxLoader.start();
      this.portalServ.addAgreementType(param).subscribe(res => {
        this.ngxLoader.stop();
        if (res.responseCode == 200 || res.responseCode == 201) {
          this.aggreEdDate = '';
          this.aggreStDate = '';
          this.aggrementType = '';
          this.aggrementTypeDesc = '';
          Swal.fire({
            icon: 'success',
            text: 'Record Saved Successfully'
          });
          this.getAllAgreementType();
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
          text: 'Error in Data Update'
        });
      });
    }
  }
  getAllAgreementType() {
    let param = {};
    this.ngxLoader.start();
    this.portalServ.getAllAgreementType(param).subscribe(res => {
      this.ngxLoader.stop();
      if (res.length > 0) {
        this.tableData = res;
      } else {
        this.tableData = [];
      }
    },error => {
      this.ngxLoader.stop();
    });
  }
  deleteAgreementType(aggreTypeId: any = 0) {
    let param = {
      "id": aggreTypeId
    };
    this.ngxLoader.start();
    this.portalServ.deleteAgreementType(param).subscribe(res => {
      this.ngxLoader.stop();
      if (res.responseCode == 200) {
        Swal.fire({
          icon: 'success',
          text: 'Record Deleted Successfully'
        });
        this.getAllAgreementType();
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
  editAgreementType(aggreTypeId:any,aggreTypeName:any,aggreStDate:any,description:any,aggreEdDate:any){
    this.aggreTypeId = aggreTypeId;
    this.aggrementType = aggreTypeName;
    this.aggreStDate = aggreStDate.split('T')[0];
    this.aggrementTypeDesc = description;
    this.aggreEdDate = aggreEdDate.split('T')[0];
  }
  updateAgreementType() {
    let vSts = this.validateData();
    if (vSts) {
      let param = {
        "aggreEdDate": this.aggreEdDate,
        "aggreStDate": this.aggreStDate,
        "aggreTypeId": this.aggreTypeId,
        "aggreTypeName": this.aggrementType,
        "description": this.aggrementTypeDesc
      };
      
      this.ngxLoader.start();
      this.portalServ.updateAgreementType(param).subscribe(res => {
        this.ngxLoader.stop();
        if (res.responseCode == 400) {
          this.aggreEdDate = '';
          this.aggreStDate = '';
          this.aggrementType = '';
          this.aggrementTypeDesc = '';
          this.aggreTypeId='';
          Swal.fire({
            icon: 'error',
            text: res.message
          });
        } else {
          this.aggreEdDate = '';
          this.aggreStDate = '';
          this.aggrementType = '';
          this.aggrementTypeDesc = '';
          this.aggreTypeId='';
          Swal.fire({
            icon: 'success',
            text: 'Record Updated Successfully'
          });
          this.getAllAgreementType();
        }

      }, error => {
        this.ngxLoader.stop();
        Swal.fire({
          icon: 'error',
          text: 'Error in Data Update'
        });
      });
    }
  }
}
