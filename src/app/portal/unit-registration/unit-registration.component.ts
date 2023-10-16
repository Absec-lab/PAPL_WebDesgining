import { Component } from '@angular/core';
import { PortalServiceService } from './../serviceapi/portal-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { ValidatorchklistService } from './../serviceapi/validatorchklist.service';

@Component({
  selector: 'app-unit-registration',
  templateUrl: './unit-registration.component.html',
  styleUrls: ['../../common.css', './unit-registration.component.css']
})
export class UnitRegistrationComponent {
  constructor(private ngxLoader: NgxUiLoaderService, private formBuilder: FormBuilder, private route: Router, public portalServ: PortalServiceService, private httpClient: HttpClient, public vldChkLst: ValidatorchklistService) { }
  allState: any = [];
  allSbu: any = [];
  allPlant: any = [];
  allHouses: any = [];
  allUnits: any = [];

  fullArr: any = [];
  ngOnInit(): void {
    this.getAllState();
    this.getAllUnit();
  }
  getAllHouses() {
    let param = {};
    this.ngxLoader.start();
    this.portalServ.getAllHousesByPlantId(param).subscribe(res => {
      this.ngxLoader.stop();
      if (res.length > 0) {
        this.allHouses = res;
        this.moreplot();
      } else {
        this.allHouses = [];
        this.moreplot();
      }
    }, error => {
      this.ngxLoader.stop();
    });
  }
  getAllState() {
    let param = {};
    this.ngxLoader.start();
    this.portalServ.getAllState(param).subscribe(res => {
      this.ngxLoader.stop();
      if (res.length > 0) {
        this.allState = res;
        this.getAllSbu();
      } else {
        this.allState = [];
        this.getAllSbu();
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
        this.getAllHouses();
      } else {
        this.allPlant = [];
        this.getAllHouses();
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
        this.getAllPlant();
      } else {
        this.allSbu = [];
        this.getAllPlant();
      }
    }, error => {
      this.ngxLoader.stop();
    });
  }
  addMoreObj(i: any = 0) {
    let vSts = this.validateDetails();
    if (!vSts) {
    	return vSts;
    }
    else {
    this.moreplot();
    this.getMasterList(i + 1);
    }
    return 
  }
  moreplot() {
    // Add a new object to the array
    this.fullArr.push({
      "available": 3,
      "booked": 4,
      "electBillPercent": "",
      "endDate": "",
      "houseRegistration": {
        "houseId": ''
      },
      "plant": {
        "plantId": ''
      },
      "sbu": {
        "locationId": ''
      },
      "startDate": "",
      "state": {
        "stateId": ''
      },
      "unitCapacity": '',
      "unitId": null,
      "unitNo": "",
      "waterBillPercent": "",
      "allstate": this.allState,
      "allsbu": this.allSbu,
      "allplant": this.allPlant,
      "allhouses": this.allHouses,
    });
  }
  validateDetails() {
    let vSts = true;
    for (let countStart = 0; countStart < this.fullArr.length; countStart++) {
      if (!this.vldChkLst.selectDropdown(this.fullArr[countStart].state.stateId, "State ")) {
        vSts = false;
      }
      else if (!this.vldChkLst.selectDropdown(this.fullArr[countStart].sbu.locationId, "SBU ")) {
        vSts = false;
      }
      else if (!this.vldChkLst.selectDropdown(this.fullArr[countStart].plant.plantId, "Plant ")) {
        vSts = false;
      }
      else if (!this.vldChkLst.selectDropdown(this.fullArr[countStart].houseRegistration.houseId, "House ")) {
        vSts = false;
      }
      else if (!this.vldChkLst.blankCheck(this.fullArr[countStart].unitNo, "Room no ")) {
        vSts = false;
      }
      else if (!this.vldChkLst.blankCheck(this.fullArr[countStart].unitCapacity, "Unit Capacity ")) {
        vSts = false;
      }
      else if (!this.vldChkLst.blankCheck(this.fullArr[countStart].electBillPercent, "Electric Bill Percent ")) {
        vSts = false;
      }
      else if (!this.vldChkLst.blankCheck(this.fullArr[countStart].waterBillPercent, "Water Bill Percent")) {
        vSts = false;
      }
      else if (!this.vldChkLst.blankCheck(this.fullArr[countStart].startDate, "Start Date")) {
        vSts = false;
      }
      else if (!this.vldChkLst.blankCheck(this.fullArr[countStart].endDate, "End Date")) {
        vSts = false;
      }
      if (!vSts) {
        return vSts;
      }
    }

    return vSts;
  }
  getMasterList(pos: any = 0) {
    this.fullArr[pos].allstate = this.allState;
    this.fullArr[pos].allsbu = this.allSbu;
    this.fullArr[pos].allplant = this.allPlant;
    this.fullArr[pos].allhouses = this.allHouses;
  }
  loopFunctionCallSelectData() {
    for (let i = 0; i < this.fullArr.length; i++) {
      this.getMasterList(i);
    }
  }
  moreObjRemove(countI: any, plotId: any) {
    Swal.fire({
      //icon: 'warning',
      text: "Are you sure you want to Delete the details?",
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      cancelButtonColor: '#df1141'
    }).then((result) => {
      if (result.isConfirmed) {
        if (plotId == '') {
          this.fullArr.splice(countI, 1);
        } else {
          this.fullArr.splice(countI, 1);
          // this.removePlotDataBase(plotId);
        }
      }
    });
  }
  getAllUnit() {
    let param = {};
    this.ngxLoader.start();
    this.portalServ.getAllUnit(param).subscribe(res => {
      this.ngxLoader.stop();
      if (res.length > 0) {
        this.allUnits = res;
      } else {
        this.allUnits = [];
      }
    }, error => {
      this.ngxLoader.stop();
    });
  }
  deleteUnit(id: any = 0) {
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
        this.portalServ.deleteUnit(param).subscribe(res => {
          this.ngxLoader.stop();
          if (res.responseCode == 200) {
            Swal.fire({
              icon: 'success',
              text: 'Record Deleted Successfully'
            });
            this.getAllUnit();
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
  saveUnits() {
    let vSts = this.validateDetails();
    if (vSts) {
      this.ngxLoader.start();
      const param = this.fullArr.map((item: any) => {
        const { allstate, allsbu, allplant, allhouses, ...rest } = item;
        return rest;
      });
      this.portalServ.addUnits(param).subscribe(res => {
        this.ngxLoader.stop();
        if (res.length>0) {
          this.fullArr = [];
          Swal.fire({
            icon: 'success',
            text: 'Record Saved Successfully'
          });
          this.getAllUnit();
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

}

