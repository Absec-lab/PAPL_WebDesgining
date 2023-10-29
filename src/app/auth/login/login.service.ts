import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private Http: HttpClient) { }

  // save getAllAgreementType
	login(params: any): Observable<any> {
		let serviceUrl = environment.serviceURL + 'users/login';
		let serviceRes = this.Http.post(serviceUrl, params);
		return serviceRes;
	}
}
