import { Component } from '@angular/core';

@Component({
  selector: 'app-utility-calculation',
  templateUrl: './utility-calculation.component.html',
  styleUrls: ['../../common.css','./utility-calculation.component.css']
})
export class UtilityCalculationComponent {
  
  tableData = [
    { SL_NO: 1, Unit_No: 'ROOM 1', Occupied: '5',Available:'5', Action:''},
    
    // Add more data items as needed
  ];

}
