import { Component } from '@angular/core';
import { ValidatorchklistService } from '../../portal/serviceapi/validatorchklist.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../common.css', './login.component.css']
})
export class LoginComponent {
  
  showPassword: boolean = false;
  username: any = '';
  password: any = '';
  isLoggedIn: boolean = false;
  // Add your form group and form control if needed.
  // Example: formGroup: FormGroup = new FormGroup({ password: new FormControl('') });

  constructor(private ngxLoader: NgxUiLoaderService, private route: Router, private httpClient: HttpClient, public vldChkLst: ValidatorchklistService, public loginService: LoginService) { }
  ngOnInit(): void {
    this.isLoggedIn = (sessionStorage.getItem('isLoggedIn') == 'true') ? true : false;
    if(this.isLoggedIn){
      this.route.navigate(['/portal/agreement-type-master']);
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  login(){
    let vSts = true;
    if (!this.vldChkLst.blankCheck(this.username, "Username")) {
      vSts = false;
    }
    else if (!this.vldChkLst.blankCheck(this.password, "Password")) {
      vSts = false;
    }
    else {
      vSts = true;
    }
    if(vSts == true){
      this.ngxLoader.start();
      let param = {
        'username' : this.username,
        'password' : this.password
      };
      this.loginService.login(param).subscribe(res => {
        if(res.responseCode == 1){
          this.ngxLoader.stop();
          sessionStorage.setItem('isLoggedIn', 'true');
          sessionStorage.setItem('loggedUsername', res.data.userId);
          sessionStorage.setItem('LoggedName', res.data.name);
          this.isLoggedIn = true;
          this.route.navigate(['/portal/agreement-type-master']);
          console.log(res);
        }else{
          this.ngxLoader.stop();
          Swal.fire({
            icon: 'error',
            text: res.message
          });
          sessionStorage.setItem('isLoggedIn', 'false');
        }
      }, error => {
        this.ngxLoader.stop();
        Swal.fire({
          icon: 'error',
          text: 'Server error happened!'
        });
      });
    }
  }
}

