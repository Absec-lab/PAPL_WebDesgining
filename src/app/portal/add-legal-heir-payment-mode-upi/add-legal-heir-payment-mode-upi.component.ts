import { Component } from '@angular/core';

@Component({
  selector: 'app-add-legal-heir-payment-mode-upi',
  templateUrl: './add-legal-heir-payment-mode-upi.component.html',
  styleUrls: ['../../common.css','./add-legal-heir-payment-mode-upi.component.css']
})
export class AddLegalHeirPaymentModeUPIComponent  {
  tableData = [
    { SL_NO: 1, House_Owner_Name: 'Rajesh Das', Phone_no: '9988776654',Address:'Balianta,bhadrak',Govt_ID:'2345_6754_6754' ,Account_Number:'3317065432' ,IFSC_Code:'PNB004456',PAN_Card:'MJHG00786',Start_Date:'08/08/2023',End_Date:'18/07/2025', Action:''},
    { SL_NO: 1, House_Owner_Name: 'Rajesh Das', Phone_no: '9988776654',Address:'Balianta,bhadrak',Govt_ID:'2345_6754_6754' ,Account_Number:'3317065432' ,IFSC_Code:'PNB004456',PAN_Card:'MJHG00786',Start_Date:'08/08/2023',End_Date:'18/07/2025', Action:''},
    { SL_NO: 1, House_Owner_Name: 'Rajesh Das', Phone_no: '9988776654',Address:'Balianta,bhadrak',Govt_ID:'2345_6754_6754' ,Account_Number:'3317065432' ,IFSC_Code:'PNB004456',PAN_Card:'MJHG00786',Start_Date:'08/08/2023',End_Date:'18/07/2025', Action:''},
    
    // Add more data items as needed
  ];
  onClick() {
    // Your button click logic here
    alert('Deleted Successfully!!');
  }
}
