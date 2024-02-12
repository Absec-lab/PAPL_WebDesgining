import { Component, ElementRef, ViewChild } from "@angular/core";
import { PortalServiceService } from "./../serviceapi/portal-service.service";
import { NgxUiLoaderService } from "ngx-ui-loader";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  AbstractControl,
} from "@angular/forms";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ValidatorchklistService } from "./../serviceapi/validatorchklist.service";
import { Observable, map, of, startWith, takeUntil } from "rxjs";
import { CommonValidatorService } from "src/app/common-validator.service";
import {
  DistrictDropdownList,
  PincodeDropdownList,
} from "src/app/common/model/dropdown-list.model";
import { ExcelService } from "../serviceapi/excel.service";
@Component({
  selector: "app-home-owner-registration",
  templateUrl: "./house-owner-registration.component.html",
  styleUrls: ["../../common.css", "./house-owner-registration.component.css"],
})
export class HouseOwnerRegistrationComponent {
  tableData: any = [];
  duplicateTableData: any[] = [];
  allOwner: any[] = [];
  legalbtn: boolean = false;
  upi: boolean = false;
  cash: boolean = false;
  heading: boolean = false;
  bank: boolean = false;
  legalheir: boolean = false;
  stateDtails: any = [];
  houseRegistrationForm!: FormGroup<any>;
  updatebtn: boolean = false;
  descripinput: boolean = false;
  legalheirForm!: FormGroup;
  noOfLegalParties: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];
  distControl = new FormControl();
  pinControl = new FormControl();
  distFilteredOptions: Observable<DistrictDropdownList[]>;
  pinFilteredOptions: Observable<PincodeDropdownList[]>;
  @ViewChild("fileInput") fileInput!: ElementRef;
  distLegalHeirControl = new FormControl();
  pinLegalHeirControl = new FormControl();
  distLegalHeirFilteredOptions: Observable<DistrictDropdownList[]>;
  pinLegalHeirFilteredOptions: Observable<PincodeDropdownList[]>;
  isDisableAddButton: boolean = false;
  uploadGovtIdProofFileName: string = "";
  uploadQrCodeFileName: string = "";
  constructor(
    private ngxLoader: NgxUiLoaderService,
    private formBuilder: FormBuilder,
    private route: Router,
    public portalServ: PortalServiceService,
    private httpClient: HttpClient,
    public vldChkLst: ValidatorchklistService,
    private excelService: ExcelService
  ) {}
  ngOnInit(): void {
    this.getAllOwner();
    this.getAllStateList();

    this.houseRegistrationForm = this.formBuilder.group({
      ownerId: [""],
      ownerName: [
        "",
        [Validators.required, CommonValidatorService.fullNameValidator],
      ],
      phone: [
        "",
        [
          Validators.required,
          CommonValidatorService.phonenovalid,
          Validators.minLength,
        ],
      ],
      email: ["", [Validators.required, CommonValidatorService.validateEmail]],
      idProofDoc: ["", Validators.required],
      idProofDocPrifix: [""],
      gIdproof: ["", Validators.required],
      add1: [
        "",
        [Validators.required, CommonValidatorService.noSpaceValidator],
      ],
      add2: ["", [CommonValidatorService.noSpaceValidatorWithoutRequired]],
      state: ["", [Validators.required]],
      dist: ["", [Validators.required]],
      pin: ["", [Validators.required]],
      paymode: ["", [Validators.required]],
      status: ["1"],
      accHolName: ["", Validators.required],
      accounNum: ["", [Validators.required]],
      ifsc: ["", [Validators.required]],
      pan: ["", [Validators.required, CommonValidatorService.validatePan]],
      panPic: ["", Validators.required],
      panNoPrifix: [""],
      desc: ["", [CommonValidatorService.noSpaceValidatorWithoutRequired]],
      upiId: ["", [Validators.required]],
      linkMobile: ["", [Validators.required]],
      qrCode: [""],
      uploadlegalheir: [""],
      legalprifix: [""],
    });

    this.legalheirForm = this.formBuilder.group({
      // ownerName: ['', [Validators.required, CommonValidatorService.fullNameValidator]],

      legal: this.formBuilder.array([]),
    });
  }
  noOfLegalPartiesChange(event: any) {
    debugger;
    if (this.legalheirarray.length >= parseInt(event.target.value)) {
      this.isDisableAddButton = false;
    } else {
      this.isDisableAddButton = true;
    }
  }
  private _distfilter(value: string): DistrictDropdownList[] {
    if (value === "" || value === null || value === undefined) {
      this.houseRegistrationForm.controls["dist"].setValue("");
    }
    return this.allDistictList.filter(
      (option) =>
        option.districtName.toLowerCase().indexOf(value.toLowerCase()) === 0
    );
  }
  private _pinfilter(value: string): PincodeDropdownList[] {
    if (value === "" || value === null || value === undefined) {
      this.houseRegistrationForm.controls["pin"].setValue("");
    }
    return this.pincodeList.filter(
      (option) => option.pincode.toString().indexOf(value) === 0
    );
  }
  private _distlegalheirfilter(
    value: string,
    index: number
  ): DistrictDropdownList[] {
    debugger;
    if (value === "" || value === null || value === undefined) {
      this.legalheirarray.controls[index].controls["district"].setValue("");
    }
    return this.arrayDistList.filter(
      (option) =>
        option.districtName.toLowerCase().indexOf(value.toLowerCase()) === 0
    );
  }
  private _pinlegalheirfilter(
    value: string,
    index: number
  ): PincodeDropdownList[] {
    debugger;
    if (value === "" || value === null || value === undefined) {
      this.legalheirarray.controls[index].controls["pinCode"].setValue("");
    }
    return this.arrayPincode.filter(
      (option) => option.pincode.toString().indexOf(value) === 0
    );
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getAllOwner();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllOwner();
  }
  get legalheirarray(): any {
    return this.legalheirForm.get("legal") as FormArray;
  }

  addlegaleirform() {
    const legalform = this.formBuilder.group({
      prevOwonerId: [this.houseRegistrationForm.value.ownerId],
      ownerName: [
        "",
        [Validators.required, CommonValidatorService.fullNameValidator],
      ],
      phoneNo: ["", [Validators.required, CommonValidatorService.phonenovalid]],
      emailId: [
        "",
        [Validators.required, CommonValidatorService.validateEmail],
      ],
      idProofDoc: ["", [Validators.required]],
      idProofDocPrifix: [""],
      idProof: [
        "",
        [Validators.required, CommonValidatorService.noSpaceValidator],
      ],
      address1: [
        "",
        [Validators.required, CommonValidatorService.noSpaceValidator],
      ],
      address2: ["", [CommonValidatorService.noSpaceValidatorWithoutRequired]],
      stateId: ["", Validators.required],
      district: ["", Validators.required],
      pinCode: ["", Validators.required],
      paymtMode: ["", Validators.required],
      isActive: ["1"],
      accountHolderName: ["", [Validators.required]],
      bankAccountNo: ["", [Validators.required]],
      ifscCode: ["", [Validators.required]],
      panNo: ["", [Validators.required]],
      panCardAddress: [""],
      panNoDoc: ["", [Validators.required]],
      panNoPrifix: [""],
      upiId: ["", [Validators.required]],
      upiPhoneNo: ["", [Validators.required, Validators.minLength]],
      uploadQuarCodeAdds: [""],
      quarCodePrifix: [""],
      quarCodeDoc: ["", [Validators.required]],
    });
    console.log(typeof this.noOfLegalParties);
    console.log(this.noOfLegalParties);
    this.legalheirarray.insert(0, legalform);
    if (this.legalheirarray.length >= parseInt(this.noOfLegalParties)) {
      this.isDisableAddButton = false;
    } else {
      this.isDisableAddButton = true;
    }
    // if( this.legalheirarray.length > this.noOfLegalParties ) {

    // }
  }
  checkFileType(control: AbstractControl): { [key: string]: any } | null {
    const files: File[] = control.value;
    let errors: string[] = [];

    if (files.length >= 1) {
      for (let index = 0; index < files.length; index++) {
        //Use a type list here to check for your types for example "image/jpeg"
        if (files[index].type === "") {
          errors.push(`${files[index].name} has an invalid type of unknown\n`);
        }
      }

      return errors.length >= 1 ? { invalid_type: errors } : null;
    }
    return null; // no file, can be capture by "Required" validation
  }
  removelegalform(index: number) {
    this.legalheirarray.removeAt(index);
    if (this.legalheirarray.length >= parseInt(this.noOfLegalParties)) {
      this.isDisableAddButton = false;
    } else {
      this.isDisableAddButton = true;
    }
  }
  bankStatusChk: any = 0;
  getAllStateList() {
    this.portalServ.get("PAPL/getAllState").subscribe((res) => {
      this.stateDtails = res;
      //console.log(res)
    });
  }

  getAllOwner() {
    let param = {};
    // this.ngxLoader.start();
    this.portalServ.getAllOwner(param).subscribe((res) => {
      this.tableData = res.data;
      this.allOwner = res.data;
      console.log(this.allOwner);
      this.duplicateTableData = res.data;
    });
  }
  getLegalHeirDistirct(event: any, array?: any, index?: any) {
    debugger;
    console.log(event, typeof event);
    let checkEventValue = typeof event;
    if (checkEventValue !== "number" && event?.target?.value === "") {
      //this.allDistictList = [];
      return;
    }
    this.ngxLoader.start();
    let eventValue: any;
    if (typeof event === "number") {
      eventValue = event;
    } else {
      eventValue = event.target.value;
    }
    console.log("eventValue", eventValue);

    let distValue: any;

    if (eventValue == 1) {
      distValue = "ODISHA";
    } else if (eventValue == 2) {
      distValue = "CHHATTISGARH";
    } else if (eventValue == 3) {
      distValue = "MADHYA PRADESH";
    } else if (eventValue == 4) {
      distValue = "MAHARASHTRA";
    }

    this.portalServ
      .get(`PAPL/getDistrictByStateName?statename=${distValue}`)
      .subscribe((res) => {
        if (array) {
          this.arrayDistList = res;
          this.distLegalHeirFilteredOptions =
            this.distLegalHeirControl.valueChanges.pipe(
              startWith(""),
              map((value) => this._distlegalheirfilter(value, index))
            );
        } else {
          this.allDistictList = res;
        }
        this.ngxLoader.stop();
        // console.log(res)
      });
  }

  getLegalHeirPinCode(event: any, array?: any, index?: any) {
    debugger;
    let checkEventValue = typeof event;
    if (checkEventValue !== "number" && event?.source?.value === "") {
      //this.pincodeList = [];
      return;
    }
    this.ngxLoader.start();
    //console.log(event.target.value);

    let distValue: any;
    if (typeof event === "string") {
      distValue = event;
    } else {
      distValue = event?.source?.value;
    }
    this.legalheirarray.controls[index].controls["district"].setValue(
      distValue
    );
    this.portalServ
      .get(`PAPL/getPincodeAndStateByDistrict?Districtname=${distValue}`)
      .subscribe((res) => {
        if (array) {
          this.arrayPincode = res;
          this.pinLegalHeirFilteredOptions =
            this.pinLegalHeirControl.valueChanges.pipe(
              startWith(""),
              map((value) => this._pinlegalheirfilter(value, index))
            );
        } else {
          this.pincodeList = res;
          console.log("Pin", res);
          let ownerId = this.houseRegistrationForm.value.ownerId;
          let pinChangeValue =
            ownerId !== "" ? this.houseRegistrationForm.value.pin : "";
          this.pinFilteredOptions = this.pinControl.valueChanges.pipe(
            startWith(pinChangeValue),
            map((value) => this._pinfilter(value))
          );
        }
        this.ngxLoader.stop();
        console.log(res);
      });
  }
  selectLegalHeirPinCode(event: any, index?: any) {
    let pinValue: any;
    if (event?.source?.value !== "") {
      pinValue = event?.source?.value;
      this.legalheirarray.controls[index].controls["pinCode"].setValue(
        pinValue
      );
    }
  }

  deleteOwner(id: any = 0) {
    Swal.fire({
      // title: 'Are you sure?',
      text: "Are you sure you want to delete the details ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      // confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.portalServ.deleteOwner(id).subscribe((res) => {
          this.getAllOwner();
          Swal.fire("Deleted!", "Owner has been deactivated.", "success");
        });
      }
    });
  }

  allDistictList: DistrictDropdownList[];
  arrayDistList: DistrictDropdownList[];
  getDistirct(event: any, array?: any) {
    console.log(event, typeof event);
    debugger;
    let checkEventValue = typeof event;
    if (checkEventValue !== "number" && event?.target?.value === "") {
      //this.allDistictList = [];
      return;
    }
    this.ngxLoader.start();
    let eventValue: any;
    if (typeof event === "number") {
      eventValue = event;
    } else {
      eventValue = event.target.value;
    }
    console.log("eventValue", eventValue);

    let distValue: any;

    if (eventValue == 1) {
      distValue = "ODISHA";
    } else if (eventValue == 2) {
      distValue = "CHHATTISGARH";
    } else if (eventValue == 3) {
      distValue = "MADHYA PRADESH";
    } else if (eventValue == 4) {
      distValue = "MAHARASHTRA";
    }
    this.houseRegistrationForm.controls["dist"].setValue("");
    this.houseRegistrationForm.controls["pin"].setValue("");
    this.portalServ
      .get(`PAPL/getDistrictByStateName?statename=${distValue}`)
      .subscribe((res) => {
        if (array) {
          this.arrayDistList = res;
        } else {
          this.allDistictList = res;
          let ownerId = this.houseRegistrationForm.value.ownerId;
          let distChangeValue =
            ownerId !== "" ? this.houseRegistrationForm.value.dist : "";
          this.distFilteredOptions = this.distControl.valueChanges.pipe(
            startWith(distChangeValue),
            map((value) => this._distfilter(value))
          );
        }
        this.ngxLoader.stop();
        // console.log(res)
      });
  }
  pincodeList: PincodeDropdownList[];
  arrayPincode: PincodeDropdownList[];
  getPinCode(event: any, array?: any) {
    debugger;
    let checkEventValue = typeof event;
    if (checkEventValue !== "number" && event?.source?.value === "") {
      //this.pincodeList = [];
      return;
    }
    this.ngxLoader.start();
    //console.log(event.target.value);

    let distValue: any;
    if (typeof event === "string") {
      distValue = event;
    } else {
      distValue = event?.source?.value;
    }

    this.portalServ
      .get(`PAPL/getPincodeAndStateByDistrict?Districtname=${distValue}`)
      .subscribe((res) => {
        this.houseRegistrationForm.controls["dist"].setValue(distValue);
        if (array) {
          this.arrayPincode = res;
        } else {
          this.pincodeList = res;
          let ownerId = this.houseRegistrationForm.value.ownerId;
          let pinChangeValue =
            ownerId !== "" ? this.houseRegistrationForm.value.pin : "";
          this.pinFilteredOptions = this.pinControl.valueChanges.pipe(
            startWith(pinChangeValue),
            map((value) => this._pinfilter(value))
          );
        }
        this.ngxLoader.stop();
        console.log(res);
      });
  }

  selectPinCode(event: any) {
    let pinValue: any;
    if (event?.source?.value !== "") {
      pinValue = event?.source?.value;
      this.houseRegistrationForm.controls["pin"].setValue(pinValue);
    }
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
          // Determine file extension based on file type
          const fileExtension = this.getFileExtension(file.type);
          const extn = "." + fileExtension;

          if (formControlName == "idProofDoc") {
            this.houseRegistrationForm.get("idProofDocPrifix")?.setValue(extn);
          } else if (formControlName == "panPic") {
            this.houseRegistrationForm.get("panNoPrifix")?.setValue(extn);
          } else if (formControlName == "qrCode") {
            this.houseRegistrationForm.get("quarCodePrifix")?.setValue(extn);
          } else if (formControlName == "uploadlegalheir") {
            this.houseRegistrationForm.get("legalprifix")?.setValue(extn);
          }
          // Use base64Content and fileExtension as needed
          console.log("Base64 Content:", base64Content);
          console.log(
            "File Extension:",
            extn,
            "form control",
            this.houseRegistrationForm.value.idProofDocPrifix
          );

          if (formArrName && index !== undefined) {
            // Update image value in a FormArray at a specific index
            const formArray = this.legalheirForm.get(formArrName) as FormArray;

            if (formArray && index >= 0 && index < formArray.length) {
              const formGroup = formArray.at(index) as FormGroup;
              if (formControlName == "idProofDoc") {
                formGroup.get("idProofDocPrifix")?.setValue(extn);
              } else if (formControlName == "panNoDoc") {
                formGroup.get("panNoPrifix")?.setValue(extn);
              } else if (formControlName == "quarCodeDoc") {
                formGroup.get("quarCodePrifix")?.setValue(extn);
              }
              formGroup.get(formControlName)?.setValue(base64Content);
            }
          } else {
            // Update image value in a regular FormControl
            const formControl = this.houseRegistrationForm.get(formControlName);

            if (formControl) {
              formControl.setValue(base64Content);
            }
          }
        };

        if (file.type.startsWith("image/") || file.type === "application/pdf") {
          reader.readAsDataURL(file);
        } else {
          console.error(
            "Invalid file type. Please select an image or PDF file."
          );
        }
      }
    }
    console.log(this.houseRegistrationForm);
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

  // validateData() {
  //   const formControls = [
  //     { control: this.houseRegistrationForm.get('ownerName'), name: "Owner Name" },
  //     { control: this.houseRegistrationForm.get('phone'), name: "Phone" },
  //     { control: this.houseRegistrationForm.get('email'), name: "Email" },
  //     { control: this.houseRegistrationForm.get('gIdproof'), name: "Govt. Id Proof" },
  //     { control: this.houseRegistrationForm.get('add1'), name: "Address 1" },
  //     // { control: this.houseRegistrationForm.get('add2'), name: "Address 2" },

  //     { control: this.houseRegistrationForm.get('state'), name: "State" },
  //     { control: this.houseRegistrationForm.get('dist'), name: "District" },
  //     { control: this.houseRegistrationForm.get('pin'), name: "Pin Code" },

  //     { control: this.houseRegistrationForm.get('paymode'), name: "Payment mode" },
  //     { control: this.houseRegistrationForm.get('accHolName'), name: "Account holder name" },
  //     { control: this.houseRegistrationForm.get('accounNum'), name: "Account Number" },
  //     { control: this.houseRegistrationForm.get('ifsc'), name: "IFSC" },
  //     { control: this.houseRegistrationForm.get('pan'), name: "PAN" },
  //     //   if (this.upi == true) {
  //     //   { control: this.houseRegistrationForm.get('upiId'), name: "UPI Id" },
  //     //   { control: this.houseRegistrationForm.get('linkMobile'), name: "Linked Mobile No." },
  //     // }

  //   ];

  //   let vSts = true;

  //   for (const formControl of formControls) {
  //     if (formControl.control?.valid) {
  //       vSts = true;
  //     } else {
  //       Swal.fire({
  //         // icon: 'error',
  //         text: `Please select ${formControl.name}`
  //       });
  //       vSts = false
  //       break;
  //     }

  //   }
  //   return vSts;
  // }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      // If the control is a nested form group, mark its controls as touched recursively
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
  scrollToTop(): void {
    window.scrollTo(0, 0);
  }
  ownerRegistration() {
    let errFlag = 0;
    let emailId: any = this.houseRegistrationForm.value.emailId;
    let gIdproof: any = this.houseRegistrationForm.value.gIdproof;
    const emailIdcheck = this.houseRegistrationForm.get("emailId");
    if (errFlag == 0 && emailIdcheck && emailIdcheck.hasError("email")) {
      errFlag = 1;
      emailIdcheck.markAsTouched();
    }
    if (
      errFlag == 0 &&
      !this.vldChkLst.isAlphaNumericKey("gIdproof", gIdproof, "Govt. Id Proof")
    ) {
      errFlag = 1;
    }

    // let valid = this.validateData();
    if (this.houseRegistrationForm.valid) {
      let data: any = {
        ownerName: this.houseRegistrationForm.value.ownerName,
        phoneNo: this.houseRegistrationForm.value.phone,
        emailId: this.houseRegistrationForm.value.email,
        paymtMode: this.houseRegistrationForm.value.paymode,
        address1: this.houseRegistrationForm.value.add1,
        address2: this.houseRegistrationForm.value.add2,
        stateId: this.houseRegistrationForm.value.state,
        district: this.houseRegistrationForm.value.dist,
        pinCode: this.houseRegistrationForm.value.pin,
        idProofDoc: this.houseRegistrationForm.value.idProofDoc,
        idProof: this.houseRegistrationForm.value.gIdproof,
        idProofDocPrifix: this.houseRegistrationForm.value.idProofDocPrifix,
        isActive: this.houseRegistrationForm.value.status,
        accountHolderName: this.houseRegistrationForm.value.accHolName,
        bankAccountNo: this.houseRegistrationForm.value.accounNum,
        ifscCode: this.houseRegistrationForm.value.ifsc,
        panNo: this.houseRegistrationForm.value.pan,
        panNoDoc: this.houseRegistrationForm.value.panPic,
        panNoPrifix: this.houseRegistrationForm.value.panNoPrifix,
        panCardAddress: "string",
        upiId: this.houseRegistrationForm.value.upiId,
        upiPhoneNo: this.houseRegistrationForm.value.linkMobile,
        quarCodeDoc: this.houseRegistrationForm.value.qrCode,
        quarCodePrifix: this.houseRegistrationForm.value.quarCodePrifix,
      };
      debugger;
      console.log("Data", data);
      this.ngxLoader.start();
      this.portalServ.post("PAPL/addOwners", data).subscribe((res) => {
        this.ngxLoader.stop();

        Swal.fire({
          icon: "success",
          text: "Owner Registation Successfull",
        }).then((result: any) => {
          console.log(res);
          this.getAllOwner();
          window.location.reload();
          this.houseRegistrationForm.reset();
          // this.fileInput.nativeElement.value = '';
          this.houseRegistrationForm.patchValue({
            idProofDoc: "",
            status: "1",
          });
          console.log(this.houseRegistrationForm.value);
        });

        // this.houseRegistrationForm.get('isActive')?.setValue("1")

        //  this.houseRegistrationForm.value.isActive.setValue('1')
      });
    } else {
      this.markFormGroupTouched(this.houseRegistrationForm);
      window.scrollTo(0, 0);
    }
  }

  editOwner(item: any) {
    // debugger;
    console.log(item);
    console.log("idproof", item.idProofAddress);
    let splitAdressArr = item.idProofAddress.split("/");
    this.uploadGovtIdProofFileName = splitAdressArr[5];
    if (item.uploadQuarCodeAdds) {
      let splitQrCodeArr = item.uploadQuarCodeAdds.split("/");
      this.uploadQrCodeFileName = splitQrCodeArr[5];
    }
    this.updatebtn = true;
    this.descripinput = true;
    this.paymentmode(item.paymtMode == "string" ? 2 : item.paymtMode, "owner");
    this.getDistirct(item.stateId);
    this.getPinCode(item.district);
    this.houseRegistrationForm.patchValue({
      ownerId: item.ownerId,
      ownerName: item.ownerName,
      phone: item.phoneNo,
      email: item.emailId,
      idProofDoc: item.idProofDoc,
      // idProof: item.idProofAddress,
      gIdproof: item.idProof,
      add1: item.address1,
      add2: item.address2,
      state: item.stateId,
      dist: item.district,
      pin: item.pinCode,
      paymode: item.paymtMode == "string" ? 2 : item.paymtMode,
      status: item.isActive,
      accHolName: item.accountHolderName,
      accounNum: item.bankAccountNo,
      ifsc: item.ifscCode,
      pan: item.panNo,
      panPic: item.panCardAddress,
      desc: item.description,
      upiId: item.upiId,
      linkMobile: item.upiPhoneNo,
      qrCode: item.uploadQuarCodeAdds,
    });
    this.scrollToTop();
  }

  validateLegalData() {
    const formControlss = [
      // { control: this.legalheirForm.get('ownerName'), name: "House Owner Name" },
      { control: this.legalheirForm.get("phoneNo"), name: "Phone" },
      { control: this.legalheirForm.get("emailId"), name: "Email" },
      { control: this.legalheirForm.get("idProof"), name: "Govt. Id Proof" },
      { control: this.legalheirForm.get("address1"), name: "Address 1" },
      // { control: this.legalheirForm.get('add2'), name: "Address 2" },

      { control: this.legalheirForm.get("stateId"), name: "State" },
      { control: this.legalheirForm.get("district"), name: "District" },
      { control: this.legalheirForm.get("pinCode"), name: "Pin Code" },

      { control: this.legalheirForm.get("paymtMode"), name: "Payment mode" },
      {
        control: this.legalheirForm.get("accHolName"),
        name: "Account holder name",
      },
      { control: this.legalheirForm.get("accounNum"), name: "Account Number" },
      { control: this.legalheirForm.get("ifsc"), name: "IFSC" },
      { control: this.legalheirForm.get("pan"), name: "PAN" },
      //   if (this.upi == true) {
      //   { control: this.legalheirForm.get('upiId'), name: "UPI Id" },
      //   { control: this.legalheirForm.get('linkMobile'), name: "Linked Mobile No." },
      // }
    ];

    let vStss = true;

    for (const formControl of formControlss) {
      if (formControl.control?.valid) {
        vStss = true;
      } else {
        Swal.fire({
          // icon: 'error',
          text: `Please select ${formControl.name}`,
        });
        vStss = false;
        break;
      }
    }
    return vStss;
  }

  updateowner() {
    debugger;
    // let valid = this.validateLegalData();
    // if (valid) {
    // debugger
    // const invalid = [];
    // const controls = this.legalheirarray.controls[0].controls;
    // for (const name in controls) {
    //     if (controls[name].invalid) {
    //         invalid.push(name);
    //     }
    // }
    // console.log('Log',invalid);
    if (this.uploadGovtIdProofFileName !== "") {
      this.houseRegistrationForm.get("idProofDoc")?.clearValidators();
      this.houseRegistrationForm.get("idProofDoc")?.updateValueAndValidity();
    }
    if (this.uploadQrCodeFileName !== "") {
      this.houseRegistrationForm.get("qrCode")?.clearValidators();
      this.houseRegistrationForm.get("qrCode")?.updateValueAndValidity();
    }
    if (this.legalheirarray.valid && this.houseRegistrationForm.valid) {
      let data = {
        legalHeirRequestDto: this.legalheirarray.value,
        ownerRegistrationRequestDto: {
          ownerId: this.houseRegistrationForm.value.ownerId,
          ownerName: this.houseRegistrationForm.value.ownerName,
          phoneNo: this.houseRegistrationForm.value.phone,
          emailId: this.houseRegistrationForm.value.email,
          paymtMode: this.houseRegistrationForm.value.paymode,
          address1: this.houseRegistrationForm.value.add1,
          address2: this.houseRegistrationForm.value.add2,
          stateId: this.houseRegistrationForm.value.state,
          district: this.houseRegistrationForm.value.dist,
          pinCode: this.houseRegistrationForm.value.pin,
          idProof: this.houseRegistrationForm.value.gIdproof,
          idProofDoc: this.houseRegistrationForm.value.idProofDoc,
          isActive: this.houseRegistrationForm.value.status,
          accountHolderName: this.houseRegistrationForm.value.accHolName,
          bankAccountNo: this.houseRegistrationForm.value.accounNum,
          ifscCode: this.houseRegistrationForm.value.ifsc,
          panNo: this.houseRegistrationForm.value.pan,
          panCardAddress: this.houseRegistrationForm.value.panPic,
          upiId: this.houseRegistrationForm.value.upiId,
          upiPhoneNo: this.houseRegistrationForm.value.linkMobile,
          uploadQuarCodeDoc: this.houseRegistrationForm.value.qrCode,
          legalIdProof: "testing",
          legalIdProofDocPrifix: this.houseRegistrationForm.value.legalprifix,
          legalIdProofDoc: this.houseRegistrationForm.value.uploadlegalheir,
          noofLegalParties: this.noOfLegalParties,
          description: this.houseRegistrationForm.value.desc,
        },
      };
      console.log(this.legalheirarray.value);

      this.portalServ.put("PAPL/updateOwner", data).subscribe((res) => {
        Swal.fire({
          icon: "success",
          text: "House Owner Update succesfull",
        }).then((result: any) => {
          debugger;
          console.log(res);
          this.getAllOwner();
          this.houseRegistrationForm.reset();
          window.location.reload();
          this.legalheirarray.controls.forEach((control: any) => {
            control.reset();
          });
          this.legalbtnh = false;
        });
      });
    } else {
      // alert("ku6 to gad bad he re bada")
      this.markFormGroupTouched(this.houseRegistrationForm);
      this.markFormArrayControlsTouched(this.legalheirarray);
    }
  }

  markFormArrayControlsTouched(formArray: FormArray) {
    formArray.controls.forEach((control) => {
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  legalbtnh: boolean = false;
  showLegal(event: any) {
    const value = event.target.value;
    console.log(value);
    if (value == 0) {
      this.legalheir = true;
    } else {
      this.legalheir = false;
      if (this.legalbtnh) {
        this.legalbtnh = false;
      }
    }
  }

  togglelegal() {
    this.legalbtnh = !this.legalbtnh;
    this.legalheir = false;
    this.addlegaleirform();
    // this.descripinput= false
  }
  legalheading = false;
  legalbank = false;
  legalupi = false;
  paymentmode(event: any, userType: string, index?: any) {
    console.log("image");
    debugger;
    let value: any;
    //console.log(event, userType, typeof(event))
    if (typeof event === "number" || typeof event === "string") {
      value = event;
    } else {
      value = event.target.value;
    }

    if (value === "") {
      this.heading = false;
      return;
    }
    if (userType == "owner") {
      // For Bank AC
      if (value == "1") {
        this.heading = true;
        this.bank = true;
        this.upi = false;
        this.houseRegistrationForm.controls["accHolName"].setValidators([
          Validators.required,
          CommonValidatorService.noSpaceValidator,
        ]);
        this.houseRegistrationForm.controls[
          "accHolName"
        ].updateValueAndValidity();

        this.houseRegistrationForm.controls["accounNum"].setValidators([
          Validators.required,
        ]);
        this.houseRegistrationForm.controls[
          "accounNum"
        ].updateValueAndValidity();

        this.houseRegistrationForm.controls["ifsc"].setValidators([
          Validators.required,
          CommonValidatorService.ifsccodevalid,
        ]);
        this.houseRegistrationForm.controls["ifsc"].updateValueAndValidity();

        this.houseRegistrationForm.controls["pan"].setValidators([
          Validators.required,
          CommonValidatorService.validatePan,
        ]);
        this.houseRegistrationForm.controls["pan"].updateValueAndValidity();

        this.houseRegistrationForm.controls["panPic"].setValidators([
          Validators.required,
        ]);
        this.houseRegistrationForm.controls["panPic"].updateValueAndValidity();

        this.houseRegistrationForm.get("upiId")?.clearValidators();
        this.houseRegistrationForm.get("upiId")?.updateValueAndValidity();

        this.houseRegistrationForm.get("linkMobile")?.clearValidators();
        this.houseRegistrationForm.get("linkMobile")?.updateValueAndValidity();

        this.houseRegistrationForm.get("qrCode")?.clearValidators();
        this.houseRegistrationForm.get("qrCode")?.updateValueAndValidity();
      }
      // For Cash
      else if (value == "2") {
        this.heading = false;
        this.bank = false;
        this.upi = false;
        this.houseRegistrationForm.get("accHolName")?.clearValidators();
        this.houseRegistrationForm.get("accHolName")?.updateValueAndValidity();

        this.houseRegistrationForm.get("accounNum")?.clearValidators();
        this.houseRegistrationForm.get("accounNum")?.updateValueAndValidity();

        this.houseRegistrationForm.get("ifsc")?.clearValidators();
        this.houseRegistrationForm.get("ifsc")?.updateValueAndValidity();

        this.houseRegistrationForm.get("linkMobile")?.clearValidators();
        this.houseRegistrationForm.get("linkMobile")?.updateValueAndValidity();

        this.houseRegistrationForm.get("pan")?.clearValidators();
        this.houseRegistrationForm.get("pan")?.updateValueAndValidity();

        this.houseRegistrationForm.get("upiId")?.clearValidators();
        this.houseRegistrationForm.get("upiId")?.updateValueAndValidity();

        this.houseRegistrationForm.get("panPic")?.clearValidators();
        this.houseRegistrationForm.get("panPic")?.updateValueAndValidity();

        this.houseRegistrationForm.get("qrCode")?.clearValidators();
        this.houseRegistrationForm.get("qrCode")?.updateValueAndValidity();
      } else {
        this.heading = true;
        this.bank = false;
        this.upi = true;
        this.houseRegistrationForm.get("accHolName")?.clearValidators();
        this.houseRegistrationForm.get("accHolName")?.updateValueAndValidity();

        this.houseRegistrationForm.get("accounNum")?.clearValidators();
        this.houseRegistrationForm.get("accounNum")?.updateValueAndValidity();

        this.houseRegistrationForm.get("ifsc")?.clearValidators();
        this.houseRegistrationForm.get("ifsc")?.updateValueAndValidity();

        this.houseRegistrationForm.get("pan")?.clearValidators();
        this.houseRegistrationForm.get("pan")?.updateValueAndValidity();

        this.houseRegistrationForm.get("panPic")?.clearValidators();
        this.houseRegistrationForm.get("panPic")?.updateValueAndValidity();

        this.houseRegistrationForm.controls["upiId"].setValidators([
          Validators.required,
          CommonValidatorService.upivalid,
        ]);
        this.houseRegistrationForm.controls["upiId"].updateValueAndValidity();

        this.houseRegistrationForm.controls["linkMobile"].setValidators([
          Validators.required,
        ]);
        this.houseRegistrationForm.controls[
          "linkMobile"
        ].updateValueAndValidity();

        this.houseRegistrationForm.controls["qrCode"].setValidators([
          Validators.required,
        ]);
        this.houseRegistrationForm.controls["qrCode"].updateValueAndValidity();
      }
    } else if (userType == "legal") {
      // For Bank AC
      if (value == "1") {
        this.legalheading = true;
        this.legalbank = true;
        this.legalupi = false;
        this.legalheirarray.controls[index].controls[
          "accountHolderName"
        ].setValidators([
          Validators.required,
          CommonValidatorService.noSpaceValidator,
        ]);
        this.legalheirarray.controls[index].controls[
          "accountHolderName"
        ].updateValueAndValidity();

        this.legalheirarray.controls[index].controls[
          "bankAccountNo"
        ].setValidators([Validators.required, Validators.minLength]);
        this.legalheirarray.controls[index].controls[
          "bankAccountNo"
        ].updateValueAndValidity();

        this.legalheirarray.controls[index].controls["ifscCode"].setValidators([
          Validators.required,
          CommonValidatorService.ifsccodevalid,
        ]);
        this.legalheirarray.controls[index].controls[
          "ifscCode"
        ].updateValueAndValidity();

        this.legalheirarray.controls[index].controls["panNo"].setValidators([
          Validators.required,
          CommonValidatorService.validatePan,
        ]);
        this.legalheirarray.controls[index].controls[
          "panNo"
        ].updateValueAndValidity();

        this.legalheirarray.controls[index].controls["panNoDoc"].setValidators([
          Validators.required,
        ]);
        this.legalheirarray.controls[index].controls[
          "panNoDoc"
        ].updateValueAndValidity();

        this.legalheirarray.controls[index].get("upiId")?.clearValidators();
        this.legalheirarray.controls[index]
          .get("upiId")
          ?.updateValueAndValidity();

        this.legalheirarray.controls[index]
          .get("upiPhoneNo")
          ?.clearValidators();
        this.legalheirarray.controls[index]
          .get("upiPhoneNo")
          ?.updateValueAndValidity();

        this.legalheirarray.controls[index]
          .get("quarCodeDoc")
          ?.clearValidators();
        this.legalheirarray.controls[index]
          .get("quarCodeDoc")
          ?.updateValueAndValidity();
      }
      // For Cash
      else if (value == "2") {
        this.legalheading = false;
        this.legalbank = false;
        this.legalupi = false;
        this.legalheirarray.controls[index]
          .get("accountHolderName")
          ?.clearValidators();
        this.legalheirarray.controls[index]
          .get("accountHolderName")
          ?.updateValueAndValidity();

        this.legalheirarray.controls[index]
          .get("bankAccountNo")
          ?.clearValidators();
        this.legalheirarray.controls[index]
          .get("bankAccountNo")
          ?.updateValueAndValidity();

        this.legalheirarray.controls[index].get("ifscCode")?.clearValidators();
        this.legalheirarray.controls[index]
          .get("ifscCode")
          ?.updateValueAndValidity();

        this.legalheirarray.controls[index].get("panNo")?.clearValidators();
        this.legalheirarray.controls[index]
          .get("panNo")
          ?.updateValueAndValidity();

        this.legalheirarray.controls[index].get("panNoDoc")?.clearValidators();
        this.legalheirarray.controls[index]
          .get("panNoDoc")
          ?.updateValueAndValidity();

        this.legalheirarray.controls[index].get("upiId")?.clearValidators();
        this.legalheirarray.controls[index]
          .get("upiId")
          ?.updateValueAndValidity();

        this.legalheirarray.controls[index]
          .get("upiPhoneNo")
          ?.clearValidators();
        this.legalheirarray.controls[index]
          .get("upiPhoneNo")
          ?.updateValueAndValidity();

        this.legalheirarray.controls[index]
          .get("quarCodeDoc")
          ?.clearValidators();
        this.legalheirarray.controls[index]
          .get("quarCodeDoc")
          ?.updateValueAndValidity();
      } else {
        this.legalheading = true;
        this.legalbank = false;
        this.legalupi = true;
        this.legalheirarray.controls[index]
          .get("accountHolderName")
          ?.clearValidators();
        this.legalheirarray.controls[index]
          .get("accountHolderName")
          ?.updateValueAndValidity();

        this.legalheirarray.controls[index]
          .get("bankAccountNo")
          ?.clearValidators();
        this.legalheirarray.controls[index]
          .get("bankAccountNo")
          ?.updateValueAndValidity();

        this.legalheirarray.controls[index].get("ifscCode")?.clearValidators();
        this.legalheirarray.controls[index]
          .get("ifscCode")
          ?.updateValueAndValidity();

        this.legalheirarray.controls[index].get("panNo")?.clearValidators();
        this.legalheirarray.controls[index]
          .get("panNo")
          ?.updateValueAndValidity();

        this.legalheirarray.controls[index].get("panNoDoc")?.clearValidators();
        this.legalheirarray.controls[index]
          .get("panNoDoc")
          ?.updateValueAndValidity();

        this.legalheirarray.controls[index].controls["upiId"].setValidators([
          Validators.required,
          CommonValidatorService.upivalid,
        ]);
        this.legalheirarray.controls[index].controls[
          "upiId"
        ].updateValueAndValidity();

        this.legalheirarray.controls[index].controls[
          "upiPhoneNo"
        ].setValidators([
          Validators.required,
          CommonValidatorService.phonenovalid,
          Validators.minLength,
        ]);
        this.legalheirarray.controls[index].controls[
          "upiPhoneNo"
        ].updateValueAndValidity();

        this.legalheirarray.controls[index].controls[
          "quarCodeDoc"
        ].setValidators([Validators.required]);
        this.legalheirarray.controls[index].controls[
          "quarCodeDoc"
        ].updateValueAndValidity();
      }
    }
  }

  showhidebankdetails(indes: any) {
    // this.legalheirarray.constrols
    console.log(
      [3, 4, 5, 6].includes(this.legalheirarray.value[indes].paymtMode)
    );
    console.log(typeof this.legalheirarray.value[indes].paymtMode);
    if (this.legalheirarray.value[indes].paymtMode == 1) {
      return "Bank";
    } else if (
      [3, 4, 5, 6].includes(+this.legalheirarray.value[indes].paymtMode)
    ) {
      return "upi";
    }
    return "false";
  }

  exportAsXLSX(): void {
    debugger;
    let removeColumnData = ["ownerId", "stateId"];
    let Heading = [
      [
        "Owner Name",
        "State",
        "House Owner Name",
        "Phone no",
        "Address",
        "Govt ID	",
        "ID Proof Address	",
        "Account Number	",
        "IFSC Code",
        "PAN Card	",
        "Payment Mode	",
        "UPI Id/linked Mob. No.	",
        "QR Code	",
        "Status",
        "Start Date",
      ],
    ];
    removeColumnData.forEach((e) => {
      this.duplicateTableData.forEach((element) => {
        delete element[e];
      });
    });
    this.excelService.exportAsExcelFile(
      this.duplicateTableData,
      "houseOwnerregistration",
      Heading
    );
  }
}
