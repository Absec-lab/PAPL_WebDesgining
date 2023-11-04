import {  Component, EventEmitter, OnInit, Output} from '@angular/core';
import { PortalServiceService } from '../serviceapi/portal-service.service';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-unit-booking',
  templateUrl: './unit-booking.component.html',
  styleUrls: ['../../common.css','./unit-booking.component.css']
})
export class UnitBookingComponent implements OnInit {

  employeeForm!: FormGroup;

  stateDtails:any;
  activeSBU:any = [];
  activePlant:any = [];
  activeHouse:any = [];
  activeUnitId:any = [];
  allemployeeDetails:any = [];

  stateId:any;
  sbuId:any;
  plantId:any;
  houseId:any;
  unitId:any;

  houseDetails:any = [];

  private destroy$ = new Subject<void>();
  
  constructor(private portalService:PortalServiceService,private formBuilder: FormBuilder) {}



  ngOnInit(): void {
    this.getAllStateList()

    this.employeeForm = this.formBuilder.group({
      empId: [''],
      empName: [''],
      emailId: [''],
      mobileNo: [''],
      bookStartDate: [''],
      bkEndDate: [''],
      selectPeriod:[''],
      plantName:[''],
      serviceOrder:[''],
      
    });

  }

  getAllStateList() {
    this.portalService.get('PAPL/getAllState')
    .subscribe((res)=>{
      this.stateDtails = res
      //console.log(res)
    })
  }

  

  getSubonStateChange(event: any) {
    this.activeSBU = [];
    const selectedStateId = event.target.value;
    this.stateId = selectedStateId;
  
    this.portalService.get(`PAPL/get/sbu/by/${selectedStateId}`)
    .pipe(takeUntil(this.destroy$)) 
    .subscribe((res) => {
      this.activeSBU = res;
      //console.log(res);
    });
  }

  getPlantOnSubChange(event:any) {

    this.activePlant = [];
    const selectedSublocation = event.target.value;
    this.sbuId = selectedSublocation;

    this.portalService.get(`PAPL/get/plant/by/${selectedSublocation}`)
    .pipe(takeUntil(this.destroy$))
    .subscribe((res)=>{
      this.activePlant = res;
     // console.log("active plan", this.activePlant)
    })

  }

  getHouseByPlantId(event:any) {
    this.activeHouse = [];
    const selectedPlantId = event.target.value;
    this.plantId = selectedPlantId;

    this.portalService.get(`PAPL/get/house/by/${selectedPlantId}`)
    .pipe(takeUntil(this.destroy$))
    .subscribe((res)=>{
      this.activeHouse = res;
     // console.log("active plan", this.activeHouse)
    })
  }

  getHouseId(event:any) {
    this.activeUnitId = [];
    const selectedUnitId = event.target.value;
    this.houseId = selectedUnitId;

    this.portalService.get(`PAPL/get/unit/by/${selectedUnitId}`)
    .pipe(takeUntil(this.destroy$))
    .subscribe((res)=>{
      this.activeUnitId = res;
      this.activeUnitId = res.map((item:any) => item.houseRegistration);
      //this.activeUnitId = this.activeUnitId.houseRegistration
      console.log("activeUnitId plan", this.activeUnitId)
    })
  }

  getunitId(event:any) {
    const unithId = event.target.value;
    console.log(unithId);
    this.unitId = unithId;
  }

  unitBookingSearch() {
    this.portalService.get(`PAPL/UnitBookingsearch?fk_state_id=${this.stateId}&fk_sbu_id=${this.sbuId}&fk_plant_id=${this.plantId}&fk_House_id=${this.houseId}&unit_id=${this.unitId}`)
    .pipe(takeUntil(this.destroy$))
    .subscribe((res)=> {
      this.houseDetails = res;
      console.log(res)
    })
  }


  

  getEmployeeDetails() {

    this.portalService.get("PAPL/getAllEmployee")
    .pipe(takeUntil(this.destroy$))
    .subscribe((res)=>{
      this.allemployeeDetails = res
     console.log("active plan", this.allemployeeDetails)
    })
  }

postBooking() {
  let data =  {
    "houseId":this.houseId,
    "unitId":this.unitId,
    "stateId":this.stateId,
    "plantId":this.plantId,
    "sbuId":this.sbuId,
    "so":this.employeeForm.controls['serviceOrder'].value,
    "empId":this.employeeForm.controls['empId'].value,
    "empName":this.employeeForm.controls['empName'].value,
    "emailId":this.employeeForm.controls['emailId'].value,
    "mobileNo":this.employeeForm.controls['mobileNo'].value,
    "bkStartDate":this.employeeForm.controls['bookStartDate'].value,
    "bkEndDate":this.employeeForm.controls['bkEndDate'].value,

}
  console.log(data);
  
  this.portalService.post("PAPL/UnitBooking",data)
  .subscribe((res)=>{
    console.log(res)
    alert("booking succcesfull")
  })
}

selectEmp(event: any) {
  const empID = event.target.value;
  this.portalService.get(`PAPL/getEmployeeDetails?papl_id=${empID}`)
    .pipe(takeUntil(this.destroy$))
    .subscribe((res) => {
      console.log(res);
      const employee = res[0]; // Move the assignment here
      if (employee) {
        this.employeeForm.patchValue({
          empName: employee.empName,
          mobileNo: employee.mobileNo,
          plantName: employee.plantId,
          serviceOrder: employee.so,
          emailId: employee.email
        });
      }
    });
}
  onClick() {
    // Your button click logic here
    alert('Booking Successfully!!');
  }
  onClick1() {
    // Your button click logic here
   // alert('Update Successfully!!');
    this.unitBookingSearch()
  }

  ngOnDestroy() {
    this.destroy$.next(); // Trigger the Subject to complete when the component is destroyed
    this.destroy$.complete();
  }

}

  

