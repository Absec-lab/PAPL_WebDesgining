import { Component, ElementRef, OnInit } from '@angular/core';
import { PortalServiceService } from '../serviceapi/portal-service.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-utility-calculation',
  templateUrl: './utility-calculation.component.html',
  styleUrls: ['../../common.css','./utility-calculation.component.css']
})
export class UtilityCalculationComponent implements OnInit {
  utilityCalculation!: FormGroup;
  stateDtails: any = [];
  
  constructor(private portalservice: PortalServiceService,private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.getAllStateList()
    this.utilityCalculation = this.formBuilder.group({
     state: ['',Validators.required],
      sbu: ['',Validators.required],
      plant: ['',Validators.required],
      houseId: ['',Validators.required],
      startDate: ['',Validators.required],
      endDate: ['',Validators.required],
      miscExp:[''],
      miscBill:[''],
      miscrecept:[''],
      hrexp:[''],
      hrbill:[''],
      hrrecept:[''],
      electricbill: this.formBuilder.array([]),
      waterbill: this.formBuilder.array([]),
    });
   this.getAllUtilityCalc()
   this. addelectric();
   this.addwater();
  }

  get electric(): FormArray {
    return this.utilityCalculation.get('electricbill') as FormArray;
  }

  addelectric() {
    const stateGroup = this.formBuilder.group({
      elebillexpn: [''],
      billupload: [''],
      receiptupload: [''],
      // Add more form controls as needed
    });

    this.electric.push(stateGroup);
  }

  removeelectric(index: number) {
    this.electric.removeAt(index);
  }

  get water(): FormArray {
    return this.utilityCalculation.get('waterbill') as FormArray;
  }

  addwater() {
    const stateGroup = this.formBuilder.group({
      waterbillexpn: [''],
      waterbillupload: [''],
      waterreceiptupload: [''],
      // Add more form controls as needed
    });

    this.water.push(stateGroup);
  }

  removewater(index: number) {
    this.water.removeAt(index);
  }

  getAllStateList() {
    this.portalservice.get('PAPL/getAllState')
    .subscribe((res)=>{
      this.stateDtails = res
      //console.log(res)
    })
  }
  private destroy$ = new Subject<void>();
  activeSBU:any= [];
  stateId:any;
  getSubonStateChange(event: any) {
    this.activeSBU = [];
    const selectedStateId = event.target.value;
    this.stateId = selectedStateId;
  
    this.portalservice.get(`PAPL/get/sbu/by/${selectedStateId}`)
    .pipe(takeUntil(this.destroy$)) 
    .subscribe((res) => {
      this.activeSBU = res;
      //console.log(res);
    });
  }
  activePlant:any= [];
  sbuId:any;
  getPlantOnSubChange(event:any) {

    this.activePlant = [];
    const selectedSublocation = event.target.value;
    this.sbuId = selectedSublocation;

    this.portalservice.get(`PAPL/get/plant/by/${selectedSublocation}`)
    .pipe(takeUntil(this.destroy$))
    .subscribe((res)=>{
      this.activePlant = res;
     // console.log("active plan", this.activePlant)
    })

  }
  activeHouse:any= [];
  plantId:any;
  getHouseByPlantId(event:any) {
    this.activeHouse = [];
    const selectedPlantId = event.target.value;
    this.plantId = selectedPlantId;

    this.portalservice.get(`PAPL/get/house/by/${selectedPlantId}`)
    .pipe(takeUntil(this.destroy$))
    .subscribe((res)=>{
      this.activeHouse = res;
     // console.log("active plan", this.activeHouse)
    })
  }
  


  tableData:any
  onClick() {
    // Your button click logic here
    alert('Deleted Successfully!!');
  }
  onClick1() {
    // Your button click logic here
    alert('Save Successfully!!');
  }

  getAllUtilityCalc() {
    this.portalservice.get('PAPL/getAllUtilityCalculation')
    .subscribe(res => {
      this.tableData = res.data
      console.log( this.tableData )
    })
  }

  onImageChange1  (event: any, formControlName: string, formArrName?: string, index?: number): void {
		const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
		const file = inputElement.files[0];
	  
		if (file) {
	  
		  const reader = new FileReader();
		  reader.onload = (e) => {
			// Set the image form control's value to the file
      
		  };
		  reader.readAsDataURL(file);
      if(formArrName){
        this.utilityCalculation.value[formControlName].at(index).setValue(file);
      } else{
        console.log(this.utilityCalculation);
        
        this.utilityCalculation.get(formControlName)?.setValue(file);
      }
		  }
    }
    console.log(this.utilityCalculation.value);
    
	}


  onImageChange(event: any, formControlName: string, formArrName?: string, index?: number): void {
    console.log("formControlName",formControlName);
    
    const inputElement = event.target as HTMLInputElement;
  
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
     
      if (file) {
        const reader = new FileReader();
  
        reader.onload = (e) => {
          const imageDataUrl = e.target?.result as string;
          console.log(imageDataUrl);
          
          if (formArrName && index !== undefined) {
            // Update image value in a FormArray at a specific index
            const formArray = this.utilityCalculation.get(formArrName) as FormArray;
  
            if (formArray && index >= 0 && index < formArray.length) {
              const formGroup = formArray.at(index) as FormGroup;
              formGroup.get(formControlName)?.setValue(imageDataUrl);
            }
          } else {
            // Update image value in a regular FormControl
            const formControl = this.utilityCalculation.get(formControlName);
  
            if (formControl) {
              formControl.setValue(imageDataUrl);
            }
          }
        };
  
        reader.readAsDataURL(file);
      }
    }
    console.log(this.utilityCalculation);
    
  }
  


    postUtilityCalc() {
     if(this.utilityCalculation.valid) {
      let data = {
        "utilityCalculationData": {
          "fkStateId": this.utilityCalculation.value.state,
          "fkSbuId":  this.utilityCalculation.value.sbu,
          "fkPlantId":  this.utilityCalculation.value.plant,
          "fkHouseId":  this.utilityCalculation.value.houseId,
          "startDate": this.utilityCalculation.value.startDate,
          "endDate":  this.utilityCalculation.value.endDate
          
        },
        "utilityCalculationHRExpenseDto": {
          "hrExpenseAmt":  this.utilityCalculation.value.hrexp,
          "hrBillDoc":  this.utilityCalculation.value.hrbill,
          "hrrecDoc":  this.utilityCalculation.value.hrrecept,
          "fileExt": "jpg"
        },
        "utilityCalculationMiscDto": {
          "miscExpenseAmt":  this.utilityCalculation.value.miscExp,
          "miscBillDoc": this.utilityCalculation.value.miscBill,
          "miscRecDoc":  this.utilityCalculation.value.miscrecept,
          "fileExt": "jpg"
        },
        "utilityCalculationElectricDto": this.electric.value,
        "utilityCalculationWaterDto":this.water.value,
      }
      console.log(data)
      this.portalservice.post("PAPL/calculate",data)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res=> {
        console.log(res);
        this. getAllUtilityCalc()
        alert("calculation saved successfully")
      })
     } else {
      alert("Please Enter Required fields !")
     }
    }


}
