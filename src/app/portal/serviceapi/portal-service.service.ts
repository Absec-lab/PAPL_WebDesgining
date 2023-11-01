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
  	// update getAllAgreementType
	  updateAgreement(params: any): Observable<any> {
		let serviceUrl = environment.serviceURL + 'PAPL/updateAgreement';
		let serviceRes = this.Http.put(serviceUrl, params);
		return serviceRes;
	}
  	// delete getAllAgreementType
	deleteAgreementType(params: any): Observable<any> {
		let serviceUrl = environment.serviceURL + 'deactivate/AgreementType';
		let serviceRes = this.Http.get(serviceUrl, {params});
		return serviceRes;
	}
  	// delete getAllAgreement
	deleteAgreement(params: any): Observable<any> {
		let serviceUrl = environment.serviceURL + 'deactivate/Agreement';
		let serviceRes = this.Http.get(serviceUrl, {params});
		return serviceRes;
	}
  	//Get AllState
	getAllState(params: any): Observable<any> {
		let serviceUrl = environment.serviceURL + 'PAPL/getAllState';
		let serviceRes = this.Http.get(serviceUrl, {params});
		return serviceRes;
	}
  	//Get SBU
	getAllSbu(params: any): Observable<any> {
		let serviceUrl = environment.serviceURL + 'PAPL/getAllSbu';
		let serviceRes = this.Http.get(serviceUrl, {params});
		return serviceRes;
	}
  	//Get PLANT
	getAllPlant(params: any): Observable<any> {
		let serviceUrl = environment.serviceURL + 'PAPL/getAllPlant';
		let serviceRes = this.Http.get(serviceUrl, {params});
		return serviceRes;
	}
  	//Get All Owner
	getAllOwner(params: any): Observable<any> {
		let serviceUrl = environment.serviceURL + 'PAPL/getAllOwner';
		let serviceRes = this.Http.get(serviceUrl, {params});
		return serviceRes;
	}
  	//Get All getAllAgreement
	getAllAgreement(params: any): Observable<any> {
		let serviceUrl = environment.serviceURL + 'PAPL/getAllAgreement';
		let serviceRes = this.Http.get(serviceUrl, {params});
		return serviceRes;
	}
	// save Agreement
	addAgreement(params: any): Observable<any> {
		let serviceUrl = environment.serviceURL + 'PAPL/addAgreement';
		let serviceRes = this.Http.post(serviceUrl, params);
		return serviceRes;
	}
	// save Units
	addUnits(params: any): Observable<any> {
		let serviceUrl = environment.serviceURL + 'PAPL/addUnits';
		let serviceRes = this.Http.post(serviceUrl, params);
		return serviceRes;
	}
	//Get All Houses by plant id
	getAllHousesByPlantId(params: any): Observable<any> {
		let serviceUrl = environment.serviceURL + 'PAPL/get/house/by/1';
		let serviceRes = this.Http.get(serviceUrl, {params});
		return serviceRes;
	}
	//Get All Units
	getAllUnit(params: any): Observable<any> {
		let serviceUrl = environment.serviceURL + 'PAPL/getAllUnit';
		let serviceRes = this.Http.get(serviceUrl, {params});
		return serviceRes;
	}
	// delete getAllAgreement
	deleteUnit(params: any): Observable<any> {
		let serviceUrl = environment.serviceURL + 'deactivate/Unit';
		let serviceRes = this.Http.get(serviceUrl, {params});
		return serviceRes;
	}
	// delete Owner
	deleteOwner(params: any): Observable<any> {
		let serviceUrl = environment.serviceURL + 'deactivate/Owner';
		let serviceRes = this.Http.get(serviceUrl, {params});
		return serviceRes;
	}
	// save Owners
	addOwners(params: any): Observable<any> {
		let serviceUrl = environment.serviceURL + 'PAPL/addOwners';
		let serviceRes = this.Http.post(serviceUrl, params);
		return serviceRes;
	}

	//get api global method 

	get(url:any):Observable<any> {
		let res = this.Http.get(environment.serviceURL+url)
		return res
	}
	
}
