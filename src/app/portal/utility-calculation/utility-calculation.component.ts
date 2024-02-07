import { Component, ElementRef, OnInit } from "@angular/core";
import { PortalServiceService } from "../serviceapi/portal-service.service";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import { ValidatorchklistService } from "../serviceapi/validatorchklist.service";
import { NgxUiLoaderService } from "ngx-ui-loader";
import Swal from "sweetalert2";
import { ExcelService } from "../serviceapi/excel.service";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: "app-utility-calculation",
  templateUrl: "./utility-calculation.component.html",
  styleUrls: ["../../common.css", "./utility-calculation.component.css"],
})
export class UtilityCalculationComponent implements OnInit {
  utilityCalculation!: FormGroup;
  tableData: any = [];
  duplicateTableData: any[] = [];
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];
  stateDtails: any = [];
  updatebtn: boolean = false;
  constructor(
    private ngxLoader: NgxUiLoaderService,
    public validateService: ValidatorchklistService,
    private portalService: PortalServiceService,
    private formBuilder: FormBuilder,
    private excelService: ExcelService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getAllStateList();
    this.utilityCalculation = this.formBuilder.group({
      state: ["", Validators.required],
      sbu: ["", Validators.required],
      plant: ["", Validators.required],
      houseId: ["", Validators.required],
      startDate: ["", Validators.required],
      endDate: ["", Validators.required],
      miscExp: [""],
      miscBill: [""],
      miscrecept: [""],
      hrexp: [""],
      hrbill: [""],
      hrrecept: [""],
      hrrecFileExt: [""],
      hrbillFileExt: [""],
      misbillFileExt: [""],
      misrecFileExt: [""],
      electricbill: this.formBuilder.array([]),
      waterbill: this.formBuilder.array([]),
    });
    this.getAllUtilityCalc();
    this.addelectric();
    this.addwater();
  }

  get electric(): FormArray {
    return this.utilityCalculation.get("electricbill") as FormArray;
  }

  addelectric() {
    const stateGroup = this.formBuilder.group({
      eleExpenseAmt: [""],
      eleBillDoc: [""],
      eleRecDoc: [""],
      billFileExt: [""],
      recFileExt: [""],
    });

    this.electric.push(stateGroup);
  }

  removeelectric(index: number) {
    this.electric.removeAt(index);
  }

  get water(): FormArray {
    return this.utilityCalculation.get("waterbill") as FormArray;
  }

  addwater() {
    const stateGroup = this.formBuilder.group({
      waterExpenseAmount: [""],
      waterBilldoc: [""],
      waterRecDoc: [""],
      billFileExt: [""],
      recFileExt: [""],
    });

    this.water.push(stateGroup);
  }

  removewater(index: number) {
    this.water.removeAt(index);
  }

  getAllStateList() {
    this.portalService.get("PAPL/getAllState").subscribe((res) => {
      this.stateDtails = res;
      //console.log(res)
    });
  }
  private destroy$ = new Subject<void>();
  activeSBU: any = [];
  stateId: any;
  getSubonStateChange(event: any) {
    this.activeSBU = [];
    const selectedStateId = 1//event.target.value;
    this.stateId = selectedStateId;

    this.portalService
      .get(`PAPL/get/sbu/by/${selectedStateId}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.activeSBU = res;
        //console.log(res);
      });
  }
  activePlant: any = [];
  sbuId: any;
  getPlantOnSubChange(event: any) {
    this.activePlant = [];
    const selectedSublocation = 1//event.target.value;
    this.sbuId = selectedSublocation;

    this.portalService
      .get(`PAPL/get/plant/by/${selectedSublocation}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.activePlant = res;
        // console.log("active plan", this.activePlant)
      });
  }
  activeHouse: any = [];
  plantId: any;
  getHouseByPlantId(event: any) {
    this.activeHouse = [];
    const selectedPlantId = 1//event.target.value;
    this.plantId = selectedPlantId;

    this.portalService
      .get(`PAPL/get/house/by/${selectedPlantId}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.activeHouse = res;
        // console.log("active plan", this.activeHouse)
      });
  }

  onClick() {
    // Your button click logic here
    alert("Deleted Successfully!!");
  }
  onClick1() {
    // Your button click logic here
    alert("Save Successfully!!");
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getAllUtilityCalc();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllUtilityCalc();
  }
  getAllUtilityCalc() {
    this.portalService.get("PAPL/getAllUtilityCalculation").subscribe((res) => {
      this.getAllUtilityCalc = res.data;
      this.tableData = res.data;
      console.log(this.getAllUtilityCalc);
      this.duplicateTableData = res.data;
    });
  }

  onImageChange(
    event: any,
    formControlName: string,
    formArrName?: string,
    index?: number
  ): void {
    console.log("formControlName", formControlName);

    const inputElement = event.target as HTMLInputElement;

    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];

      if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          const imageDataUrl = e.target?.result as string;
          const base64Content = imageDataUrl.split(",")[1];
          console.log(base64Content);

          const fileExtension = this.getFileExtension(file.type);
          const extn = "." + fileExtension;

          if (formArrName && index !== undefined) {
            // Update image value in a FormArray at a specific index
            const formArray = this.utilityCalculation.get(
              formArrName
            ) as FormArray;

            if (formArray && index >= 0 && index < formArray.length) {
              const formGroup = formArray.at(index) as FormGroup;
              formGroup.get(formControlName)?.setValue(base64Content);
              if (formControlName == "waterBilldoc") {
                formGroup.get("billFileExt")?.setValue(extn);
              } else if (formControlName == "waterRecDoc") {
                formGroup.get("recFileExt")?.setValue(extn);
              } else if (formControlName == "eleBillDoc") {
                formGroup.get("billFileExt")?.setValue(extn);
              } else if (formControlName == "eleRecDoc") {
                formGroup.get("recFileExt")?.setValue(extn);
              }
            }
          } else {
            // Update image value in a regular FormControl
            const formControl = this.utilityCalculation.get(formControlName);

            if (formControl) {
              formControl.setValue(base64Content);
              if (formControlName == "miscBill") {
                this.utilityCalculation.get("misbillFileExt")?.setValue(extn);
              } else if (formControlName == "miscrecept") {
                this.utilityCalculation.get("misrecFileExt")?.setValue(extn);
              } else if (formControlName == "hrbill") {
                this.utilityCalculation.get("hrbillFileExt")?.setValue(extn);
              } else if (formControlName == "hrrecept") {
                this.utilityCalculation.get("hrrecFileExt")?.setValue(extn);
              }
            }
          }
        };

        reader.readAsDataURL(file);
      }
    }
    //console.log(this.utilityCalculation);
  }

  getFileExtension(mimeType: string): string {
    const types: { [key: string]: string } = {
      "image/jpeg": "jpg",
      "image/png": "png",
      "application/pdf": "pdf",
      // Add more as needed
    };

    return types[mimeType] || "unknown";
  }

  postUtilityCalc() {
    if (
      this.utilityCalculation.valid 
    ) {
      let data = {
        utilityCalculationData: {
          fkStateId: this.utilityCalculation.value.state,
          fkSbuId: this.utilityCalculation.value.sbu,
          fkPlantId: this.utilityCalculation.value.plant,
          fkHouseId: this.utilityCalculation.value.houseId,
          startDate: this.utilityCalculation.value.startDate,
          endDate: this.utilityCalculation.value.endDate,
          createdDate: "",
        },
        utilityCalculationHRExpenseDto: {
          hrExpenseAmt: this.utilityCalculation.value.hrexp,
          hrBillDoc: this.utilityCalculation.value.hrbill,
          hrrecDoc: this.utilityCalculation.value.hrrecept,
          recFileExt: this.utilityCalculation.value.hrrecFileExt,
          billFileExt: this.utilityCalculation.value.hrbillFileExt,
        },
        utilityCalculationMiscDto: {
          miscExpenseAmt: this.utilityCalculation.value.miscExp,
          miscBillDoc: this.utilityCalculation.value.miscBill,
          miscRecDoc: this.utilityCalculation.value.miscrecept,
          billFileExt: this.utilityCalculation.value.misbillFileExt,
          recFileExt: this.utilityCalculation.value.misrecFileExt,
        },
        utilityCalculationElectricDto: this.electric.value,
        utilityCalculationWaterDto: this.water.value,
        //  "utilityCalculationElectricDto": [
        //   {
        //     "eleExpenseAmt": this.electric.value.eleExpenseAmt,
        //     "eleBillDoc": "iVBORw0KGgoAAAANSUhEUgAAAzgAAAMACAYAAADopcJCAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA",
        //   "eleRecDoc": "iVBORw0KGgoAAAANSUhEUgAAAzgAAAMACAYAAADopcJCAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAA",
        //   "billFileExt": ".png",
        //     "recFileExt": ".png"
        //   }
        // ],
        // "utilityCalculationWaterDto": [
        //   {
        //     "waterExpenseAmount": this.water.value.waterExpenseAmount,
        //     "waterBilldoc": "iVBORw0KGgoAAAANSUhEUgAAAzgAAAMACAYAAADopcJCAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJ",
        //   "waterRecDoc": "iVBORw0KGgoAAAANSUhEUgAAAzgAAAMACAYAAADopcJCAAAAAXNSR0IArs4c6QAAAARnQU1BAA",
        //   "billFileExt": ".png",
        //     "recFileExt": ".png"
        //   }
        // ]
      };
      //console.log(data)
      this.portalService
        .post("PAPL/calculate", data)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {
          //this.ngxLoader.stop();
          //console.log('data',res);
          Swal.fire({
            icon: "success",
            text: "Calculation Saved Successfully",
          });
          window.location.reload();
          this.getAllUtilityCalc();
          // alert("calculation saved successfully")
          // alert("calculation saved successfully")
        });
      // this.utilityCalculation.reset();
      // window.location.reload();
    } else {
      //this.markFormGroupTouched(this.utilityCalculation);
      //this.markFormArrayControlsTouched(this.electric);
      //this.markFormArrayControlsTouched(this.water);
      this.scrollToTop();
      // alert("Please Enter Required fields !")
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      // If the control is a nested form group, mark its controls as touched recursively
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  markFormArrayControlsTouched(formArray: FormArray) {
    formArray.controls.forEach((control) => {
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
    window.scrollTo({ top: 0, behavior: "smooth" });

    this.updatebtn = true;
    console.log(item);
    this.utilityCalculation.patchValue({
      state: item.fkStateId,
      sbu: item.fkSbuId,
      plant: item.fkPlantId,
      houseId: item.fkHouseId,
      startDate: item.startDate,
      endDate: item.endDate,
      // hrexp:item.hrExpenseAmt,
      // miscExp: item.miscExpenseAmount,
      // eleExpenseAmt: item.eleExpenseAmount,
      // waterExpenseAmount: item.waterExpenseAmount,
      hrexp:item.hrExpenseAmount,
      miscExp: item.miscExpenseAmount,
      eleExpenseAmt: item.eleExpenseAmount,
      waterExpenseAmount: item.waterExpenseAmount,
      
      
      //miscBill:item.miscExpenseAmount,
      //miscrecept:item.miscrecept,
      //hrbill:item.eleExpenseAmount,
      //hrrecept:item.hrrecept,
      //hrrecFileExt:item.hrrecFileExt,
      //hrbillFileExt:item.hrbillFileExt,
      //misbillFileExt:item.misbillFileExt,
      //misrecFileExt:item.item.misrecFileExt,
      //electricbill: this.formBuilder.array([]),
      //waterbill: this.formBuilder.array([]),
    });

    setTimeout(() => {
      this.getSubonStateChange(item.fkStateId);
      this.getPlantOnSubChange(item.fkSbuId);
    });

    setTimeout(() => {
      const state = document.querySelectorAll("#state");
      for (let i = 0; i < state.length; i++) {
        state[i].dispatchEvent(new Event("change"));
      }
    }, 1010);
    setTimeout(() => {
      const sbu = document.querySelectorAll("#sbu");
      for (let i = 0; i < sbu.length; i++) {
        sbu[i].dispatchEvent(new Event("change"));
      }
    }, 2010);
    setTimeout(() => {
      const plant = document.querySelectorAll("#plant");
      for (let i = 0; i < plant.length; i++) {
        plant[i].dispatchEvent(new Event("change"));
      }
    }, 3010);
    setTimeout(() => {
      const houseId = document.querySelectorAll("#houseId");
      for (let i = 0; i < houseId.length; i++) {
        houseId[i].dispatchEvent(new Event("change"));
      }
    }, 4010);
  }

  updateUtilityCalc() {
    //if(this.utilityCalculation.valid  && this.electric.valid && this.water.valid) {
    let data = {
      utilityCalculationData: {
        fkStateId: this.utilityCalculation.value.state,
        fkSbuId: this.utilityCalculation.value.sbu,
        fkPlantId: this.utilityCalculation.value.plant,
        fkHouseId: this.utilityCalculation.value.houseId,
        startDate: this.utilityCalculation.value.startDate,
        endDate: this.utilityCalculation.value.endDate,
        createdDate: "",
      },
      utilityCalculationHRExpenseDto: {
        hrExpenseAmt: this.utilityCalculation.value.hrexp,
        hrBillDoc: this.utilityCalculation.value.hrbill,
        hrrecDoc: this.utilityCalculation.value.hrrecept,
        recFileExt: this.utilityCalculation.value.hrrecFileExt,
        billFileExt: this.utilityCalculation.value.hrbillFileExt,
      },
      utilityCalculationMiscDto: {
        miscExpenseAmt: this.utilityCalculation.value.miscExp,
        miscBillDoc: this.utilityCalculation.value.miscBill,
        miscRecDoc: this.utilityCalculation.value.miscrecept,
        billFileExt: this.utilityCalculation.value.misbillFileExt,
        recFileExt: this.utilityCalculation.value.misrecFileExt,
      },
      utilityCalculationElectricDto: this.electric.value,
      utilityCalculationWaterDto: this.water.value,
    };
    console.log(data);
    this.portalService
      .post("PAPL/updatecalculation", data)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.ngxLoader.stop();
        //console.log(res);
        Swal.fire({
          icon: "success",
          text: "Utility Calculation Update Successfully",
        });
        this.getAllUtilityCalc();
        alert("calculation saved successfully");
        //alert("calculation saved successfully")
      });
    this.utilityCalculation.reset;

    // } else {
    // this.markFormGroupTouched(this.utilityCalculation);
    //this.markFormArrayControlsTouched(this.electric);
    // this.markFormArrayControlsTouched(this.water);
    // this.scrollToTop();
    // alert("Please Enter Required fields !")
    //}
  }

  removeUtilityCalc(id: any) {
    Swal.fire({
      text: "Are you sure you want to Delete the details?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      cancelButtonColor: "#df1141",
    }).then((result) => {
      if (result.isConfirmed) {
        // this.ngxLoader.start();
        this.portalService
          .get(`deactivate/calculation?id=${id}`)
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            (res) => {
              this.ngxLoader.stop();
              if (res.responseCode == 200) {
                Swal.fire({
                  icon: "success",
                  text: "Record Deleted Successfully",
                });
                this.getAllUtilityCalc();
              } else {
                Swal.fire({
                  icon: "error",
                  text: res.message,
                });
              }
            },
            (error) => {
              this.ngxLoader.stop();
              Swal.fire({
                icon: "error",
                text: "Error",
              });
            }
          );
      }
    });
  }

  //         Swal.fire({
  //           //icon: 'warning',
  //           text: "Are you sure you want to Delete the details?",
  //           showCancelButton: true,
  //           confirmButtonText: 'Yes',
  //           cancelButtonText: 'No',
  //           cancelButtonColor: '#df1141'
  //         }).then((result) => {
  //           if (result.isConfirmed) {

  //             this.ngxLoader.start();
  //             this.portalService.removeUtilityCalc(id).subscribe(res => {
  //               this.ngxLoader.stop();
  //               if (res) {
  //                 Swal.fire({
  //                   icon: 'success',
  //                   text: 'Record Deleted Successfully'
  //                 });
  //                 this.getAllUtilityCalc();
  //               } else {
  //                 Swal.fire({
  //                   icon: 'error',
  //                   text: res.message
  //                 });
  //               }
  //             }, error => {
  //               this.ngxLoader.stop();
  //               Swal.fire({
  //                 icon: 'error',
  //                 text: 'Error'
  //               });
  //             });
  //           }
  //         });

  //   this.portalService.removeHouse(id).subscribe(res => {
  //     if(res) {
  //       alert("House Deactivated !")
  //     }
  //     this.getAllHouseDetailList();

  //  });
  exportAsXLSX(): void {
    debugger;
    let removeColumnData = [
      "unitId",
      "houseId",
      "locationId",
      "plantId",
      "stateId",
      "",
    ];
    let Heading = [
      [
        "State",
        "SBU",
        "Plant",
        "House Name	",
        "HR EXP	",
        "MISC EXP",
        "ELE EXP	",
        "WTR EXP	",
        "Start Date	",
        "End Date",
        "Created Date",
      ],
    ];
    removeColumnData.forEach((e) => {
      this.duplicateTableData.forEach((element) => {
        delete element[e];
      });
    });
    this.excelService.exportAsExcelFile(
      this.duplicateTableData,
      "utilityCalculation",
      Heading
    );
  }


  showHouseData(houseName: string, fkHouseId: number) {
    const apiUrl = `http://206.189.142.35:9090/PAPL/getAlldataUnitwise?house_id=${fkHouseId}`;
  
    this.http.get(apiUrl)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (response: any) => {
          const data = response; 
          console.log(data,"houseData");
          if (response && response.length > 0) {
            const data = response[0]; 
            Swal.fire({
              title: `Data for ${houseName}`,
              html: `
                <div style="text-align: left;">
                  <p><strong>House Name:</strong> ${houseName}</p>
                  <p><strong>Unit No:</strong> ${data.unitNo}</p>
                  <p><strong>Electric Expense Amount:</strong> ${data.eleExpenseAmount}</p>
                  <p><strong>HR Expense Amount:</strong> ${data.hrExpenseAmount}</p>
                  <p><strong>Misc Expense Amount:</strong> ${data.miscExpenseAmount}</p>
                  <p><strong>Water Expense Amount:</strong> ${data.waterExpenseAmount}</p>
                </div>
              `,
              // icon: 'info'
            });
          } else {
            console.error('Invalid response format:', response);
            Swal.fire({
              title: 'Data Not Available',
              // text: 'Invalid response format',
              icon: 'error'
            });
          }
        },
        (error) => {
          console.error('Error fetching data:', error);
          Swal.fire({
            title: 'Error',
            text: 'Failed to fetch data from the API',
            icon: 'error'
          });
        }
      );
  }
  
  
  
}
