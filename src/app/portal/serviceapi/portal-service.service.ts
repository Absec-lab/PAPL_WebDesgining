import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PortalServiceService {

  constructor(private Http: HttpClient) { }

  // get getAllAgreementType list
	getAllAgreementType(params: any): Observable<any> {
		let serviceUrl = environment.serviceURL + 'PAPL/getAllAgreementType';
		let serviceRes = this.Http.get(serviceUrl, {params});
		return serviceRes;
	}
  // save getAllAgreementType
	addAgreementType(params: any): Observable<any> {
		let serviceUrl = environment.serviceURL + 'PAPL/addAgreementType';
		let serviceRes = this.Http.post(serviceUrl, params);
		return serviceRes;
	}
  // update getAllAgreementType
	updateAgreementType(params: any): Observable<any> {
		let serviceUrl = environment.serviceURL + 'PAPL/updateAgreementType';
		let serviceRes = this.Http.put(serviceUrl, params);
		return serviceRes;
	}
  // save getAllAgreementType
	deleteAgreementType(params: any): Observable<any> {
		let serviceUrl = environment.serviceURL + 'deactivate/AgreementType';
		let serviceRes = this.Http.get(serviceUrl, {params});
		return serviceRes;
	}
}
