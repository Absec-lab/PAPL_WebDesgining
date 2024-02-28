import { Component } from '@angular/core';
import { PortalServiceService } from './../serviceapi/portal-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { ValidatorchklistService } from './../serviceapi/validatorchklist.service';
import { ExcelService } from '../serviceapi/excel.service';

@Component({
  selector: 'app-agreement-type-master',
  templateUrl: './agreement-type-master.component.html',
  styleUrls: ['../../common.css', './agreement-type-master.component.css']
})
export class AgreementTypeMasterComponent {
  constructor(private ngxLoader: NgxUiLoaderService, private formBuilder: FormBuilder, private route: Router, public portalServ: PortalServiceService, private httpClient: HttpClient, public vldChkLst: ValidatorchklistService, private excelService: ExcelService) { }
  ngOnInit(): void {
    this.getAllAgreementType();
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
      this.tableData = results;
    } else {
      this.tableData = this.allData;
    }
  }
  tableData: any = [];
  allData: any = [];
  duplicateTableData: any[] = [];
  aggrementType: any = '';
  aggreStDate: any = '';
  aggreEdDate: any = '';
  aggrementTypeDesc: any = '';
  aggreTypeId: any = '';
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];
  startDate: Date;

  errorMessages: any = {
    aggrementType: '',
    aggreStDate: '',
    aggreEdDate: '',
    description: null
  };
  onTableDataChange(event: any) {
    this.page = event;
    this.getAllAgreementType();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllAgreementType();
  }
  validateData() {
    let vSts = true;

    if (!this.vldChkLst.blankCheckWithoutAlert(this.aggrementType.trim())) {
      vSts = false;
      this.errorMessages.aggrementType = 'Agreement Type is required.';
    } else {
      this.errorMessages.aggrementType = '';
    }

    if (!this.vldChkLst.blankCheckWithoutAlert(this.aggreStDate)) {
      vSts = false;
      this.errorMessages.aggreStDate = 'Start Date is required.';
    } else {
      this.errorMessages.aggreStDate = '';
    }

    if (!this.vldChkLst.blankCheckWithoutAlert(this.aggreEdDate)) {
      vSts = false;
      this.errorMessages.aggreEdDate = 'End Date is required.';
    } else {
      this.errorMessages.aggreEdDate = '';
    }
    if (this.aggrementTypeDesc.length > 0 && this.aggrementTypeDesc.trim().length === 0) {
      vSts = false;
      this.errorMessages.description = "Space isn't required.";
    } else {
      this.errorMessages.description = '';
    }
    return vSts;
  }

  handleAlphanumericInput(event: any): void {
    const inputElement = event.target as HTMLInputElement;
    inputElement.value = inputElement.value.replace(/[^a-zA-Z0-9]/g, '');
    this.aggrementType = inputElement.value;
  }

  updateMinEndDate(): void {
    const startDateInput = document.getElementById('filter_sdate') as HTMLInputElement;
    if (startDateInput) {
      const startDateValue = startDateInput.value;
      // Set the minimum allowed value for the end date to the selected start date
      document.getElementById('filter_edate')?.setAttribute('min', startDateValue);
      // Ensure the end date is always greater than or equal to the start date
      if (this.aggreEdDate < startDateValue) {
        this.aggreEdDate = startDateValue;
      }
    }
  }

  saveAgreementType() {
    let vSts = this.validateData();
    if (vSts) {
      let param = {
        "aggreEdDate": this.aggreEdDate,
        "aggreStDate": this.aggreStDate,
        "aggreTypeId": null,
        "aggreTypeName": this.aggrementType,
        "description": this.aggrementTypeDesc.trim()
      };
      if (this.aggreStDate < this.aggreEdDate) {
        this.ngxLoader.start();
        this.portalServ.addAgreementType(param).subscribe(res => {
          this.ngxLoader.stop();
          if (res.responseCode == 200 || res.responseCode == 201) {
            this.aggreEdDate = '';
            this.aggreStDate = '';
            this.aggrementType = '';
            this.aggrementTypeDesc = '';
            Swal.fire({
              icon: 'success',
              text: 'Record Saved Successfully'
            });
            this.getAllAgreementType();
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
            text: 'Error in Data Insertion'
          });
        });

      }

      else {
        this.errorMessages.aggreStDate = 'Start date can not be greater than end date.';

      }

    }
  }
  getAllAgreementType() {
    let param = {};
    this.ngxLoader.start();
    this.portalServ.getAllAgreementType(param).subscribe(res => {
      this.ngxLoader.stop();
      console.log("tabledata", res)
      this.tableData = res.data;
      this.allData = res.data;
      this.duplicateTableData = res.data;


    }, error => {
      this.ngxLoader.stop();
    });

  }


  deleteAgreementType(aggreTypeId: any = 0) {
    Swal.fire({
      //icon: 'warning',
      text: "Are you sure you want to Delete the details?",
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      cancelButtonColor: '#df1141'
    }).then((result) => {
      if (result.isConfirmed) {
        let param = {
          "id": aggreTypeId
        };
        this.ngxLoader.start();
        this.portalServ.deleteAgreementType(param).subscribe(res => {
          this.ngxLoader.stop();
          if (res.responseCode == 200) {
            Swal.fire({
              icon: 'success',
              text: 'Record Deleted Successfully'
            });
            this.getAllAgreementType();
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

  }
  editAgreementType(aggreTypeId: any, aggreTypeName: any, aggreStDate: any, description: any, aggreEdDate: any) {
    this.aggreTypeId = aggreTypeId;
    this.aggrementType = aggreTypeName;
    this.aggreStDate = aggreStDate.split('T')[0];
    this.aggrementTypeDesc = description;
    this.aggreEdDate = aggreEdDate.split('T')[0];
    this.scrollToTop();
  }
  cancelUpdateAgreement() {
    // Reset form fields or perform any other necessary actions
    this.aggreEdDate = '';
    this.aggreStDate = '';
    this.aggrementType = '';
    this.aggrementTypeDesc = '';
    this.aggreTypeId = '';

    // Optionally, you can clear any error messages
    this.errorMessages.aggreStDate = '';

    // Call a method to fetch or reset data as needed
    this.getAllAgreementType();
}

  updateAgreementType() {
    let vSts = this.validateData();
    if (vSts) {
      let param = {
        "aggreEdDate": this.aggreEdDate,
        "aggreStDate": this.aggreStDate,
        "aggreTypeId": this.aggreTypeId,
        "aggreTypeName": this.aggrementType,
        "description": this.aggrementTypeDesc.trim()
      };
      if (this.aggreStDate <= this.aggreEdDate) {
        this.ngxLoader.start();
        this.portalServ.updateAgreementType(param).subscribe(res => {

          this.ngxLoader.stop();
          if (res.responseCode == 400) {
            this.aggreEdDate = '';
            this.aggreStDate = '';
            this.aggrementType = '';
            this.aggrementTypeDesc = '';
            this.aggreTypeId = '';
            Swal.fire({
              icon: 'error',
              text: res.message
            });
          } else {
            this.aggreEdDate = '';
            this.aggreStDate = '';
            this.aggrementType = '';
            this.aggrementTypeDesc = '';
            this.aggreTypeId = '';
            Swal.fire({
              icon: 'success',
              text: 'Record Updated Successfully'
            });
            this.getAllAgreementType();



          }

        }, error => {
          this.ngxLoader.stop();
          Swal.fire({
            icon: 'error',
            text: 'Error in Data Update'
          });
        });
      }
      else {
        this.errorMessages.aggreStDate = 'Start date can not be greater than end date.';

      }

    }
  }
  scrollToTop(): void {
    window.scrollTo(0, 0);
  }
  exportAsXLSX(): void {
    debugger;
    let removeColumnData = ['aggreTypeCode', 'aggreTypeId', 'createdBy', 'isActive', 'updatedBy', 'updatedDate'];
    let Heading = [
      ["End Date", "Agreement Type", "Start Date", "Created Date", "Description"]
    ];
    removeColumnData.forEach(e => {
      this.duplicateTableData.forEach(element => {
        delete element[e]
      });
    });
    this.excelService.exportAsExcelFile(this.duplicateTableData, 'agreementtype', Heading);
  }

}
