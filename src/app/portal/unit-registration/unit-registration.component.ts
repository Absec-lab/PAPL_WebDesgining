import { Component } from '@angular/core';
import { PortalServiceService } from './../serviceapi/portal-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { ValidatorchklistService } from './../serviceapi/validatorchklist.service';
import { Subject, takeUntil } from 'rxjs';
import { ExcelService } from '../serviceapi/excel.service';
@Component({
  selector: 'app-unit-registration',
  templateUrl: './unit-registration.component.html',
  styleUrls: ['../../common.css', './unit-registration.component.css']
})
export class UnitRegistrationComponent {

  private destroy$ = new Subject<void>();
  constructor(private ngxLoader: NgxUiLoaderService, private formBuilder: FormBuilder, private route: Router, public portalServ: PortalServiceService, private httpClient: HttpClient, public vldChkLst: ValidatorchklistService,private excelService: ExcelService) { }
  tableData: any = [];
  duplicateTableData: any[] =[];
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
  stateDtails: any = [];
  allSbu: any = [];
  allPlant: any = [];
  allHouses: any = [];
  allOwner: any;
  allUnits: any;
  activeSBU: any;
  stateId: any;
  activePlant: any;
  sbuId: any;
  unitId: any;
  activeHouse: any = [];
  plantId: any;
  ownerId: any;
  unitRegisterForm!: FormGroup;

  updatebtn: boolean = false;

  ngOnInit(): void {
    this.getAllState();
    this.getAllUnit();
    this.getAllOwner();

    this.unitRegisterForm = this.formBuilder.group({
      stateId: [0, [Validators.required, Validators.min(1)]],
      sbuId: [0, [Validators.required, Validators.min(1)]],
      plantId: [0, [Validators.required, Validators.min(1)]],
      unitId: [0, [Validators.required, Validators.min(1)]],
      homereigster: this.formBuilder.array([]),
    });

    this.addunit();
  }

  createUnitGroup(): FormGroup {
    return this.formBuilder.group({
      ownerId: [0,  [Validators.required, Validators.min(1)]],
      houseId: [0,  [Validators.required, Validators.min(1)]],
      unitNo: ['', Validators.required],
      unitCapacity: ['', Validators.required],
      electBillPercent: ['', Validators.required],
      waterBillPercent: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
    });
  }

  get unitArray() {
    return this.unitRegisterForm.get('homereigster') as FormArray;
  }

  addunit() {
    const unitGroup = this.createUnitGroup();
    this.unitArray.push(unitGroup);
  }

  removeUnit(index: number) {
    this.unitArray.removeAt(index);
  }

  getAllHouses() {
    let param = {};
    this.portalServ.getAllHousesByPlantId(param).subscribe(res => {
      this.allHouses = res;
    });
  }

  getAllState() {
    let param = {};
    this.portalServ.getAllState(param).subscribe(res => {
      this.stateDtails = res;
    });
  }

  getAllPlant() {
    let param = {};
    this.portalServ.getAllPlant(param).subscribe(res => {
      this.allPlant = res;
    });
  }

  getAllOwner() {
    // this.ngxLoader.start();
    this.portalServ.get("PAPL/getAllOwner")
      .pipe((takeUntil(this.destroy$)))
      .subscribe(res => {
        console.log(res);
        this.allOwner = res.data;
        this.ngxLoader.stop();
      });
  }

