import { Component } from '@angular/core';

@Component({
  selector: 'app-home-owner-master',
  templateUrl: './house-owner-registration.component.html',
  styleUrls: ['../../common.css', './house-owner-registration.component.css']
})
export class HouseOwnerRegistrationComponent {
  tableData = [
    { SL_NO: 1, Unit_No: 'ROOM_1', Occupied: '5',Available:'5', Action:''},
    
    // Add more data items as needed
  ];
}
