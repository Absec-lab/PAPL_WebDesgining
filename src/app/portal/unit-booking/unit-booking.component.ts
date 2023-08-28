import {  Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-unit-booking',
  templateUrl: './unit-booking.component.html',
  styleUrls: ['../../common.css','./unit-booking.component.css']
})
export class UnitBookingComponent {

  tableData = [
    { SL_NO: 1, Unit_No: 'ROOM 1', Occupied: '5',Available:'5', Action:''},
    
    // Add more data items as needed
  ];


 

  
}
