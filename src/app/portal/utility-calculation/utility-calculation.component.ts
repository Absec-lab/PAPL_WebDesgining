import { Component, ElementRef, OnInit } from '@angular/core';
import { PortalServiceService } from '../serviceapi/portal-service.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ValidatorchklistService } from '../serviceapi/validatorchklist.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-utility-calculation',
  templateUrl: './utility-calculation.component.html',
  styleUrls: ['../../common.css','./utility-calculation.component.css']
})
export class UtilityCalculationComponent implements OnInit {
  utilityCalculation!: FormGroup;
  stateDtails: any = [];
  updatebtn: boolean = false;
  constructor(private ngxLoader: NgxUiLoaderService, public validateService: ValidatorchklistService, private portalservice: PortalServiceService,private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.getAllStateList()
    this.utilityCalculation = this.formBuilder.group({
     state: ['',Validators.required],
      sbu: ['',Validators.required],
      plant: ['',Validators.required],
      houseId: ['',Validators.required],
      startDate: ['',Validators.required],
      endDate: ['',Validators.required],
      miscExp:['',Validators.required],
      miscBill:['',Validators.required],
      miscrecept:['',Validators.required],
      hrexp:['',Validators.required],
      hrbill:['',Validators.required],
      hrrecept:['',Validators.required],
      hrrecFileExt:[''],
      hrbillFileExt:[''],
      misbillFileExt:[''],
      misrecFileExt:[''],
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
      eleExpenseAmt:['', Validators.required],
      eleBillDoc:['', Validators.required] ,
      eleRecDoc:['', Validators.required] ,
      billFileExt: [''],
      recFileExt:['']
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

      waterExpenseAmount: ['', Validators.required],
      waterBilldoc: ['', Validators.required],
      waterRecDoc: ['', Validators.required],
      billFileExt: [''],
      recFileExt:['']
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


  onImageChange(event: any, formControlName: string, formArrName?: string, index?: number): void {
    console.log("formControlName",formControlName);
    
    const inputElement = event.target as HTMLInputElement;
  
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
     
      if (file) {
        const reader = new FileReader();
  
        reader.onload = (e) => {
          const imageDataUrl = e.target?.result as string;
          const base64Content = imageDataUrl.split(',')[1];
          console.log(base64Content);

          const fileExtension = this.getFileExtension(file.type);
          const extn = '.'+fileExtension
          
          if (formArrName && index !== undefined) {
            // Update image value in a FormArray at a specific index
            const formArray = this.utilityCalculation.get(formArrName) as FormArray;
  
            if (formArray && index >= 0 && index < formArray.length) {
              const formGroup = formArray.at(index) as FormGroup;
              formGroup.get(formControlName)?.setValue(base64Content);
              if(formControlName == 'waterBilldoc') {
                formGroup.get('billFileExt')?.setValue(extn)
              } else if(formControlName == 'waterRecDoc') {
                formGroup.get('recFileExt')?.setValue(extn)
              } else if(formControlName == 'eleBillDoc') {
                formGroup.get('billFileExt')?.setValue(extn)
              } else if(formControlName == 'eleRecDoc') {
                formGroup.get('recFileExt')?.setValue(extn)
              }
            }
          } else {
            // Update image value in a regular FormControl
            const formControl = this.utilityCalculation.get(formControlName);
  
            if (formControl) {
              formControl.setValue(base64Content);
              if(formControlName == 'miscBill') {
                this.utilityCalculation.get('misbillFileExt')?.setValue(extn)
              } else if(formControlName == 'miscrecept') {
                this.utilityCalculation.get('misrecFileExt')?.setValue(extn)
              } else if (formControlName == 'hrbill') {
                this.utilityCalculation.get('hrbillFileExt')?.setValue(extn)
              } else if(formControlName == 'hrrecept') {
                this.utilityCalculation.get('hrrecFileExt')?.setValue(extn)
              } 
            }
          }
        };
  
        reader.readAsDataURL(file);
      }
    }
    console.log(this.utilityCalculation);
    
  }

  getFileExtension(mimeType: string): string {
    const types: { [key: string]: string } = {
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'application/pdf': 'pdf',
      // Add more as needed
    };
  
    return types[mimeType] || 'unknown';
  }
  


    postUtilityCalc() {
     if(this.utilityCalculation.valid  && this.electric.valid && this.water.valid) {
      let data = {
        "utilityCalculationData": {
          "fkStateId": this.utilityCalculation.value.state,
          "fkSbuId":  this.utilityCalculation.value.sbu,
          "fkPlantId":  this.utilityCalculation.value.plant,
          "fkHouseId":  this.utilityCalculation.value.houseId,
          "startDate": this.utilityCalculation.value.startDate,
          "endDate":  this.utilityCalculation.value.endDate,
          "createdDate":'',
          
        },
        "utilityCalculationHRExpenseDto": {
          "hrExpenseAmt":  this.utilityCalculation.value.hrexp,
          "hrBillDoc":  this.utilityCalculation.value.hrbill,
          "hrrecDoc":  this.utilityCalculation.value.hrrecept,
          "recFileExt":this.utilityCalculation.value.hrrecFileExt ,
          "billFileExt":this.utilityCalculation.value.hrbillFileExt,
        },
        "utilityCalculationMiscDto": {
          "miscExpenseAmt":  this.utilityCalculation.value.miscExp,
          "miscBillDoc": this.utilityCalculation.value.miscBill,
          "miscRecDoc":  this.utilityCalculation.value.miscrecept,
          "billFileExt": this.utilityCalculation.value.misbillFileExt,
          "recFileExt":this.utilityCalculation.value.misrecFileExt,
        },
        "utilityCalculationElectricDto": this.electric.value,
        "utilityCalculationWaterDto":this.water.value,
      }
      console.log(data)
      this.portalservice.post("PAPL/calculate",data)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res=> {
        this.ngxLoader.stop();     
        //console.log(res);
        Swal.fire({
          icon: 'success',
          text: 'Calculation Saved Successfully'
        });
        this. getAllUtilityCalc()
        alert("calculation saved successfully")
         // alert("calculation saved successfully")
      })
     } else {
      this.markFormGroupTouched(this.utilityCalculation);
      this.markFormArrayControlsTouched(this.electric);
      this.markFormArrayControlsTouched(this.water);
      this.scrollToTop();
     // alert("Please Enter Required fields !")
     }
    }

    markFormGroupTouched(formGroup: FormGroup) {
      Object.values(formGroup.controls).forEach(control => {
        control.markAsTouched();
    
        // If the control is a nested form group, mark its controls as touched recursively
        if (control instanceof FormGroup) {
          this.markFormGroupTouched(control);
        }
      });
    }

    markFormArrayControlsTouched(formArray: FormArray) {
      formArray.controls.forEach(control => {
        if (control instanceof FormGroup) {
          this.markFormGroupTouched(control);
        }
      });
    }

    getCurrentDate(): string {
      const currentDate = new Date();
      return currentDate.toISOString().substring(0, 10);
    }


    scrollToTop(): void {
      window.scrollTo(0, 0);
    }
    updateUtilityCalcForm(item: any) {
      

      // let vSts = this.validateData();
      // console.log(vSts);
      // console.log(this.houseRegistrationForm.valid);
      // console.log(this.stateArray.valid);
      // if (vSts) {
      //   if (this.houseId !== null && this.mapId !== null) {
  
      //     let data = {
            // "houseId": this.houseId,
            // "mapId": this.mapId,
            // "ownerId": this.houseRegistrationForm.value.ownerName,
            // "houseName": this.houseRegistrationForm.value.houseName,
            // "address": this.houseRegistrationForm.value.address,
            // "address2": this.houseRegistrationForm.value.address2,
            // "district": this.houseRegistrationForm.value.district,
            // "pinCode": this.houseRegistrationForm.value.pin,
            // "noOfRooms": this.houseRegistrationForm.value.noOfRooms,
            // "noOfEleBills": this.houseRegistrationForm.value.electricBill,
            // "noOfWtrBills": this.houseRegistrationForm.value.waterBill,
            // "startDate": this.houseRegistrationForm.value.startDate,
            // "endDate": this.houseRegistrationForm.value.endDate,
            // "houseRegistrationMapDto": this.stateArray.value,
  
    //       }
  
    //       console.log(data);
    //       console.log(this.stateArray.value)
    //       this.ngxLoader.start();
    //       this.portalService.put("PAPL/updateHouse", data)
    //         .subscribe((res) => {
    //           this.ngxLoader.stop();
    //           console.log(res)
    //           this.updatebtn = false;
  
    //           this.getAllHouseDetailList()
    //           this.houseRegistrationForm.reset()
    //           this.stateArray.clear()
    //           this.addstate()
    //           Swal.fire({
    //             icon: 'success',
    //             text: 'Record Updated Successfully'
    //           }).then(() => {
    //             window.location.reload();
    
    //           });
    //           this.updatebtn = false;
  
    //           // alert("House Registration succcesfull")
    //         })
    //       // }
    //     }
    //     else {
    //       console.error("houseId is null");
    //     }
    //   }
  
   }
    
    updateUtilityCalc() {
      alert('Update Button Click')
       }
          removeUtilityCalc(id: any) {
      
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
                this.portalservice.removeUtilityCalc(id).subscribe(res => {
                  this.ngxLoader.stop();
                  if (res) {
                    Swal.fire({
                      icon: 'success',
                      text: 'Record Deleted Successfully'
                    });
                    this.getAllUtilityCalc();
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
        
            //  }); 
        
          }
}
