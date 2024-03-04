import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { PortalServiceService } from "../serviceapi/portal-service.service";
import { Subject, takeUntil, forkJoin } from "rxjs";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ValidatorchklistService } from "../serviceapi/validatorchklist.service";
import { NgxUiLoaderService } from "ngx-ui-loader";
import Swal from "sweetalert2";
import { FormControl } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

// Import NgModel
import { NgModel } from "@angular/forms";

@Component({
  selector: "app-unit-booking",
  templateUrl: "./unit-booking.component.html",
  styleUrls: ["../../common.css", "./unit-booking.component.css"],
})
export class UnitBookingComponent implements OnInit {
  periodValue: string | undefined;
  startDate: string | undefined;
  endDate: string | undefined;

  employeeForm!: FormGroup;
  stateDtails: any = [];
  activeSBU: any = [];
  activePlant: any = [];
  activeHouse: any = [];
  activeUnitId: any = [];
  allemployeeDetails: any = [];

  stateId: any;
  sbuId: any;
  plantId: any;
  houseId: any;
  unitId: any;

  houseDetails: any = [];
  errorMessages: any = {
    aggrementType: "",
    aggreStDate: "",
    aggreEdDate: "",
  };

  private destroy$ = new Subject<void>();

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private ngxLoader: NgxUiLoaderService,
    private portalService: PortalServiceService,
    private formBuilder: FormBuilder,
    public vldChkLst: ValidatorchklistService
  ) {}

  ngOnInit(): void {
    this.getAllStateList();

    this.employeeForm = this.formBuilder.group({
      state: ["Choose State...", Validators.required],
      sbuId: ["", Validators.required],
      plantId: ["", Validators.required],
      empId: ["", Validators.required],
      empName: ["", Validators.required],
      emailId: ["", Validators.required],
      mobileNo: ["", Validators.required],
      bookStartDate: ["", Validators.required],
      bkEndDate: ["", Validators.required],
      selectPeriod: [""],
      plantName: ["", Validators.required],
      serviceOrder: [""],
      endDate: [""],
    });
  }

  getAllStateList() {
    this.portalService.get("PAPL/getAllState").subscribe((res) => {
      this.stateDtails = res;
      //console.log(res)
    });
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  getSubonStateChange(event: any) {
    this.activeSBU = [];
    const selectedStateId = event.target.value;
    this.stateId = selectedStateId;

    this.portalService
      .get(`PAPL/get/sbu/by/${selectedStateId}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.activeSBU = res;
        //console.log(res);
      });
  }

  getPlantOnSubChange(event: any) {
    this.activePlant = [];
    const selectedSublocation = event.target.value;
    this.sbuId = selectedSublocation;

    this.portalService
      .get(`PAPL/get/plant/by/${selectedSublocation}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.activePlant = res;
        // console.log("active plan", this.activePlant)
      });
  }

  getHouseByPlantId(event: any) {
    this.activeHouse = [];
    const selectedPlantId = event.target.value;
    this.plantId = selectedPlantId;

    this.portalService
      .get(`PAPL/get/house/by/${selectedPlantId}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.activeHouse = res;
        // console.log("active plan", this.activeHouse)
      });
  }

  getHouseId(event: any) {
    this.activeUnitId = [];
    const selectedUnitId = event.target.value;
    this.houseId = selectedUnitId;

    this.portalService
      .get(`PAPL/get/unit/by/${selectedUnitId}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.activeUnitId = res;
        //this.activeUnitId = res.map((item:any) => item.unit);
        console.log("activeUnitId plan", this.activeUnitId.unitId);
      });
  }

  getunitId(event: any) {
    const unithId = event.target.value;
    console.log(unithId);
    this.unitId = unithId;
  }

  unitBookingSearch() {
    // if(this.employeeForm.valid){
    // let vSts = this.validateData();
    // if (vSts) {
    if (this.unitId == undefined) {
      this.unitId = 0;
    }

    let apiEndpoint: string;

    if (this.unitId) {
      apiEndpoint = `PAPL/UnitBookingsearch?fk_state_id=${this.stateId}&fk_sbu_id=${this.sbuId}&fk_plant_id=${this.plantId}&fk_House_id=${this.houseId}&unit_id=${this.unitId}`;
    } else {
      apiEndpoint = `PAPL/UnitBookingsearch?fk_state_id=${this.stateId}&fk_sbu_id=${this.sbuId}&fk_plant_id=${this.plantId}&fk_House_id=${this.houseId}`;
    }

    this.portalService
      .get(apiEndpoint)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res) => {
          this.houseDetails = res;
          console.log(res);
        },
        (error) => {
          this.ngxLoader.stop();
          Swal.fire({
            icon: "error",
            text: "Error in Data Insertion",
          });
        }
      );

    // }else {
    //   this.markFormGroupTouched(this.employeeForm);
    //   this.scrollToTop();
    //  // alert("Please Enter Required fields !")
    // }
  }

  validateData() {
    let vSts = true;

    if (!this.vldChkLst.blankCheckWithoutAlert(this.stateId)) {
      vSts = false;
      this.errorMessages.stateId = "State is required.";
    } else {
      this.errorMessages.stateId = "";
    }
    return vSts;
  }

  getEmployeeDetails() {
    this.portalService
      .get(
        `/PAPL/getEmployeeFachingDetails?state_id=${this.stateId}&location_id=${this.sbuId}&plant_id=${this.plantId}`
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.allemployeeDetails = res;
        console.log("active plan", this.allemployeeDetails);
      });
  }

  postBooking() {
    let checkEmpId =
      this.employeeForm.get("empId")?.value == "" ||
      this.employeeForm.get("bookStartDate")?.value == "" ||
      this.employeeForm.get("bkEndDate")?.value == "" ||
      this.employeeForm.get("selectPeriod")?.value == "";

    if (checkEmpId == true) {
      Swal.fire({
        icon: "error",
        text: "Please fill in all the required fields.",
      });
      return;
    }

    let data = {
      houseId: this.houseId,
      unitId: this.unitId,
      stateId: this.stateId,
      plantId: this.plantId,
      sbuId: this.sbuId,
      so: this.employeeForm.get("serviceOrder")?.value,
      empId: this.employeeForm.get("empId")?.value,
      empName: this.employeeForm.get("empName")?.value,
      emailId: this.employeeForm.get("emailId")?.value,
      mobileNo: this.employeeForm.get("mobileNo")?.value,
      bkStartDate: this.employeeForm.get("bookStartDate")?.value,
      bkEndDate: this.employeeForm.get("bkEndDate")?.value,
      selectPeriod: this.employeeForm.get("selectPeriod")?.value,
    };

    console.log(data);

    this.portalService.post("PAPL/UnitBooking", data).subscribe(
      (res) => {
        console.log(res);
        Swal.fire({
          icon: "success",
          text: "Booking successful",
        });

        this.employeeForm.reset();
        this.unitBookingSearch();
        this.ngOnInit();
      },
      (error) => {
        console.log("error while unit booking", error?.error);
        if (error?.error) {
          Swal.fire({
            icon: "error",
            text: error?.error[0],
          });
        }
      }
    );
    // }else {
    //   this.markFormGroupTouched(this.employeeForm);
    //   this.scrollToTop();
    //  // alert("Please Enter Required fields !")
    // }
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

  selectEmp(event: any) {
    const empID = event.target.value;
    this.portalService
      .get(`PAPL/getEmployeeDetails?papl_id=${empID}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        console.log(res);
        const employee = res[0]; // Move the assignment here
        if (employee) {
          this.employeeForm.patchValue({
            empName: employee.empName,
            mobileNo: employee.mobileNo,
            plantName: employee.plantId,
            serviceOrder: employee.so,
            emailId: employee.email,
          });
        }
      });
  }
  onClick() {
    // Your button click logic here
    alert("Booking Successfully!!");
  }
  onClick1() {
    // Your button click logic here
    // alert('Update Successfully!!');
    this.unitBookingSearch();
  }

  onStartDateChange() {
    this.calculateEndDate();
  }

  onPeriodChange() {
    this.calculateEndDate();
  }

  calculateEndDate() {
    const startDate = this.employeeForm.get("bookStartDate")?.value;
    const periodValue = this.employeeForm.get("selectPeriod")?.value;

    if (startDate && periodValue) {
      const startDateObj = new Date(startDate);
      const periodValueNum = parseInt(periodValue, 10);
      startDateObj.setDate(startDateObj.getDate() + periodValueNum);
      const endDate = startDateObj.toISOString().split("T")[0];
      this.employeeForm.patchValue({ bkEndDate: endDate });
    }
  }

  ngOnDestroy() {
    this.destroy$.next(); // Trigger the Subject to complete when the component is destroyed
    this.destroy$.complete();
  }

  showBookedData(booked: number, unitNo: number, houseName: string) {
    const apiUrl = `http://206.189.142.35:9090/PAPL/getEmployeebookedDetails?booked=${booked}&unit_no=${unitNo}&house_name=${houseName}`;

    this.http
      .get(apiUrl)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (response: any) => {
          // Change the type to 'any'
          console.log(response, "bookedData");
          let content = ""; // Initialize empty content string

          if (Array.isArray(response) && response.length > 0) {
            response.forEach((data: any) => {
              // Accumulate HTML content for each item
              content += `
                            <div style="text-align: left;">
                                <p><strong>House Name:</strong> ${data.houseName}</p>
                                <p><strong>Room No:</strong> ${data.unitNo}</p>
                                <p><strong>Employee Id:</strong> ${data.empId}</p>
                                <p><strong>Employee Name:</strong> ${data.empName}</p>
                                <p><strong>Mobile No:</strong> ${data.mobileNo}</p>
                            </div>
                            <hr>`;
            });
            Swal.fire({
              title: "Booked Data",
              html: content,
              // icon: 'info'
            });
          } else {
            console.error("Invalid response format:", response);
            Swal.fire({
              title: "Data Not Available",
              // text: 'Invalid response format',
              icon: "error",
            });
          }
        },
        (error) => {
          console.error("Error fetching data:", error);
          Swal.fire({
            title: "Error",
            text: "Failed to fetch data from the API",
            icon: "error",
          });
        }
      );
  }
}
