import { Component } from '@angular/core';

@Component({
  selector: 'app-agreement-type-master',
  templateUrl: './agreement-type-master.component.html',
  styleUrls: ['../../common.css','./agreement-type-master.component.css']
})
export class AgreementTypeMasterComponent {
  tableData = [
    { SL_NO: 1, Unit_No: 'ROOM 1', Occupied: '5',Available:'5', Action:''},
    
    // Add more data items as needed
  ];

}
