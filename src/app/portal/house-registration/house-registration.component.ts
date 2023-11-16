import { Component,OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortalServiceService } from '../serviceapi/portal-service.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home-registration',
  templateUrl: './house-registration.component.html',
  styleUrls: ['../../common.css','./house-registration.component.css']
})
export class HouseRegistrationComponent implements OnInit {

  stateDtails:any;
  houseRegistrationForm!: FormGroup;
  stateForm!: FormGroup;
  activeSBU:any = [];
  stateId:any;
  activePlant:any = [];
  sbuId:any;
  allHouseDetails:any=[];

  private destroy$ = new Subject<void>();
  
  constructor(private portalService:PortalServiceService,private formBuilder: FormBuilder) {
   
  }
 
 
  ngOnInit(): void {
    this.getAllStateList()
    this. getAllHouseDetailList()

    this.houseRegistrationForm = this.formBuilder.group({
      ownerName: [''],
      noOfRooms: [''],
      electricBill: [''],
      waterBill: [''],
      address: [''],
      address2: [''],
      district: [''],
      pin: [''],
      startDate: [''],
      endDate: ['']
    });

    this.stateForm = this.formBuilder.group({
      stateSub: this.formBuilder.array([]),
    });

    this.addstate()
   
  }

  get stateArray() : any {
    return this.stateForm.get('stateSub') as FormArray;
  }

  addstate() {
    const stateGroup = this.formBuilder.group({
      state: [''],
      sbu: [''],
      plant: [''],
      // Add more form controls as needed
    });

    this.stateArray.push(stateGroup);
    console.log("ku6 nahi ho raha", this.stateArray);

    
  }

  removeState(index: number) {
    this.stateArray.removeAt(index);
  }

  getAllStateList() {
    this.portalService.get('PAPL/getAllState')
    .subscribe((res)=>{
      this.stateDtails = res
      //console.log(res)
    })
  }

  getAllHouseDetailList() {
    this.portalService.get('PAPL/getAllHouse')
    .subscribe((res)=>{
      this.allHouseDetails = res
      console.log(this.allHouseDetails)
    })
  }

  // Update your component code
getSubonStateChange(event: any, index: number) {
 // this.activeSBU = [];
  const selectedStateId = event.target.value;
  this.stateId = selectedStateId;

  // Use the index to target the specific form control
  const stateGroup = this.stateArray.at(index);
  this.stateArray

  this.portalService.get(`PAPL/get/sbu/by/${selectedStateId}`)
    .pipe(takeUntil(this.destroy$)) 
    .subscribe((res) => {
      this.activeSBU[index] = res;
    });
}


  getPlantOnSubChange(event:any,index:number) {

   // this.activePlant = [];
    const selectedSublocation = event.target.value;
    this.sbuId = selectedSublocation;

    this.portalService.get(`PAPL/get/plant/by/${selectedSublocation}`)
    .pipe(takeUntil(this.destroy$))
    .subscribe((res)=>{
      this.activePlant[index] = res;
     // console.log("active plan", this.activePlant)
    })

  }

  registerHouse(){
    let data =  {
      "ownerId":  this.houseRegistrationForm.value.ownerName,
       "address": this.houseRegistrationForm.value.address,
       "address2": this.houseRegistrationForm.value.address2,
       "district":this.houseRegistrationForm.value.district,
      "pinCode": this.houseRegistrationForm.value.pin,
      "noOfRooms": this.houseRegistrationForm.value.noOfRooms,
      "noOfEleBills": this.houseRegistrationForm.value.electricBill,
      "noOfWtrBills": this.houseRegistrationForm.value.waterBill,
      "startDate": this.houseRegistrationForm.value.startDate,
      "endDate": this.houseRegistrationForm.value.endDate,
      "houseRegistrationMapDto": this.stateArray.value,
    }
    console.log(data);
    console.log(this.stateArray.value)
    
    this.portalService.post("PAPL/addHouses",data)
    .subscribe((res)=>{
      console.log(res)
      this. getAllHouseDetailList()
      this.houseRegistrationForm.reset()
      this.stateArray.clear()
      this.addstate()
      alert("House Registration succcesfull")
    })
  }

  updateHouse(item:any) {
    console.log(item)
    this.houseRegistrationForm.patchValue({
      ownerName: [''],
      noOfRooms: item.noOfUnits,
      electricBill: item.noOfEleBills,
      waterBill: item.noOfWtrBills,
      address: item.address,
      address2: item.address2,
      district: item.district,
      pin: item.pinCode,
      startDate: item.startDate,
      endDate: item.endDate
    })
    this.getSubonStateChange(item.stateId,0)
    this.getPlantOnSubChange( item.sbuId,0)

    const dataToPatch = {
      state:item.stateId,
      sbu: item.sbuId,
      plant: item.plantId,
      // Add more properties as needed
    };
  
    // Check if the index is valid
    
      this.stateArray.at(0).patchValue(dataToPatch);
    
  }

  removeHouse(id:any) {
    this.portalService.get(`PAPL/get/sbu/by/${id}`)
    .pipe(takeUntil(this.destroy$)) 
    .subscribe((res) => {
      this.getAllHouseDetailList()
    });
  }

  onClick() {
    // Your button click logic here
    alert('Deleted Successfully!!');
  }
}
