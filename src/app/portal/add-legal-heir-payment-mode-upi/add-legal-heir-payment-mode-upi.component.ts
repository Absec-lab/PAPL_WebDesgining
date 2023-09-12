import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  onClick1() {
    // Your button click logic here
    alert('Add Successfully!!');
  }
  isClicked = false;

  onClick2() {
    this.isClicked = true;
    // Your button click logic here
    alert('Save Successfully!!');
  }
  
  constructor(private router: Router) {}

  onPaymentModeChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;

    switch (selectedValue) {
      case '1':
        this.router.navigate(['/portal/add-legal-heir-payment-mode-bank-ac']);
        break;
        case '2':
        this.router.navigate(['/portal/add-legal-heir']);
        break;
        case '3':
        this.router.navigate(['/portal/add-legal-heir-payment-mode-upi']);
        break;
        case '4':
        this.router.navigate(['/portal/add-legal-heir-payment-mode-upi']);
        break;
      case '5':
        this.router.navigate(['/portal/add-legal-heir-payment-mode-upi']);
        break;
        case '6':
        this.router.navigate(['/portal/add-legal-heir-payment-mode-upi']);
        break;
      // Add more cases for other payment modes if needed
      
    }
  }
}
