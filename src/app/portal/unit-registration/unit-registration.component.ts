import { Component } from '@angular/core';

@Component({
  selector: 'app-unit-registration',
  templateUrl: './unit-registration.component.html',
  styleUrls: ['../../common.css','./unit-registration.component.css']
})
export class UnitRegistrationComponent {
  tableData = [
    { SL_NO: 1, Unit_No: 'ROOM 1', Occupied: '5',Available:'5', Action:''},
    
    // Add more data items as needed
  ];


}
