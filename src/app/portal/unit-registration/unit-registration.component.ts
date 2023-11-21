import { Component } from '@angular/core';
import { PortalServiceService } from './../serviceapi/portal-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { ValidatorchklistService } from './../serviceapi/validatorchklist.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-unit-registration',
  templateUrl: './unit-registration.component.html',
  styleUrls: ['../../common.css', './unit-registration.component.css']
})
export class UnitRegistrationComponent {

  private destroy$ = new Subject<void>();
  constructor(private ngxLoader: NgxUiLoaderService, private formBuilder: FormBuilder, private route: Router, public portalServ: PortalServiceService, private httpClient: HttpClient, public vldChkLst: ValidatorchklistService) { }
  stateDtails: any = [];
  allSbu: any = [];
  allPlant: any = [];
  allHouses: any = [];
  allUnits: any = [];
  activeSBU:any = [];
  stateId:any;
  activePlant:any;
  sbuId:any;
  activeHouse:any = [];
  plantId:any;
  unitRegisterForm!:FormGroup;

  fullArr: any = [];
  ngOnInit(): void {
    this.getAllState();
    this.getAllUnit();

    this.unitRegisterForm = this.formBuilder.group({
      homereigster: this.formBuilder.array([]),
    });

    this.addunit()
  }

  get unitArray() {
    return this.unitRegisterForm.get('homereigster') as FormArray
  }

  addunit() {
    const unitGroup = this.formBuilder.group({
      houseId: ['',Validators.required],
      unitNo: ['',Validators.required],
      unitCapacity: [''],
      electBillPercent: [''],
      waterBillPercent: [''],
      startDate: ['',Validators.required],
      endDate: [''],
      // Add more form controls as needed
    },);

    this.unitArray.push(unitGroup);
    console.log("ku6 nahi ho raha", this.unitArray);
  }

  removeUnit(index:number) {
    this.unitArray.removeAt(index)
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
  getSubonStateChange(event: any) {
    this.ngxLoader.start()
    this.activeSBU = [];
    const selectedStateId = event.target.value;
    this.stateId = selectedStateId;
  
    this.portalServ.get(`PAPL/get/sbu/by/${selectedStateId}`)
    .pipe(takeUntil(this.destroy$)) 
    .subscribe((res) => {
      this.activeSBU = res;
      this.ngxLoader.stop()
      //console.log(res);
    });
  }

  getPlantOnSubChange(event:any) {
    this.ngxLoader.start()
    this.activePlant = [];
    const selectedSublocation = event.target.value;
    this.sbuId = selectedSublocation;

    this.portalServ.get(`PAPL/get/plant/by/${selectedSublocation}`)
    .pipe(takeUntil(this.destroy$))
    .subscribe((res)=>{
      this.activePlant = res;
      this.ngxLoader.stop()
     // console.log("active plan", this.activePlant)
    })

  }

  getHouseByPlantId(event:any) {
    this.ngxLoader.start()
    this.activeHouse = [];
    const selectedPlantId = event.target.value;
    this.plantId = selectedPlantId;

    this.portalServ.get(`PAPL/get/house/by/${selectedPlantId}`)
    .pipe(takeUntil(this.destroy$))
    .subscribe((res)=>{
      this.activeHouse = res;
      this.ngxLoader.stop()
     // console.log("active plan", this.activeHouse)
    })
  }
  
  
 
  
  
  getAllUnit() {
    this.portalServ.get('PAPL/getAllUnit')
    .subscribe((res)=>{
      this.allUnits = res
      console.log(this.allUnits)
    })
  }
  deleteUnit(id:any) {
    this.ngxLoader.start()
    this.portalServ.get(`deactivate/Unit?id=${id}`)
    .pipe(takeUntil(this.destroy$))
    .subscribe((res)=>{

      console.log(res);
      this.getAllUnit()
      this.ngxLoader.stop()
    })

  }
 
  postUnit() {

   if(this.sbuId !== undefined && this.plantId !== undefined) {
    console.log(this.sbuId, this.plantId);
    if (this.unitArray.at(0)?.valid) {
      let data = {
        "stateId": this.stateId,
        "sbuId":this.sbuId,
        "plantId":this.plantId,
        "unitDTO": this.unitArray.value,
      }
      this.ngxLoader.start()
      this.portalServ.post("PAPL/addUnits",data)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res)=>{
        console.log(res)
        this.getAllUnit()
        this.stateId = null;
        this.sbuId = null;
        this.plantId = null;
        this.unitArray.clear()
        this.addunit()
        this.ngxLoader.stop()
        Swal.fire({
          icon: 'success',
          text: 'Unit Registration Successfull'
        });
  
      })
    } else {
      Swal.fire({
        // icon: 'error',
        text: `Please Enter Unit Registration Details `
      });
     
    }
   
   } else {
   // alert("Please Enter Mandatory Fields !")
    Swal.fire({
      // icon: 'error',
      text: `Please Select State, Sbu and Plant `
    });
   }
  }

  updateMinEndDate(index:any): void {
    const startDateInput = document.getElementById('startDate') as HTMLInputElement;
    if (startDateInput) {
      const startDateValue = startDateInput.value;
      // Set the minimum allowed value for the end date to the selected start date
      document.getElementById('endDate')?.setAttribute('min', startDateValue);
      // Ensure the end date is always greater than or equal to the start date
      if (this.unitArray.at(index).value.startDate < startDateValue) {
        this.unitArray.at(index).value.endDate = startDateValue;
      }
      console.log(this.unitArray.at(index).value.startDate);
      
    }
  }

  

}

