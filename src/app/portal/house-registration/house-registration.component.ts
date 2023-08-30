import { Component } from '@angular/core';

@Component({
  selector: 'app-home-registration',
  templateUrl: './house-registration.component.html',
  styleUrls: ['../../common.css','./house-registration.component.css']
})
export class HouseRegistrationComponent {
  tableData = [
    { SL_NO: 1, Unit_No: 'ROOM_1', Occupied: '5',Available:'5', Action:''},
    
    // Add more data items as needed
  ];
}
