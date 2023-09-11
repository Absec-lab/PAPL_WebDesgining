import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-house-owner-registration-payment-mode-bank-ac',
  templateUrl: './house-owner-registration-payment-mode-bank-ac.component.html',
  styleUrls: ['../../common.css','./house-owner-registration-payment-mode-bank-ac.component.css']
})
export class HouseOwnerRegistrationPaymentModeBankAcComponent {
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
  constructor(private router: Router) {}

  onPaymentModeChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;

    switch (selectedValue) {
      case '1':
        this.router.navigate(['/portal/house-owner-registration-payment-mode-bank-ac']);
        break;
        case '2':
        this.router.navigate(['/portal/house-owner-registration']);
        break;
        case '3':
        this.router.navigate(['/portal/house-owner-registration-payment-mode-upi']);
        break;
        case '4':
        this.router.navigate(['/portal/house-owner-registration-payment-mode-upi']);
        break;
      case '5':
        this.router.navigate(['/portal/house-owner-registration-payment-mode-upi']);
        break;
        case '6':
        this.router.navigate(['/portal/house-owner-registration-payment-mode-upi']);
        break;
      // Add more cases for other payment modes if needed
      
    }
  }
}
