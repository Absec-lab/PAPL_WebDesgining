import { Component,OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortalServiceService } from '../serviceapi/portal-service.service';
import { Subject, takeUntil } from 'rxjs';
import { ValidatorchklistService } from '../serviceapi/validatorchklist.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';

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
  allOwner:any;
  private destroy$ = new Subject<void>();
  
  constructor(private portalService:PortalServiceService,private formBuilder: FormBuilder , public vldChkLst: ValidatorchklistService,private ngxLoader: NgxUiLoaderService,) {
   
  }
 
 
  ngOnInit(): void {
    this.getAllStateList()
    this. getAllHouseDetailList()

    this.houseRegistrationForm = this.formBuilder.group({
      ownerName: [0,Validators.required],
      houseName:['',Validators.required],
      noOfRooms: ['', [Validators.required, Validators.pattern('^[0-9]{1,2}$')]],
      electricBill: ['',Validators.required],
      waterBill: ['',Validators.required],
      address: ['',Validators.required],
      address2: [''],
      district: ['',Validators.required],
      pin: [''],
      startDate: ['',Validators.required],
      endDate: ['']
    });

    this.stateForm = this.formBuilder.group({
      stateSub: this.formBuilder.array([]),
    });

    this.addstate()
    this.getAllOwner()
  }

  updateMinEndDate(): void {
    const startDateInput = document.getElementById('startDate') as HTMLInputElement;
    if (startDateInput) {
      const startDateValue = startDateInput.value;
      // Set the minimum allowed value for the end date to the selected start date
      document.getElementById('endDate')?.setAttribute('min', startDateValue);
      // Ensure the end date is always greater than or equal to the start date
      if (this.houseRegistrationForm.value.startDate < startDateValue) {
        this.houseRegistrationForm.value.endDate = startDateValue;
      }
    }
  }

  handleNumericInput(): void {
    const control = this.houseRegistrationForm.get('noOfRooms');
    if (control && control.value) {
      // Keep only the first two digits
      control.setValue(control.value.toString().slice(0, 2), { emitEvent: false });
    }
  
}
  
  getAllOwner() {
    this.ngxLoader.start();
    this.portalService.get("PAPL/getAllOwner")
    .pipe((takeUntil(this.destroy$)))
    .subscribe(res=>{
      console.log(res);
      this.allOwner = res.data;
      this.ngxLoader.stop();
    })
  }

  get stateArray() : any {
    return this.stateForm.get('stateSub') as FormArray;
  }

  addstate() {
    const stateGroup = this.formBuilder.group({
      stateId: ['',Validators.required],
      sbuId: ['',Validators.required],
      plantId: ['',Validators.required],
      // Add more form controls as needed
    });

    this.stateArray.push( stateGroup);
    console.log("ku6 nahi ho raha", this.stateArray);

    
  }

  removeState(index: number) {
    this.stateArray.removeAt(index);
  }

  getAllStateList() {
    this.ngxLoader.start();
    this.portalService.get('PAPL/getAllState')
    .subscribe((res)=>{
      this.stateDtails = res
      this.ngxLoader.stop();
      //console.log(res)
    })
  }

  getAllHouseDetailList() {
    this.ngxLoader.start();
    this.portalService.get('PAPL/getAllHouse')
    .subscribe((res)=>{
      this.allHouseDetails = res
      this.ngxLoader.stop();
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
  this.ngxLoader.start();
  this.portalService.get(`PAPL/get/sbu/by/${selectedStateId}`)
    .pipe(takeUntil(this.destroy$)) 
    .subscribe((res) => {
      this.activeSBU[index] = res;
      this.ngxLoader.stop();
    });
}


  getPlantOnSubChange(event:any,index:number) {

   // this.activePlant = [];
    const selectedSublocation = event.target.value;
    this.sbuId = selectedSublocation;
    this.ngxLoader.start();
    this.portalService.get(`PAPL/get/plant/by/${selectedSublocation}`)
    .pipe(takeUntil(this.destroy$))
    .subscribe((res)=>{
      this.activePlant[index] = res;
      this.ngxLoader.stop();
     // console.log("active plan", this.activePlant)
    })

  }

  validateData() {
    const formControls = [
      { control: this.houseRegistrationForm.get('ownerName'), name: "Owner Name" },
      { control: this.houseRegistrationForm.get('houseName'), name: "House Name" },
      { control: this.houseRegistrationForm.get('noOfRooms'), name: "Number of Rooms" },
      { control: this.houseRegistrationForm.get('electricBill'), name: "Electric Bill" },
      { control: this.houseRegistrationForm.get('waterBill'), name: "Water Bill" },
      { control: this.houseRegistrationForm.get('address'), name: "Address" },
      { control: this.houseRegistrationForm.get('district'), name: "District" },
      { control: this.houseRegistrationForm.get('startDate'), name: "Start Date" },
     
    ];
     
    let vSts = true;
  
    for (const formControl of formControls) {
      if(formControl.control?.valid) {
        vSts = true;
      } else {
        Swal.fire({
          // icon: 'error',
          text: `Please select ${formControl.name}`
        });
        vSts = false
        break;
      }
      
    }
   
    
    return vSts;
  }
  

  registerHouse(){
    let vSts = this.validateData();
    console.log(vSts);
    console.log(this.houseRegistrationForm.valid);
   // console.log(this.stateArray.valid);
    if(vSts) {
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
      this.ngxLoader.start();
      this.portalService.post("PAPL/addHouses",data)
      .subscribe((res)=>{
        this.ngxLoader.stop();
        console.log(res)
        this. getAllHouseDetailList()
        this.houseRegistrationForm.reset()
        this.stateArray.clear()
        this.addstate()
        Swal.fire({
          icon: 'success',
          text: 'Record Saved Successfully'
        });
       // alert("House Registration succcesfull")
      })
    }
  }

  updateHouse(item:any) {
    console.log(item)
    this.houseRegistrationForm.patchValue({
      ownerName: item.ownerName,
      houseName: item.houseName,
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

  // removeHouse(id:any) {
  //   this.ngxLoader.start();
  //   this.portalService.delete(`PAPL/get/sbu/by/${id}`)
  //   .pipe(takeUntil(this.destroy$)) 
  //   .subscribe((res) => {
  //     this.getAllHouseDetailList()
  //     this.ngxLoader.stop();
  //   });

  removeHouse(id: any = 0) {


    Swal.fire({
      //icon: 'warning',
      text: "Are you sure you want to Delete the details?",
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      cancelButtonColor: '#df1141'
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.ngxLoader.start();
        this.portalService.removeHouse(id).subscribe(res => {  
          this.ngxLoader.stop();
          if (res) {
            Swal.fire({
              icon: 'success',
              text: 'Record Deleted Successfully'
            });
            this.getAllHouseDetailList();
          } else {
            Swal.fire({
              icon: 'error',
              text: res.message
            });
          }
        }, error => {
          this.ngxLoader.stop();
          Swal.fire({
            icon: 'error',
            text: 'Error'
          });
        });
      }
    });




    //   this.portalService.removeHouse(id).subscribe(res => {  
    //     if(res) {
    //       alert("House Deactivated !")
    //     }
    //     this.getAllHouseDetailList();
            
    //  }); 

  }

  onClick() {
    // Your button click logic here
    alert('Deleted Successfully!!');
  }
}
