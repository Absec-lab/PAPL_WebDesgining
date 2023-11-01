import {  Component, EventEmitter, OnInit, Output} from '@angular/core';
import { PortalServiceService } from '../serviceapi/portal-service.service';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-unit-booking',
  templateUrl: './unit-booking.component.html',
  styleUrls: ['../../common.css','./unit-booking.component.css']
})
export class UnitBookingComponent implements OnInit {

  stateDtails:any;
  activeSBU:any = [];
  activePlant:any = [];
  activeHouse:any = [];

  private destroy$ = new Subject<void>();
  
  constructor(private portalService:PortalServiceService) {}



  ngOnInit(): void {
    this.getAllStateList()

  }

  getAllStateList() {
    this.portalService.get('PAPL/getAllState')
    .subscribe((res)=>{
      this.stateDtails = res
      console.log(res)
    })
  }

  

  getSubonStateChange(event: any) {
    this.activeSBU = [];
    const selectedStateId = event.target.value;
  
    this.portalService.get(`PAPL/get/sbu/by/${selectedStateId}`)
    .pipe(takeUntil(this.destroy$)) 
    .subscribe((res) => {
      this.activeSBU = res;
      console.log(res);
    });
  }

  getPlantOnSubChange(event:any) {

    this.activePlant = [];
    const selectedSublocation = event.target.value;

    this.portalService.get(`PAPL/get/plant/by/${selectedSublocation}`)
    .pipe(takeUntil(this.destroy$))
    .subscribe((res)=>{
      this.activePlant = res;
      console.log("active plan", this.activePlant)
    })

  }

  getHouseByPlantId(event:any) {
    this.activeHouse = [];
    const selectedPlantId = event.target.value;

    this.portalService.get(`PAPL/get/house/by/${selectedPlantId}`)
    .pipe(takeUntil(this.destroy$))
    .subscribe((res)=>{
      this.activeHouse = res;
      console.log("active plan", this.activeHouse)
    })
  }


  

  tableData = [
    { SL_NO: 1, Unit_No: 'ROOM_1', Occupied: '5',Available:'5', Action:''},
    
    // Add more data items as needed
  ];


  onClick() {
    // Your button click logic here
    alert('Booking Successfully!!');
  }
  onClick1() {
    // Your button click logic here
    alert('Update Successfully!!');
  }

  ngOnDestroy() {
    this.destroy$.next(); // Trigger the Subject to complete when the component is destroyed
    this.destroy$.complete();
  }

}

  

