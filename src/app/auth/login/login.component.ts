import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../common.css', './login.component.css']
})
export class LoginComponent {
  
  showPassword: boolean = false;
  // Add your form group and form control if needed.
  // Example: formGroup: FormGroup = new FormGroup({ password: new FormControl('') });

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}

