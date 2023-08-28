import { Component } from '@angular/core';

@Component({
  selector: 'app-agreement-master',
  templateUrl: './agreement-master.component.html',
  styleUrls: ['../../common.css','./agreement-master.component.css']
})
export class AgreementMasterComponent {
  
  tableData = [
    { SL_NO: 1, Unit_No: 'ROOM 1', Occupied: '5',Available:'5', Action:''},
    
    // Add more data items as needed
  ];
}
