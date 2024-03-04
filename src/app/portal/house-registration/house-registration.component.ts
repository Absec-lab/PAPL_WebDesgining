import { Component, OnInit } from "@angular/core";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { PortalServiceService } from "../serviceapi/portal-service.service";
import { Subject, takeUntil } from "rxjs";
import { ValidatorchklistService } from "../serviceapi/validatorchklist.service";
import { NgxUiLoaderService } from "ngx-ui-loader";
import Swal from "sweetalert2";
import { ExcelService } from "../serviceapi/excel.service";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { startWith, map } from "rxjs/operators";
import { Observable } from "rxjs";
import * as FileSaver from "file-saver";

@Component({
  selector: "app-home-registration",
  templateUrl: "./house-registration.component.html",
  styleUrls: ["../../common.css", "./house-registration.component.css"],
})
export class HouseRegistrationComponent implements OnInit {
  updatebtn: boolean = false;
  enableAddStateArray: boolean = false;
  selectedProducts: any[];
  tableData: any = [];
  allData: any = [];
  duplicateTableData: any[] = [];
  stateDtails: any;
  houseRegistrationForm!: FormGroup;
  stateForm!: FormGroup;
  activeSBU: any = [];
  stateId: any;
  activePlant: any = [];
  sbuId: any;
  allHouseDetails: any = [];
  allOwner: any;
  private destroy$ = new Subject<void>();
  currentDate: Date = new Date();
  houseId: any = "";
  mapId: any = "";
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];
  errorMessageForHouseMapping: any = "";
  ownerNameControl = new FormControl();
  filteredOwners: Observable<any[]>;
  searchInput: string = "";
  constructor(
    private portalService: PortalServiceService,
    private formBuilder: FormBuilder,
    public vldChkLst: ValidatorchklistService,
    private ngxLoader: NgxUiLoaderService,
    private excelService: ExcelService
  ) {}
  // Handle selection from the autocomplete list
  onOwnerNameSelected(event: MatAutocompleteSelectedEvent): void {
    // Do something with the selected owner
    console.log(event.option.value);
  }
  private _filterOwners(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.allOwner.filter((owner) =>
      owner.ownerName.toLowerCase().includes(filterValue)
    );
  }

  ngOnInit(): void {
    this.getAllStateList();
    this.getAllHouseDetailList();
    this.filteredOwners = this.ownerNameControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filterOwners(value))
    );

    this.houseRegistrationForm = this.formBuilder.group({
      ownerName: [0, [Validators.required, Validators.min(1)]],
      houseName: ["", Validators.required],
      noOfRooms: [
        "",
        [Validators.required, Validators.pattern("^[1-9]{1,2}$")],
      ],
      electricBill: ["", Validators.required],
      waterBill: ["", Validators.required],
      address: ["", Validators.required],
      address2: [""],
      district: ["", Validators.required],
      pin: ["", Validators.required],
      startDate: ["", [Validators.required, this.dateTimeValidator.bind(this)]],
      endDate: [""],
    });

    this.stateForm = this.formBuilder.group({
      stateSub: this.formBuilder.array([]),
    });

    this.addstate();
    this.getAllOwner();
    this.initFormValidators();
  }

  enableStateAddArrayOnclick() {
    Swal.fire({
      title: "Do you want to proceed ?",
      icon: "info",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result["isConfirmed"]) {
        this.enableAddStateArray = true;
        // Put your function here
      }
    });
  }

  trimString(s: any) {
    var l = 0,
      r = s.length - 1;
    while (l < s.length && s[l] == " ") l++;
    while (r > l && s[r] == " ") r -= 1;
    return s.substring(l, r + 1);
  }

  compareObjects(o1: any, o2: any) {
    var k = "";
    for (k in o1) if (o1[k] != o2[k]) return false;
    for (k in o2) if (o1[k] != o2[k]) return false;
    return true;
  }

  itemExists(haystack: any, needle: any) {
    for (var i = 0; i < haystack.length; i++)
      if (this.compareObjects(haystack[i], needle)) return true;
    return false;
  }
  searchGlobal(searchString: any) {
    let toSearch = this.trimString(searchString.value); // trim it
    if (toSearch.length) {
      var results: any = this.allData.filter((o: any) => {
        return Object.keys(o).some((k: any) => {
          if (o[k]) {
            return o[k]
              .toString()
              .toLowerCase()
              ?.includes(toSearch.toLowerCase());
          }
        });
      });
      this.allHouseDetails = results;
    } else {
      this.allHouseDetails = this.allData;
    }
  }
  initFormValidators(): void {
    // Add validators for the stateForm controls as needed
    // this.stateArray.controls.forEach((control: FormGroup) => {
    //   control.get('stateId')?.setValidators([Validators.required, Validators.min(1)]);
    //   control.get('sbuId')?.setValidators([Validators.required, Validators.min(1)]);
    //   control.get('plantId')?.setValidators([Validators.required, Validators.min(1)]);
    // });
    this.stateArray.controls.forEach((control: FormGroup) => {
      control.get("stateId")?.setValidators([Validators.required]);
      control.get("stateId")?.updateValueAndValidity();
      control.get("sbuId")?.setValidators([Validators.required]);
      control.get("sbuId")?.updateValueAndValidity();
      control.get("plantId")?.setValidators([Validators.required]);
      control.get("plantId")?.updateValueAndValidity();
    });
  }
  dateTimeValidator(control: FormControl): { [key: string]: boolean } | null {
    const selectedDateTime: Date = new Date(control.value);

    // if (selectedDateTime < this.currentDate) {
    //   // alert('selectedDateTime'+selectedDateTime+'this.currentDate'+this.currentDate)
    //   return { 'pastDateTime': true };
    // }

    return null;
  }
  updateMinEndDate(): void {
    const startDateInput = document.getElementById(
      "startDate"
    ) as HTMLInputElement;
    if (startDateInput) {
      const startDateValue = startDateInput.value;
      // Set the minimum allowed value for the end date to the selected start date
      document.getElementById("endDate")?.setAttribute("min", startDateValue);
      // Ensure the end date is always greater than or equal to the start date
      if (this.houseRegistrationForm.value.startDate < startDateValue) {
        this.houseRegistrationForm.value.endDate = startDateValue;
      }
    }
  }

  handleNumericInput(): void {
    const control = this.houseRegistrationForm.get("noOfRooms");
    if (control && control.value) {
      // Keep only the first two digits
      control.setValue(control.value.toString().slice(0, 2), {
        emitEvent: false,
      });
    }
  }

  getAllOwner() {
    //this.ngxLoader.start();
    this.portalService
      .get("PAPL/getAllOwner")
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        console.log(res);
        this.allOwner = res.data;
        this.ngxLoader.stop();
      });
  }

  get stateArray(): any {
    return this.stateForm.get("stateSub") as FormArray;
  }
  // getPreviousRowValues(index: number): any {
  //   if (index > 0) {
  //     const previousRow = this.stateArray.at(index - 1).value;
  //     return {
  //       stateId: previousRow.stateId,
  //       sbuId: previousRow.sbuId,
  //       plantId: previousRow.plantId,
  //       mapId: previousRow.mapId,
  //       houseId: previousRow.houseId,
  //     };
  //   }
  //   return {};
  // }

  // addstate() {
  //   const stateGroup = this.formBuilder.group({
  //     // stateId: [this.stateId],
  //     // sbuId: [0, [Validators.required, Validators.min(1)]],
  //     // plantId: [0, [Validators.required, Validators.min(1)]],
  //     // mapId: [0, [Validators.required, Validators.min(1)]],
  //     // houseId: [0, [Validators.required, Validators.min(1)]],
  //     stateId: [this.stateId, [Validators.required]],
  //     sbuId: ['', [Validators.required]],
  //     plantId: ['', [Validators.required]],
  //     mapId: ['', [Validators.required]],
  //     houseId: ['', [Validators.required]],
  //   });

  //   // stateGroup.get('stateId')?.setValidators([Validators.required, Validators.min(1)]);
  //   // stateGroup.get('sbuId')?.setValidators([Validators.required, Validators.min(1)]);
  //   // stateGroup.get('plantId')?.setValidators([Validators.required, Validators.min(1)]);
  //   // stateGroup.get('mapId')?.setValidators([Validators.required, Validators.min(1)]);
  //   // stateGroup.get('houseId')?.setValidators([Validators.required, Validators.min(1)]);
  //   stateGroup.get('stateId')?.setValidators([Validators.required]);
  //   stateGroup.get('stateId')?.updateValueAndValidity();
  //   stateGroup.get('sbuId')?.setValidators([Validators.required]);
  //   stateGroup.get('sbuId')?.updateValueAndValidity();

  //   stateGroup.get('plantId')?.setValidators([Validators.required]);
  //   stateGroup.get('plantId')?.updateValueAndValidity();

  //   stateGroup.get('mapId')?.setValidators([Validators.required]);
  //   stateGroup.get('mapId')?.updateValueAndValidity();

  //   stateGroup.get('houseId')?.setValidators([Validators.required]);
  //   stateGroup.get('houseId')?.updateValueAndValidity();
  //   const previousValues = this.getPreviousRowValues(this.stateArray.length);
  // stateGroup.patchValue(previousValues); // Use patchValue to set the previous values

  // Object.keys(stateGroup.controls).forEach(controlName => {
  //   stateGroup.get(controlName)?.updateValueAndValidity();
  // });
  //   this.stateArray.push(stateGroup);
  // }
  trtxx = true;
  addstate(index?: any) {
    if (index >= 0 && !this.stateArray.controls[0]?.value?.stateId) {
      Swal.fire("select state");
      return;
    }
    const stateGroup = this.formBuilder.group({
      stateId: [
        this.stateArray.controls[0]?.value
          ? this.stateArray.controls[0]?.value?.stateId
          : "",
        [Validators.required],
      ],
      sbuId: ["", [Validators.required]],
      plantId: ["", [Validators.required]],
      mapId: [""],
      houseId: [""],
    });
    if (index >= 0 && this.stateArray.controls[0]?.value?.stateId) {
      this.onAddNewStateArray(
        this.stateArray.controls[0]?.value?.stateId,
        index
      );
    }

    // Set validators for each control
    // Object.keys(stateGroup.controls).forEach((controlName) => {
    //   stateGroup.get(controlName)?.setValidators([Validators.required]);
    //   stateGroup.get(controlName)?.updateValueAndValidity();
    // });

    // Populate the new row with values from the previous row or empty values
    // const previousValues = this.getPreviousRowValues(this.stateArray.length);
    // stateGroup.patchValue(previousValues);

    // Add the new row to the form array
    this.stateArray.push(stateGroup);
  }

  // getPreviousRowValues(rowIndex: number): any {
  //   if (rowIndex > 0) {
  //     const previousRow = this.stateArray.at(rowIndex - 1).value;
  //     return {
  //       stateId: previousRow.stateId,
  //       sbuId: previousRow.sbuId,
  //       plantId: previousRow.plantId,
  //       mapId: previousRow.mapId,
  //       houseId: previousRow.houseId,
  //     };
  //   } else {
  //     return {
  //       stateId: '',
  //       sbuId: '',
  //       plantId: '',
  //       mapId: '',
  //       houseId: '',
  //     }; // Return an object with empty values for the first row
  //   }
  // }

  // Inside your component class

  removeState(index: number) {
    this.stateArray.removeAt(index);
  }

  getAllStateList(data?: any) {
    // this.ngxLoader.start();
    this.portalService.get("PAPL/getAllState").subscribe(async (res) => {
      this.stateDtails = res;
      if (data) {
        await this.getSubonStateChange(data.stateId, 0, data);
      }
      this.ngxLoader.stop();
      //console.log(res)
    });
  }

  getAllHouseDetailList() {
    // this.ngxLoader.start();
    this.portalService.get("PAPL/getAllHouse").subscribe((res) => {
      this.allHouseDetails = res;
      this.ngxLoader.stop();
      console.log(this.allHouseDetails);
      console.log("tabledata", res);
      this.tableData = res.data;
      this.allData = res;
      this.duplicateTableData = res.data;
    });
  }

  onAddNewStateArray(selectedStateId: any, index: any) {
    this.portalService
      .get(`PAPL/get/sbu/by/${selectedStateId}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.activeSBU[index + 1] = res;
        this.ngxLoader.stop();
      });
  }
  // Update your component code
  async getSubonStateChange(event: any, index: number, data?: any) {
    const selectedStateId = event?.target?.value ? event?.target?.value : event;
    this.portalService
      .get(`PAPL/get/sbu/by/${selectedStateId}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe(async (res) => {
        this.activeSBU[index] = res;
        if (data) {
          const stateGroup = this.stateArray.at(0);
          stateGroup.patchValue({
            stateId: data.stateId,
            sbuId: data.sbuId,
          });
          await this.getPlantOnSubChange(data.sbuId, 0, data);
        }
        this.ngxLoader.stop();
      });
  }

  getPlantOnSubChange(event: any, index: number, data?: any) {
    // this.activePlant = [];
    const selectedSublocation = event?.target?.value
      ? event?.target?.value
      : event;
    // this.sbuId =selectedSublocation ;
    // this.ngxLoader.start();
    this.portalService
      .get(`PAPL/get/plant/by/${selectedSublocation}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.activePlant[index] = res;
        this.ngxLoader.stop();
        console.log("active plan", this.activePlant);
        if (data) {
          if (selectedSublocation) {
            setTimeout(() => {
              const stateGroup = this.stateArray.at(0);
              stateGroup.patchValue({
                sbuId: data.sbuId,
              });
            }, 100);
            setTimeout(() => {
              const stateGroup = this.stateArray.at(0);
              stateGroup.patchValue({
                plantId: data.plantId,
                mapId: data.mapId,
                houseId: data.houseId,
              });
            }, 200);
          }
        }
      });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getAllHouseDetailList();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllHouseDetailList();
  }

  validateData() {
    //debugger;
    const formControls = [
      {
        control: this.houseRegistrationForm.get("ownerName"),
        name: "Owner Name",
      },
      {
        control: this.houseRegistrationForm.get("houseName"),
        name: "House Name",
      },
      {
        control: this.houseRegistrationForm.get("noOfRooms"),
        name: "Number of Rooms",
      },
      {
        control: this.houseRegistrationForm.get("electricBill"),
        name: "Electric Bill",
      },
      {
        control: this.houseRegistrationForm.get("waterBill"),
        name: "Water Bill",
      },
      { control: this.houseRegistrationForm.get("address"), name: "Address" },
      { control: this.houseRegistrationForm.get("district"), name: "District" },
      {
        control: this.houseRegistrationForm.get("startDate"),
        name: "Start Date",
      },
    ];

    let vSts = true;

    for (const formControl of formControls) {
      if (formControl.control?.valid) {
        formControl.control.markAsTouched();
        vSts = true;
      } else {
        formControl.control?.markAsTouched();
        vSts = true; //validation issues need to fixed

        // Focus on the first invalid input field
        if (formControl.control) {
          const element = formControl.control?.parent?.getRawValue();
          if (element) {
            Object.keys(element).forEach((key) => {
              if (
                element[key] === formControl.control?.parent?.getRawValue()[key]
              ) {
                const el = document.getElementsByName(key)[0];
                if (el) {
                  el.focus();
                }
              }
            });
          }
        }
        break;
      }
    }
    if (!vSts) {
      this.errorMessageForHouseMapping =
        "Kindly fill the all the field for House Registration";
    }

    return vSts;
  }

  // validateData() {
  //   const formControls = [
  //     { control: this.houseRegistrationForm.get('ownerName'), name: "Owner Name" },
  //     { control: this.houseRegistrationForm.get('houseName'), name: "House Name" },
  //     { control: this.houseRegistrationForm.get('noOfRooms'), name: "Number of Rooms" },
  //     { control: this.houseRegistrationForm.get('electricBill'), name: "Electric Bill" },
  //     { control: this.houseRegistrationForm.get('waterBill'), name: "Water Bill" },
  //     { control: this.houseRegistrationForm.get('address'), name: "Address" },
  //     { control: this.houseRegistrationForm.get('district'), name: "District" },
  //     { control: this.houseRegistrationForm.get('startDate'), name: "Start Date" },
  //   ];

  //   let vSts = true;

  //   for (const formControl of formControls) {
  //     if (formControl.control?.valid) {
  //       formControl.control.markAsTouched();
  //     } else {
  //       formControl.control?.markAsTouched();
  //       vSts = false;

  //       if (formControl.name === "House Name" && this.isHouseNameNotUnique()) {
  //         this.errorMessageForHouseMapping = "House No/Name must be unique";
  //       } else {
  //         // Focus on the first invalid input field
  //         if (formControl.control) {
  //           const element = formControl.control?.parent?.getRawValue();
  //           if (element) {
  //             Object.keys(element).forEach(key => {
  //               if (element[key] === formControl.control?.parent?.getRawValue()[key]) {
  //                 const el = document.getElementsByName(key)[0];
  //                 if (el) {
  //                   el.focus();
  //                 }
  //               }
  //             });
  //           }
  //         }
  //         break;
  //       }
  //     }
  //   }

  //   return vSts;
  // }

  isHouseNameNotUnique(): boolean {
    // Perform uniqueness check for House Name
    const enteredHouseName = this.houseRegistrationForm.get("houseName")?.value;
    const duplicateHouseName = this.allHouseDetails.some(
      (house) => house.houseName === enteredHouseName
    );
    return duplicateHouseName;
  }
  validateAllFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormArray) {
        control.markAsTouched();
      }
      if (control instanceof FormControl) {
        control.markAsTouched({
          onlySelf: true,
        });
      } else if (control instanceof FormGroup) {
        this.validateAllFields(control);
      }
    });
  }
  registerHouse() {
    this.stateArray.controls.forEach((control: FormGroup) => {
      control.get("houseId")?.clearValidators();
      control.get("houseId")?.updateValueAndValidity();
      control.get("mapId")?.clearValidators();
      control.get("mapId")?.updateValueAndValidity();
    });
    if (this.stateForm.invalid) {
      this.validateAllFields(this.stateForm);
      return;
    }

    let vSts = this.validateData();
    console.log(vSts);
    console.log(this.houseRegistrationForm.valid);
    //console.log(this.houseRegistrationForm.value.plantId);
    if (vSts) {
      let data = {
        ownerId: this.houseRegistrationForm.value.ownerName,
        houseName: this.houseRegistrationForm.value.houseName,
        address: this.houseRegistrationForm.value.address,
        address2: this.houseRegistrationForm.value.address2,
        district: this.houseRegistrationForm.value.district,
        pinCode: this.houseRegistrationForm.value.pin,
        noOfRooms: this.houseRegistrationForm.value.noOfRooms,
        noOfEleBills: this.houseRegistrationForm.value.electricBill,
        noOfWtrBills: this.houseRegistrationForm.value.waterBill,
        startDate: this.houseRegistrationForm.value.startDate,
        endDate: this.houseRegistrationForm.value.endDate,
        houseRegistrationMapDto: this.stateArray.value,
      };
      this.ngxLoader.start();
      this.portalService.post("PAPL/addHouses", data).subscribe(
        (res) => {
          this.ngxLoader.stop();
          this.getAllHouseDetailList();
          this.houseRegistrationForm.reset();
          this.stateArray.clear();
          this.addstate();
          this.errorMessageForHouseMapping = "";
          Swal.fire({
            icon: "success",
            text: "Record Saved Successfully",
          }).then(() => {
            this.getAllHouseDetailList();
          });
        },
        (error) => {
          this.getAllHouseDetailList();
          this.ngxLoader.stop();
        }
      );
    }
  }

  async updateHouse(item: any) {
    // window.scrollTo({ top: 0, behavior: "smooth" });
    // this.houseRegistrationForm.
    this.stateArray.reset();
    console.log(item);
    this.updatebtn = true;
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
      endDate: item.endDate,
    });

    this.addstate();
    if (this.stateArray.length !== 0) {
      this.stateArray.removeAt(0);
    }
    await this.getAllStateList(item);

    //

    // stateGroup.patchValue({
    //   stateId: item.stateId,
    //   sbuId: item.sbuId,
    //   plantId: item.plantId,
    //   mapId: item.mapId,
    //   houseId: item.houseId,
    // });

    // const stateId = document.querySelectorAll("#stateId");
    // for (let i = 0; i < stateId.length; i++) {
    //   stateId[i].dispatchEvent(new Event("change"));
    // }
    // const sbuId = document.querySelectorAll("#sbuId");
    // for (let i = 0; i < sbuId.length; i++) {
    //   sbuId[i].dispatchEvent(new Event("change"));
    // }
    // const plantId = document.querySelectorAll("#plantId");
    // for (let i = 0; i < plantId.length; i++) {
    //   plantId[i].dispatchEvent(new Event("change"));
    // }

    this.houseId = item.houseId;
    this.mapId = item.mapId;
  }

  cancelUpdate() {
    // Reset the form and any related variables or arrays
    this.houseRegistrationForm.reset();
    this.stateArray.clear();
    this.addstate();

    // Reset the update flag if needed
    this.updatebtn = false;
  }

  updateHouseForm() {
    let vSts = this.validateData();
    console.log(vSts);
    console.log(this.houseRegistrationForm.valid);
    console.log(this.stateArray.valid);
    if (vSts) {
      if (
        this.stateId !== null &&
        this.sbuId !== null &&
        this.houseId !== null &&
        this.mapId !== null
      ) {
        let data = {
          houseId: this.houseId,
          mapId: this.mapId,
          ownerId: this.houseRegistrationForm.value.ownerId,
          houseName: this.houseRegistrationForm.value.houseName,
          address: this.houseRegistrationForm.value.address,
          address2: this.houseRegistrationForm.value.address2,
          district: this.houseRegistrationForm.value.district,
          pinCode: this.houseRegistrationForm.value.pin,
          noOfRooms: this.houseRegistrationForm.value.noOfRooms,
          noOfEleBills: this.houseRegistrationForm.value.electricBill,
          noOfWtrBills: this.houseRegistrationForm.value.waterBill,
          startDate: this.houseRegistrationForm.value.startDate,
          endDate: this.houseRegistrationForm.value.endDate,
          houseRegistrationMapDto: this.stateArray.value,
        };

        console.log(data);
        console.log(this.stateArray.value);
        //this.ngxLoader.start();
        this.portalService.put("PAPL/updateHouse", data).subscribe((res) => {
          //this.ngxLoader.stop();
          console.log(res);
          this.updatebtn = false;

          this.getAllHouseDetailList();
          this.houseRegistrationForm.reset();
          this.stateArray.clear();
          this.addstate();

          Swal.fire({
            icon: "success",
            text: "Record Updated Successfully",
          }).then(() => {
            window.location.reload();
          });
          this.updatebtn = false;

          // alert("House Registration succcesfull")
        });
        // }
      } else {
        console.error("houseId is null");
      }
    }
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
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      cancelButtonColor: "#df1141",
    }).then((result) => {
      if (result.isConfirmed) {
        //this.ngxLoader.start();
        this.portalService.removeHouse(id).subscribe(
          (res) => {
            this.ngxLoader.stop();
            if (res) {
              Swal.fire({
                icon: "success",
                text: "Record Deleted Successfully",
              });
              this.getAllHouseDetailList();
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

    //   this.portalService.removeHouse(id).subscribe(res => {
    //     if(res) {
    //       alert("House Deactivated !")
    //     }
    //     this.getAllHouseDetailList();

    //  });
  }

  onClick() {
    // Your button click logic here
    alert("Deleted Successfully!!");
  }

  exportPdf() {
    const head = [["SL no.", "ownerName", "phoneNo", "address"]];
    const doc = new jsPDF("l", "mm", "a4");
    autoTable(doc, {
      head: head,
      body: this.toPdfFormat(),
      didDrawCell: (data) => {},
    });
    doc.save("house-owner.pdf");
  }
  toPdfFormat() {
    let data: any = [];
    for (var i = 0; i < this.tableData.length; i++) {
      data.push([
        i + 1,
        this.tableData[i].ownerName,
        this.tableData[i].phoneNo,
        this.tableData[i].address1,
      ]);
    }
    return data;
  }
  exportExcel() {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.tableData);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      this.saveAsExcelFile(excelBuffer, "houser-owner");
    });
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    let EXCEL_EXTENSION = ".xlsx";
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
    );
  }
}
