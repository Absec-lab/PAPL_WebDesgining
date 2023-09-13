import { Component } from '@angular/core';

@Component({
  selector: 'app-agreement-type-master',
  templateUrl: './agreement-type-master.component.html',
  styleUrls: ['../../common.css','./agreement-type-master.component.css']
})
export class AgreementTypeMasterComponent {
  tableData = [
    { SL_NO: 1, Agreement_Type: 'Agreement_1', Description: 'with_ele',Start_Date:'02/08/2023',End_Date:'02/09/2023',Created_Date:'11/08/2023', Action:''},
    { SL_NO: 2, Agreement_Type: 'Agreement_2', Description: 'Jharsuguda',Start_Date:'02/08/2023',End_Date:'02/09/2023',Created_Date:'11/08/2023', Action:''},
    { SL_NO: 3, Agreement_Type: 'Agreement_3', Description: 'Rourkela',Start_Date:'02/08/2023',End_Date:'02/09/2023',Created_Date:'11/08/2023', Action:''},
    
    // Add more data items as needed
  ];

  onClick() {
    // Your button click logic here
    alert('Deleted Successfully!!');
  }
  onClick1() {
    // Your button click logic here
    alert('Save Successfully!!');
  }
}
