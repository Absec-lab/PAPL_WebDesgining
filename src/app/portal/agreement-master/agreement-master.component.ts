import { Component } from '@angular/core';
import { PortalServiceService } from './../serviceapi/portal-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { ValidatorchklistService } from './../serviceapi/validatorchklist.service';

@Component({
  selector: 'app-agreement-master',
  templateUrl: './agreement-master.component.html',
  styleUrls: ['../../common.css', './agreement-master.component.css']
})
export class AgreementMasterComponent {
  constructor(private ngxLoader: NgxUiLoaderService, private formBuilder: FormBuilder, private route: Router, public portalServ: PortalServiceService, private httpClient: HttpClient, public vldChkLst: ValidatorchklistService) { }
  ngOnInit(): void {
    this.getAllState();
    this.getAllSbu();
    this.getAllPlant();
    this.getAllOwner();
    this.getAllAgreementType();
    this.getAllAgreement();
  }
  tableData: any = [];
  allState: any = [];
  allSbu: any = [];
  allPlant: any = [];
  allOwner: any = [];
  getAllAgreementTypeData: any = [];
  aggreState: any = '';
  aggreSbu: any = '';
  aggrePlant: any = '';
  aggreOwner: any = '';
  aggreHouse: any = '';
  aggreAggrementType: any = '';
  aggreElectricBill: any = '';
  aggreWaterBill: any = '';
  aggreMonthlyRent: any = '';
  aggrePeriod: any = '';
  aggreStartDate: any = '';
  aggreEndDate: any = '';
  aggreId: any = '';
  selectedCropFileNames:any='';
  selectedCropFiles:any=[];
  cropPreviews:any=[];
  getVal(val: any) {
    this.aggreElectricBill = val.checked;
  }
  getValaggreWaterBill(val: any) {
    this.aggreWaterBill = val.checked;
  }
  deleteAgreement(aggreTypeId: any = 0) {
    Swal.fire({
      icon: 'warning',
      text: "Are you sure you want to Delete the details?",
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      cancelButtonColor: '#df1141'
    }).then((result) => {
      if (result.isConfirmed) {
        let param = {
          "id": aggreTypeId
        };
        this.ngxLoader.start();
        this.portalServ.deleteAgreement(param).subscribe(res => {
          this.ngxLoader.stop();
          if (res.responseCode == 200) {
            Swal.fire({
              icon: 'success',
              text: 'Record Deleted Successfully'
            });
            this.getAllAgreement();
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
            text: 'Error'
          });
        });
      }
    });
  }
  getAllState() {
    let param = {};
    this.ngxLoader.start();
    this.portalServ.getAllState(param).subscribe(res => {
      this.ngxLoader.stop();
      if (res.length > 0) {
        this.allState = res;
      } else {
        this.allState = [];
      }
    }, error => {
      this.ngxLoader.stop();
    });
  }
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
  }
  getAllPlant() {
    let param = {};
    this.ngxLoader.start();
    this.portalServ.getAllPlant(param).subscribe(res => {
      this.ngxLoader.stop();
      if (res.length > 0) {
        this.allPlant = res;
      } else {
        this.allPlant = [];
      }
    }, error => {
      this.ngxLoader.stop();
    });
  }
  getAllSbu() {
    let param = {};
    this.ngxLoader.start();
    this.portalServ.getAllSbu(param).subscribe(res => {
      this.ngxLoader.stop();
      if (res.length > 0) {
        this.allSbu = res;
      } else {
        this.allSbu = [];
      }
    }, error => {
      this.ngxLoader.stop();
    });
  }
  getAllAgreementType() {
    let param = {};
    this.ngxLoader.start();
    this.portalServ.getAllAgreementType(param).subscribe(res => {
      this.ngxLoader.stop();
      if (res.length > 0) {
        this.getAllAgreementTypeData = res;
      } else {
        this.getAllAgreementTypeData = [];
      }
    }, error => {
      this.ngxLoader.stop();
    });
  }
  getAllAgreement() {
    let param = {};
    this.ngxLoader.start();
    this.portalServ.getAllAgreement(param).subscribe(res => {
      //console.log(res);
      this.ngxLoader.stop();
      if (res.length > 0) {
        this.tableData = res;
      } else {
        this.tableData = [];
      }
    }, error => {
      this.ngxLoader.stop();
    });
  }
  validateData() {
    let vSts = true;
    if (!this.vldChkLst.selectDropdown(this.aggreState, "State")) {
      vSts = false;
    }
    else if (!this.vldChkLst.selectDropdown(this.aggreSbu, "SBU")) {
      vSts = false;
    }
    else if (!this.vldChkLst.selectDropdown(this.aggrePlant, "PLANT")) {
      vSts = false;
    }
    else if (!this.vldChkLst.selectDropdown(this.aggreOwner, "Owner")) {
      vSts = false;
    }
    else if (!this.vldChkLst.selectDropdown(this.aggreHouse, "House")) {
      vSts = false;
    }
    else if (!this.vldChkLst.selectDropdown(this.aggreAggrementType, "Aggrement Type")) {
      vSts = false;
    }
    else if (!this.vldChkLst.blankCheck(this.aggreMonthlyRent, "Monthly Rent")) {
      vSts = false;
    }
    else if (!this.vldChkLst.blankCheck(this.aggrePeriod, "Aggrement Period")) {
      vSts = false;
    }
    else if (!this.vldChkLst.blankCheck(this.aggreStartDate, "Start Date")) {
      vSts = false;
    }
    else if (!this.vldChkLst.blankCheck(this.aggreEndDate, "End Date")) {
      vSts = false;
    }
    else {
      vSts = true;
    }
    return vSts;
  }
  editAgreement(aggreId:any,stateId:any,sbuId:any,plantId:any,ownerId:any,houseId:any,aggreTypeId:any,rent:any,rentPeriod:any,rentStartDt:any,rentEndDt:any,withElectricBill:any,withWaterBill:any){
    Swal.fire({
      icon: 'warning',
      text: "Are you sure you want to Edit the details?",
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      cancelButtonColor: '#df1141'
    }).then((result) => {
      if (result.isConfirmed) {
        this.aggreState = stateId;
        this.aggreSbu = sbuId;
        this.aggrePlant = plantId;
        this.aggreOwner = ownerId;
        this.aggreHouse = houseId;
        this.aggreAggrementType = aggreTypeId;
        this.aggreElectricBill = withElectricBill;
        this.aggreWaterBill = withWaterBill;
        this.aggreMonthlyRent = rent;
        this.aggrePeriod = rentPeriod;
        this.aggreStartDate = rentStartDt.split('T')[0];
        this.aggreEndDate = rentEndDt.split('T')[0];
        this.aggreId = aggreId;
      }
    });
  }
  saveAggreement() {
    let vSts = this.validateData();
    if (vSts) {
      let param = {
        "aggreAddr": "string",
        "aggreId": null,
        "agreementType": {
          "aggreTypeId": this.aggreAggrementType
        },
        "house": {
          "houseId": this.aggreHouse
        },
        "owner": {
          "ownerId": this.aggreOwner
        },
        "plant": {
          "plantId": this.aggrePlant
        },
        "rent": this.aggreMonthlyRent,
        "rentEndDt": this.aggreEndDate,
        "rentPeriod": this.aggrePeriod,
        "rentStartDt": this.aggreStartDate,
        "sbu": {
          "locationId": this.aggreSbu
        },
        "state": {
          "stateId": this.aggreState
        },
        "withElectricBill": this.aggreElectricBill,
        "withWaterBill": this.aggreWaterBill
      };
      this.ngxLoader.start();
      this.portalServ.addAgreement(param).subscribe(res => {
        this.ngxLoader.stop();
        // if (res.responseCode == 200 || res.responseCode == 201) {
          this.aggreElectricBill = '';
          this.aggreWaterBill = '';
          this.aggreState = '';
          this.aggreSbu = '';
          this.aggreStartDate = '';
          this.aggrePeriod = '';
          this.aggreEndDate = '';
          this.aggreMonthlyRent = '';
          this.aggrePlant = '';
          this.aggreOwner = '';
          this.aggreAggrementType = '';
          Swal.fire({
            icon: 'success',
            text: 'Record Saved Successfully'
          });
          this.getAllAgreement();
        // } else {
        //   Swal.fire({
        //     icon: 'error',
        //     text: res.message
        //   });
        // }

      }, error => {
        this.ngxLoader.stop();
        Swal.fire({
          icon: 'error',
          text: 'Error in Data Insertion'
        });
      });
    }
  }
  updateAgreement() {
    let vSts = this.validateData();
    if (vSts) {
      let param = {
        "aggreAddr": "string",
        "aggreId": this.aggreId,
        "agreementType": {
          "aggreTypeId": this.aggreAggrementType
        },
        "house": {
          "houseId": this.aggreHouse
        },
        "owner": {
          "ownerId": this.aggreOwner
        },
        "plant": {
          "plantId": this.aggrePlant
        },
        "rent": this.aggreMonthlyRent,
        "rentEndDt": this.aggreEndDate,
        "rentPeriod": this.aggrePeriod,
        "rentStartDt": this.aggreStartDate,
        "sbu": {
          "locationId": this.aggreSbu
        },
        "state": {
          "stateId": this.aggreState
        },
        "withElectricBill": this.aggreElectricBill,
        "withWaterBill": this.aggreWaterBill
      };
      this.ngxLoader.start();
      this.portalServ.updateAgreement(param).subscribe(res => {
        this.ngxLoader.stop();
        // if (res.responseCode == 200 || res.responseCode == 201) {
          this.aggreElectricBill = '';
          this.aggreWaterBill = '';
          this.aggreState = '';
          this.aggreSbu = '';
          this.aggreStartDate = '';
          this.aggrePeriod = '';
          this.aggreEndDate = '';
          this.aggreMonthlyRent = '';
          this.aggrePlant = '';
          this.aggreOwner = '';
          this.aggreAggrementType = '';
          Swal.fire({
            icon: 'success',
            text: 'Record Update Successfully'
          });
          this.getAllAgreement();
        // } else {
        //   Swal.fire({
        //     icon: 'error',
        //     text: res.message
        //   });
        // }

      }, error => {
        this.ngxLoader.stop();
        Swal.fire({
          icon: 'error',
          text: 'Error in Data Updation'
        });
      });
    }
  }
  selectFiles(event: any): void {
    this.selectedCropFileNames = '';
    this.selectedCropFiles = event.target.files;
    this.cropPreviews= [];

    const file = this.selectedCropFiles[0];
    const  fileType = file['type'];
    const fileSize = file['size'];
    const validPdfTypes = ['application/pdf','image/jpg', 'image/jpeg', 'image/png'];
    if (!validPdfTypes.includes(fileType)) {
      // invalid file type code goes here.
      Swal.fire({
        icon: 'error',
        text: 'Please select a valid  file'
      });
      return ;
    }
    if (fileSize>500000) {
      // invalid file size code goes here.
      Swal.fire({
       icon: 'error',
        text: 'Selected file must be in between 500kb'
      });
      return ;
    }

    if (this.selectedCropFiles && this.selectedCropFiles[0]) {
      const numberOfFiles = this.selectedCropFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.cropPreviews.push(e.target.result);
        };
        reader.readAsDataURL(this.selectedCropFiles[i]);
        this.selectedCropFileNames  = this.selectedCropFiles[i].name;
      }

    }
  }
}