  getSubonStateChange(event: any) {
   // this.ngxLoader.start();
    this.activeSBU = [];
    const selectedStateId = event.target.value;
    this.stateId = selectedStateId;

    this.portalServ.get(`PAPL/get/sbu/by/${selectedStateId}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.activeSBU = res;
        this.ngxLoader.stop();
      });
  }

  getPlantOnSubChange(event: any) {
   // this.ngxLoader.start();
    this.activePlant = [];
    const selectedSublocation = event.target.value;
    this.sbuId = selectedSublocation;

    this.portalServ.get(`PAPL/get/plant/by/${selectedSublocation}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.activePlant = res;
        this.ngxLoader.stop();
      });
  }

  getownerByPlantId(event: any) {
   // this.ngxLoader.start();
    this.allOwner = [];
    const selectedPlantId = event.target.value;
    this.plantId = selectedPlantId;

    this.portalServ.get('PAPL/get/owner/by/{PlantId}?plant_id='+selectedPlantId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.allOwner = res;
        this.ngxLoader.stop();
      });
  }

  getHouseByOwnerId(event: any) {
    // this.ngxLoader.start();
     //this.allHouses = [];
     const selectedownerId = event.target.value;
     this.ownerId = selectedownerId;
 
     this.portalServ.get('PAPL/get/House/by/{ownerId}?ownerId='+selectedownerId )
       .pipe(takeUntil(this.destroy$))
       .subscribe((res) => {
         this.activeHouse = res;
         this.ngxLoader.stop();
       });
   }

  onTableDataChange(event: any) {
    this.page = event;
    this.getAllUnit();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllUnit();
  }
  getAllUnit() {
    this.portalServ.get('PAPL/getAllUnit')
      .subscribe((res) => {
        this.tableData = res.data;
        this.allUnits = res.data;
        console.log(this.allUnits);
        this.duplicateTableData = res.data;
      });
  }




  deleteUnit(id: any) {
    Swal.fire({
      text: "Are you sure you want to Delete the details?",
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      cancelButtonColor: '#df1141'
    }).then((result) => {
      if (result.isConfirmed) {
       // this.ngxLoader.start();
        this.portalServ.get(`deactivate/Unit?id=${id}`)
          .pipe(takeUntil(this.destroy$))
          .subscribe((res) => {
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

  postUnit() {
    if (this.unitArray.controls[0].valid) {
      let data = {

       "stateId": this.stateId,
        "sbuId": this.sbuId,
        "plantId": this.plantId,
        "unitId": this.unitId,
        "unitDTO": this.unitArray.value,
      };
     // this.ngxLoader.start();
      this.portalServ.post("PAPL/addUnits", data)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {
          console.log(res);
          this.getAllUnit();
          this.stateId = "";
          this.sbuId = "";
          this.plantId = "";
          this.unitId = "";
          this.unitArray.clear();
          this.addunit();
          this.ngxLoader.stop();
          Swal.fire({
            icon: 'success',
            text: 'Unit Registration Successful'
          });
          this.unitRegisterForm.reset();
          this.unitArray.reset();
        });
    } else {
      this.showFieldErrors();
    }
  }

  showFieldErrors() {
    (this.unitArray as FormArray).controls.forEach((control: AbstractControl, index: number) => {
      if (control instanceof FormGroup) {
        Object.keys(control.controls).forEach((key: string) => {
          const formControl = control.get(key);
          if (formControl && formControl.invalid) {
            formControl.markAsTouched();
          }
        });
      }
    });
  }

  // updateUnit(item: any) {
  //   this.updatebtn = true;
  //   const firstUnitGroup = this.unitArray.at(0) as FormGroup;
  //   firstUnitGroup.patchValue({
  //     ownerId: item.ownerId,
  //     houseId: item.houseId,
  //     unitNo: item.unitNo,
  //     unitCapacity: item.unitCapacity,
  //     electBillPercent: item.electBillPercent,
  //     waterBillPercent: item.waterBillPercent,
  //     startDate: item.startDate,
  //     endDate: item.endDate,
  //   });


  updateUnit(item: any) {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.updatebtn = true;
    console.log(item);
    this.unitRegisterForm.patchValue({
      unitId: item.unitId,
      stateId: item.stateId,
      sbuId: item.locationId,
      plantId: item.plantId,
      mapId: item.mapId,
      houseId: item.houseId,
    });

    while (this.unitArray.length !== 0) {
      this.unitArray.removeAt(0);
    }

    this.addunit();

    const stateGroup = this.unitArray.at(0);
    stateGroup.patchValue({   
          ownerId: item.ownerId,
          houseId: item.houseId,
          unitNo: item.unitNo,
          unitCapacity: item.unitCapacity,
          electBillPercent: item.electBillPercent,
          waterBillPercent: item.waterBillPercent,
          startDate: item.startDate,
          endDate: item.endDate,
    });

    setTimeout(() => {
      this.getSubonStateChange(item.stateId);
      this.getPlantOnSubChange(item.locationId);
    });

    setTimeout(() => {
      const stateId = document.querySelectorAll('#stateId');
      for (let i = 0; i < stateId.length; i++) {
        stateId[i].dispatchEvent(new Event('change'));
      }
    }, 1010);
    setTimeout(() => {
      const sbuId = document.querySelectorAll('#sbuId');
      for (let i = 0; i < sbuId.length; i++) {
        sbuId[i].dispatchEvent(new Event('change'));
      }
    }, 2010);
    setTimeout(() => {
      const plantId = document.querySelectorAll('#plantId');
      for (let i = 0; i < plantId.length; i++) {
        plantId[i].dispatchEvent(new Event('change'));
      }
    }, 3010);
    setTimeout(() => {
      const houseId = document.querySelectorAll('#houseId');
      for (let i = 0; i < houseId.length; i++) {
        houseId[i].dispatchEvent(new Event('change'));
      }
    }, 4010);
    this.unitId= item.unitId;
  }

  updateUnitForm() {
    if (this.unitArray.controls[0].valid) {
      let data = {
        "unitId":this.unitId,
        "stateId": this.stateId,
        "sbuId": this.sbuId,
        "plantId": this.plantId,
        "unitDTO": this.unitArray.value,
      };

      // this.ngxLoader.start();
      this.portalServ.updateUnits(data)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {
          console.log(res);
          this.getAllUnit();
          this.stateId = null;
          this.sbuId = null;
          this.plantId = null;
          this.unitId = null;
          this.unitArray.clear();
          this.addunit();
          this.ngxLoader.stop();
          Swal.fire({
            icon: 'success',
            text: 'Unit Updated Successfully'
          });
          this.updatebtn = false;
          this.unitRegisterForm.reset();
          this.unitArray.reset();
        }, error => {
          this.ngxLoader.stop();
          Swal.fire({
            icon: 'error',
            text: 'Error updating unit'
          });
        });
    } else {
      this.showFieldErrors();
    }
  }

  updateMinEndDate(index: any): void {
    const startDateInput = document.getElementById('startDate') as HTMLInputElement;
    if (startDateInput) {
      const startDateValue = startDateInput.value;
      document.getElementById('endDate')?.setAttribute('min', startDateValue);
      if (this.unitArray.at(index).value.startDate < startDateValue) {
        this.unitArray.at(index).value.endDate = startDateValue;
      }
      console.log(this.unitArray.at(index).value.startDate);
    }
  }
  exportAsXLSX(): void {
    debugger;
    let removeColumnData = ['unitId','houseId','locationId','ownerId','plantId','stateId',''];
    let Heading =[
      [ "House Name","Owner Name","State","SBU","Plant Name","Room No","Unit Capacity","Electric Bill Percentage","Water Bill Percentage","Start Date","End Date","Created Date"]  
    ];
    removeColumnData.forEach(e => {
      this.duplicateTableData.forEach(element => {
        delete element[e]
   });
 });
    this.excelService.exportAsExcelFile(this.duplicateTableData, 'unitregistration',Heading);
  }
}
