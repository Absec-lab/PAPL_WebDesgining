import { Component } from '@angular/core';

@Component({
  selector: 'app-home-registration',
  templateUrl: './home-registration.component.html',
  styleUrls: ['../../common.css','./home-registration.component.css']
})
export class HomeRegistrationComponent {
  tableData = [
    { SL_NO: 1, Unit_No: 'ROOM 1', Occupied: '5',Available:'5', Action:''},
    
    // Add more data items as needed
  ];
}
