import { Injectable } from '@angular/core';



import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class ValidatorchecklistService {

  blankCheck(elmId: any, elmVal: any, msg: any) {


    if (elmVal == '' || typeof (elmVal) == undefined || elmVal == null) {
      Swal.fire({
        icon: 'error',
        text: msg
      }).then(function () {
        if (elmId != "") {
          setTimeout(() => {
            const element = <HTMLInputElement>document.getElementById(elmId);
            element.focus();
            element.scrollIntoView({
              behavior: 'smooth', block:
                'center'
            });
          }, 500);
        }
      });
      return false;
    }
    return true;
  }


  blankImgCheck(elmId: any, elmVal: any, msg: any) {
    if (elmVal == '' || typeof (elmVal) == undefined || elmVal == null) {
      Swal.fire({
        icon: 'error',
        text: 'Please ' + msg
      }).then(function () {
        if (elmId != "") {
          setTimeout(() => {
            const element = <HTMLInputElement>document.getElementById(elmId);
            element.focus();
            element.scrollIntoView({
              behavior: 'smooth', block:
                'center'
            });
          }, 500);
        }
      });
      return false;
    }
    return true;
  }


  blankCheckRdo(elmId: any, elmNm: any, msg: any) {
    let ele = document.getElementsByName(elmNm);
    let checkedCtr: number = 0;
    for (let i = 0; i < ele.length; i++) {
      if ((ele[i] as HTMLInputElement).checked) {
        checkedCtr++;
      }
    }
    if (checkedCtr == 0) {
      Swal.fire({
        icon: 'error',
        text: 'Select ' + msg
      }).then(function () {
        if (elmId != "") {
          setTimeout(() => {
            const element = <HTMLInputElement>document.getElementById(elmId);
            element.focus();
            element.scrollIntoView({
              behavior: 'smooth', block:
                'center'
            });
          }, 500);
        }
      });
      return false;
    }
    return true;
  }



  blankCheckRdoDynamic(elmId: any, clsName: any, msg: any) {
    let className = 'cls_' + clsName;
    let ele = document.getElementsByClassName(className);
    let checkedCtr: number = 0;
    for (let i = 0; i < ele.length; i++) {
      if ((ele[i] as HTMLInputElement).checked) {
        checkedCtr++;
      }
    }
    if (checkedCtr == 0) {
      Swal.fire({
        icon: 'error',
        text: 'Select ' + msg
      }).then(function () {
        if (elmId != "") {
          setTimeout(() => {
            const element = <HTMLInputElement>document.getElementById(elmId);
            element.focus();
            element.scrollIntoView({
              behavior: 'smooth', block:
                'center'
            });
          }, 500);
        }
      });
      return false;
    }
    return true;
  }


  blankCheckChkboxDynamic(elmId: any, clsName: any, msg: any) {
    let className = 'cls_' + clsName;
    let ele = document.getElementsByClassName(className);
    let checkedCtr: number = 0;
    for (let i = 0; i < ele.length; i++) {
      if ((ele[i] as HTMLInputElement).checked) {
        checkedCtr++;
      }
    }
    if (checkedCtr == 0) {
      Swal.fire({
        icon: 'error',
        text: 'Select ' + msg
      }).then(function () {
        if (elmId != "") {
          setTimeout(() => {
            const element = <HTMLInputElement>document.getElementById(elmId);
            element.focus();
            element.scrollIntoView({
              behavior: 'smooth', block:
                'center'
            });
          }, 500);
        }
      });
      return false;
    }
    return true;
  }


  BlankCheckRdoDropChk(elmId: any, elmVal: any, msg: any) {
    if (elmVal == 0 || elmVal == '' || typeof (elmVal) == undefined || elmVal == null) {
      Swal.fire({
        icon: 'error',
        text: 'Select ' + msg
      }).then(function () {
        if (elmId != "") {
          setTimeout(() => {
            const element = <HTMLInputElement>document.getElementById(elmId);
            element.focus();
            element.scrollIntoView({
              behavior: 'smooth', block:
                'center'
            });
          }, 500);
        }
      });
      return false;
    }
    return true;
  }
  maxLength(elmId: any, elmVal: any, fldLngth: any, msg: any) {
    if (elmVal.length > 0 && elmVal.length > fldLngth) {
      Swal.fire({
        icon: 'error',
        text: msg + ' should not more than ' + fldLngth + ' charater'
      }).then(function () {
        if (elmId != "") {
          setTimeout(() => {
            const element = <HTMLInputElement>document.getElementById(elmId);
            element.focus();
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 500);
        }
      });
      return false;
    }
    return true;
  }


  minLength(elmId: any, elmVal: any, fldLngth: any, msg: any) {
    if (elmVal.length > 0 && elmVal.length < fldLngth) {
      Swal.fire({
        icon: 'error',
        text: msg + ' should not be less than ' + fldLngth + ' charater'
      }).then(function () {
        if (elmId != "") {
          setTimeout(() => {
            const element = <HTMLInputElement>document.getElementById(elmId);
            element.focus();
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 500);
        }
      });
      return false;
    }
    return true;
  }



  validEmail(elmId: any, elmVal: any, msg: any) {
    let pattern = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);
    if (elmVal != '') {
      if (pattern.test(elmVal) == true)
        return true;
      else {
        Swal.fire({
          icon: 'error',
          text: 'Please enter a valid ' + msg
        }).then(function () {
          if (elmId != "") {
            setTimeout(() => {
              const element = <HTMLInputElement>document.getElementById(elmId);
              element.focus();
              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 500);
          }
        });
        return false;
      }
    }
    return true;
  }
  validMob(elmId: any, elmVal: any, msg: any) {
    let pattern = new RegExp(/^[7-9][0-9]{9}$/);
    if (elmVal != '') {
      if (pattern.test(elmVal) == true)
        return true;
      else {
        Swal.fire({
          icon: 'error',
          text: 'Please enter a valid ' + msg
        }).then(function () {
          if (elmId != "") {
            setTimeout(() => {
              const element = <HTMLInputElement>document.getElementById(elmId);
              element.focus();
              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 500);
          }
        });
        return false;
      }
    }
    return true;
  }

  validMobile(elmVal:any)
  {
      let pattern = new RegExp(/^[6-9][0-9]{9}$/);
      if (elmVal != '')
      {
          if (pattern.test(elmVal) == true)
            return true;
          else
          {
            Swal.fire({
              icon: 'error',
              text: 'Please enter a valid mobile no'
            });
            return false;
          }
      }
      return true;
  }

  isSpecialCharKey(elmId: any, elmVal: any, msg: any) {
    let pattern = new RegExp(/[!"#$'()*+,/:;<=>[\]^`{|}~]/, 'g');
    if (elmVal != '') {
      if (pattern.test(elmVal) == true) {
        Swal.fire({
          icon: 'error',
          text: 'Special Charecter Not Allowed in' + msg
        }).then(function () {
          if (elmId != "") {
            setTimeout(() => {
              const element = <HTMLInputElement>document.getElementById(elmId);
              element.focus();
              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 500);
          }
        });
        return false;
      }
      else {
        return true;
      }
    }
    return true;
  }


  validPassword(elmId: any, elmVal: any) {
    let pattern = new RegExp(/^.*(?=.{8,15})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&!%()*?]).*$/);
    if (elmVal != '') {
      if (pattern.test(elmVal) == true)
        return true;
      else {
        Swal.fire({
          icon: 'error',
          text: 'Please enter a valid password'
        }).then(function () {
          if (elmId != "") {
            setTimeout(() => {
              const element = <HTMLInputElement>document.getElementById(elmId);
              element.focus();
              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 500);
          }
        });
        return false;
      }
    }
    return true;
  }


  // validates Aadhar number received as string
  validAadhar(elmId: any, elmVal: any) {
    if (elmVal != '') {
      // multiplication table
      const d = [
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
        [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
        [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
        [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
        [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
        [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
        [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
        [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
        [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
      ]


      // permutation table
      const p = [
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
        [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
        [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
        [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
        [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
        [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
        [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
      ]
      let c = 0
      let invertedArray = elmVal.split('').map(Number).reverse()


      invertedArray.forEach((val: any, i: any) => {
        c = d[c][p[(i % 8)][val]]
      })
      if (c === 0)
        return true;
      else {
        Swal.fire({
          icon: 'error',
          text: 'Please enter a valid aadhaar no'
        }).then(function () {
          if (elmId != "") {
            setTimeout(() => {
              const element = <HTMLInputElement>document.getElementById(elmId);
              element.focus();
              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 500);
          }
        });
        return false;
      }
    }
    return true;
  }


  isCharKey(event: any) {
    var charCode2 = (event.which) ? event.which : event.keyCode
    if (charCode2 > 32 && (charCode2 < 65 || charCode2 > 90) &&
      (charCode2 < 97 || charCode2 > 122)) {
      Swal.fire({
        icon: 'error',
        text: 'Only Charecter allowed'
      });
      return false;
    }
    return true;
  }
  isCharecterKey(elmId: any, elmVal: any, msg: any) {
    if (elmVal != '') {
      var val = /^[A-Za-z ]+$/;
      if (val.test(elmVal)) {
        return true;
      }
      else {
        Swal.fire({
          icon: 'error',
          text: msg + ' Only Character Allowed!'
        }).then(function () {
          if (elmId != "") {
            setTimeout(() => {
              const element = <HTMLInputElement>document.getElementById(elmId);
              element.focus();
              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 500);
          }
        });
        return false;
      }
    }
    return true;
  }
  isNumericKey(elmId: any, elmVal: any, msg: any) {
    if (elmVal != '') {
      var val = /^[0-9]+$/;
      if (val.test(elmVal)) {
        return true;
      }
      else {
        Swal.fire({
          icon: 'error',
          text: msg + ' Only Numeric Value Allowed!'
        }).then(function () {
          if (elmId != "") {
            setTimeout(() => {
              const element = <HTMLInputElement>document.getElementById(elmId);
              element.focus();
              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 500);
          }
        });
        return false;
      }
    }
    return true;
  }
  isAlphaNumericKey(elmId: any, elmVal: any, msg: any) {
    if (elmVal != '') {
      var val = /^[0-9a-zA-Z @.-/,]*$/;
      if (val.test(elmVal)) {
        return true;
      }
      else {
        Swal.fire({
          icon: 'error',
          text: msg + ' Only Alpha-Numeric Value Allowed!'
        }).then(function () {
          if (elmId != "") {
            setTimeout(() => {
              const element = <HTMLInputElement>document.getElementById(elmId);
              element.focus();
              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 500);
          }
        });
        return false;
      }
    }
    return true;
  }



  isDecimalKey(elmId: any, elmVal: any, msg: any) {
    if (elmVal != '') {
      var val = /^\d*\.?\d*$/;
      if (val.test(elmVal)) {
        return true;
      }
      else {
        Swal.fire({
          icon: 'error',
          text: msg + ' Only Decimal Value Allowed!'
        }).then(function () {
          if (elmId != "") {
            setTimeout(() => {
              const element = <HTMLInputElement>document.getElementById(elmId);
              element.focus();
              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 500);
          }
        });
        return false;
      }
    }
    return true;
  }


  isCharKeyMob(val: any) {
    return val.replace(/[^a-zA-z ]/g, '');
  }



  isNumberKey( event: any) {
    let charCode = (event.which) ? event.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      Swal.fire({
        icon: 'error',
        text: 'Only Numeric value allowed'
      });
      return false;
    }
    return true;
  }
  isNumberKeyMob(val: any) {
    return val.replace(/[^0-9]/g, '');
  }

  allowNumericDigits(e: any) {	
		if(/\D/g.test(e.target.value)) {
			e.target.value = e.target.value.replace(/\D/g,'');
		}
	}

  allowNumericDigitsWithSlash(e: any) {
    if (/[^\d/]/g.test(e.target.value)) {
      e.target.value = e.target.value.replace(/[^\d/]/g, '');
    }
  }

  allowDigitsWithSlashAndParanthesis(e: any) {
    if (/[^0-9/()a-zA-Z\u0B00-\u0B7F]/g.test(e.target.value)) {
      e.target.value = e.target.value.replace(/[^0-9/()a-zA-Z\u0B00-\u0B7F]/g, '');
    }
  }

  isAlphaNumeric(event: any) {
    const charCode2 = (event.which) ? event.which : event.keyCode
    if (charCode2 > 32 && (charCode2 < 65 || charCode2 > 90) && (charCode2 < 97 || charCode2 > 122) && (charCode2 > 31 && (charCode2 < 48 || charCode2 > 57))) {
      return false;
    }

    return true;
    // debugger
    // var numPattern = new RegExp(/^[0-9a-zA-Z @.-/,]*$/);
    // var txtVal = event.target.value;
    // let space = txtVal.charAt(0);
    // var charCode2 = (event.which) ? event.which : event.keyCode
    // if (event.target.selectionStart === 0 && charCode2 === 32) {
    //   event.preventDefault();
    // }
    // if (txtVal != '') {
    //   if (numPattern.test(txtVal) == true)
    //     return true;
    //   else
    //     Swal.fire({
    //       icon: 'error',
    //       text: 'Only Alpha Numeric value allowed'
    //     });
    //   return false;
    // }
    // else
    //   return true;
  }



  isAlphaNumericMob(val: any) {
    var numPattern = new RegExp(/^[a-zA-Z0-9-.@ /]*$/);
    if (numPattern.test(val))
      return true;
    return false;
  }


  isDecimal( event: any) {
    let charCode = (event.which) ? event.which : event.keyCode;
    var txtVal = event.target.value;
    if ((charCode > 47 && charCode < 58) || charCode == 46 || charCode == 8) {
      if (txtVal.indexOf() > 0 && charCode == 46) {
        Swal.fire({
          icon: 'error',
          text: 'Only Decimal allowed'
        });
        return false
      }
      else
        return true;
    }
    Swal.fire({
      icon: 'error',
      text: 'Only Decimal allowed'
    });
    return false;
  }


  isDecimalMob(val: any) {
    return val.replace(/[^\d+(\.\d{1,2}]/g, '');
  }



  dynCtrlVal(ctrlValParam: any, elemObj: any) {
    let dynData = ctrlValParam['dynDataObj'];
    let elmVal = ctrlValParam['ctrlVal'];
    let drftSts = ctrlValParam['drftSts'];
    let dispNnSts = ctrlValParam['dispNnSts'];
    let sectnCtrlType = ctrlValParam['ctrlType'];
    let elmId = ctrlValParam['dynDataObj'];
    let ctrlNm = '';
    let lblName = '';
    let ctrlType = 0;
    let mndSts = 0;
    let fldLngth = 0;
    if (sectnCtrlType == 8) {
      ctrlNm = '';
      lblName = dynData['columnName'];
      ctrlType = dynData['columnType'];
      mndSts = (dispNnSts === false) ? dynData['columnMnd'] : 0;
      fldLngth = dynData['fieldLen'];
    }
    else {
      ctrlNm = dynData['jsnControlArray'][0]['ctrlName'];
      lblName = dynData['vchLabelName'];
      ctrlType = dynData['tinControlType'];
      mndSts = (dispNnSts === false) ? dynData['tinMandatorySts'] : 0;
      fldLngth = dynData['intFieldLength'];
    }


    let valSts = true;


    // for select tag
    if (mndSts == 1 && ctrlType == 2) {
      if (drftSts == false) {
        if (!this.blankCheckChkboxDynamic(elmId, elmVal, lblName)) {
          valSts = false;
        }
      }
    }
    // for radio button
    else if (mndSts == 1 && (ctrlType == 5 || ctrlType == 1)) {
      if (drftSts == false) {
        if (!this.blankCheckRdoDynamic(elmId, ctrlNm, lblName)) {
          valSts = false;
        }
      }
    }
    // for text box
    else if (mndSts == 1 && ctrlType == 6) {
      ;
      if (drftSts == false) {
        if (!this.blankCheck(elmId, elmVal, lblName)) {
          valSts = false;
          //dynData.focus();
        }
      }
      if (!this.maxLength(elmId, elmVal, fldLngth, lblName)) {
        valSts = false;
        //dynData.focus();
      }
    }
    // for text area
    else if (mndSts == 1 && ctrlType == 7) {
      if (drftSts == false) {
        if (!this.blankCheck(elmId, elmVal, lblName)) {
          valSts = false;
          //dynData.focus();
        }
      }
      if (!this.maxLength(elmId, elmVal, fldLngth, lblName)) {
        valSts = false;
        //dynData.focus();
      }
    }


    // for date box
    else if (mndSts == 1 && ctrlType == 9) {
      if (drftSts == false) {
        if (!this.blankCheck(elmId, elmVal, lblName)) {
          valSts = false;
        }
      }
    }


    // for time box
    else if (mndSts == 1 && ctrlType == 10) {
      if (drftSts == false) {
        if (!this.blankCheck(elmId, elmVal, lblName)) {
          valSts = false;
        }
      }
    }


    // for date time box
    else if (mndSts == 1 && ctrlType == 11) {
      if (drftSts == false) {
        if (!this.blankCheck(elmId, elmVal, lblName)) {
          valSts = false;
        }
      }
    }


    else {
      valSts = true;
    }
    return valSts;
  }


  isDashSlashNumeric(event: any) {
    let charCode = (event.which) ? event.which : event.keyCode
    // console.log(charCode);
    if (charCode > 31 && (charCode < 45 || charCode > 57 || charCode == 46))
      return false;
    return true;
  }
  isDashSlashNumericMob(val: any) {
    return val.replace(/[^0-9/-]/g, '');
  }
  is_url(str: any) {
    let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (regexp.test(str)) {
      return true;
    }
    else {
      Swal.fire({
        icon: 'error',
        text: 'Enter valid URL'
      });
      return false;
    }
  }
  chkPassword(str: any) {
    let regexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (regexp.test(str)) {
      return true;
    }
    else {


      return false;
    }
  }
  chkblankspace(str: any) {
    var regexp = /^\S*$/
    if (regexp.test(str)) {
      return true;
    }
    else {
      Swal.fire({
        icon: 'error',
        text: 'Space not allowed'
      });
      return false;
    }
  }
  validateFile(fileUploadType: string, actualFileType: any) {
    if (actualFileType.includes(fileUploadType)) {
      return true;
    } else {
      return false;
    }
    // var ext = fileUploadType.substring(fileUploadType.lastIndexOf('/') + 1);
    // const fileTypes: any =
    // {
    //   'pdf': ['pdf'],
    //   'image': ['jpeg', 'jpg', 'jif', 'jfif', 'png', 'gif', 'webp'],
    //   'excel': ['csv', 'dbf', 'dif', 'htm', 'html', 'mht', 'mhtml', 'ods', 'pdf', 'prn', 'slk', 'txt', 'xla', 'xlam', 'xls', 'xlsb', 'xlsm', 'xlsx', 'xlt', 'xltm', 'xls', 'xlsb', 'xlsm', 'xlsx', 'xlt', 'xlw', 'xps', 'vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'vnd.ms-excel'],
    //   'doc': ['doc', 'docm', 'docx', 'dot', 'dotm', 'dotx', 'htm', 'html', 'mht', 'mhtml', 'odt', 'pdf', 'rtf', 'txt', 'wps', 'xml', 'xps'],
    //   'video': ['mp4', '.ogx', '.oga', '.ogv', '.ogg', '.webm']
    // };
    // if (fileTypes[actualFileType].includes(ext)) {
    //   return true;
    // }
    // else {
    //   return false;
    // }
  }
  validateFileSize(uploadedFileSize: any, actualFileSize: any, actualFileSizeType: any) {
    if (actualFileSizeType.toLowerCase() == 'kb') {
      actualFileSize = 1024 * actualFileSize;
    }
    else {
      actualFileSize = 1024 * 1024 * actualFileSize;
    }


    let fileValidStatus = true;
    if (uploadedFileSize > actualFileSize) {
      fileValidStatus = false;
    }
    return fileValidStatus;
  }


  tablenameval(obj: any) {
    obj.target.value = obj.target.value.toUpperCase().replaceAll('-', '_');
  }
  isValidNumberKey(elmId: any, elmVal: any, msg: any) {
    var val = /^[0-9]+$/;
    if (val.test(elmVal)) {
      return true;
    }
    else {
      Swal.fire({
        icon: 'error',
        text: msg + ' Only Numbers Allowed!'
      }).then(function () {
        if (elmId != "") {
          setTimeout(() => {
            const element = <HTMLInputElement>document.getElementById(elmId);
            element.focus();
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 500);
        }
      });
      return false;
    }
  }
  blockspecialchar_first( evt: any) {
    let validStatus = true;
    let txtValue: string = evt.target.value;
    switch (txtValue.charCodeAt(0)) {
      case 44:
        {
          Swal.fire({
            icon: 'error',
            text: ', ' + 'Not allowed in 1st Place' + '!!!'
          });
          validStatus = false;
          break;
        }
      case 47:
        {
          Swal.fire({
            icon: 'error',
            text: '/ ' + 'Not allowed in 1st Place' + '!!!'
          });
          validStatus = false;
          break;
        }
      case 58:
        {
          Swal.fire({
            icon: 'error',
            text: ': ' + 'Not allowed in 1st Place' + '!!!'
          });
          validStatus = false;
          break;
        }
      case 46:
        {
          Swal.fire({
            icon: 'error',
            text: '. ' + 'Not allowed in 1st Place' + '!!!'

          });
          validStatus = false;
          break;
        }
      case 39:
        {
          Swal.fire({
            icon: 'error',
            text: 'Single Quote not allowed in 1st Place' + '!!!'
          });
          validStatus = false;
          break;
        }
      case 32:
        {
          Swal.fire({
            icon: 'error',
            text: 'White Space not allowed in 1st Place' + '!!!'
          });
          validStatus = false;
          break;
        }
      case 40:
        {
          Swal.fire({
            icon: 'error',
            text: 'Not allowed in 1st Place' + '!!!'
          });
          validStatus = false;
          break;
        }
      case 41:
        {
          Swal.fire({
            icon: 'error',
            text: ') ' + 'Not allowed in 1st Place' + '!!!'
          });
          validStatus = false;
          break;
        }
      case 45:
        {
          Swal.fire({
            icon: 'error',
            text: '- ' + 'Not allowed in 1st Place' + '!!!'
          });
          validStatus = false;
          break;
        }
      case 95:
        {
          Swal.fire({
            icon: 'error',
            text: '"_ ' + 'Not allowed in 1st Place' + '!!!'
          });
          validStatus = false;
          break;
        }
      case 59:
        {
          Swal.fire({
            icon: 'error',
            text: '"; ' + 'Not allowed in 1st Place' + '!!!'
          });
          validStatus = false;
          break;
        }
      case 124:
        {
          Swal.fire({
            icon: 'error',
            text: '"| ' + 'Not allowed in 1st Place' + '!!!'
          });
          validStatus = false;
          break;
        }
      case 63:
        {
          Swal.fire({
            icon: 'error',
            text: '"? ' + 'Not allowed in 1st Place' + '!!!'
          });
          validStatus = false;
          break;
        }
      case 34:
        {
          Swal.fire({
            icon: 'error',
            text: '" ' + 'Not allowed in 1st Place' + '!!!'
          });
          validStatus = false;
          break;
        }
      case 35:
        {
          Swal.fire({
            icon: 'error',
            text: '# ' + 'Not allowed in 1st Place' + '!!!'
          });
          validStatus = false;
          break;
        }
      case 36:
        {
          Swal.fire({
            icon: 'error',
            text: '$ ' + 'Not allowed in 1st Place' + '!!!'
          });
          validStatus = false;
          break;
        }
      case 38:
        {
          Swal.fire({
            icon: 'error',
            text: '& ' + 'Not allowed in 1st Place' + '!!!'
          });
          validStatus = false;
          break;
        }
      case 126:
        {
          Swal.fire({
            icon: 'error',
            text: '~ ' + 'Not allowed in 1st Place' + '!!!'
          });
          validStatus = false;
          break;
        }
      case 96:
        {
          Swal.fire({
            icon: 'error',
            text: '` ' + 'Not allowed in 1st Place' + '!!!'
          });
          validStatus = false;
          break;
        }
      case 33:
        {
          Swal.fire({
            icon: 'error',
            text: '! ' + 'Not allowed in 1st Place' + '!!!'
          });
          validStatus = false;
          break;
        }
      case 37:
        {
          Swal.fire({
            icon: 'error',
            text: '% ' + 'Not allowed in 1st Place' + '!!!'
          });
          validStatus = false;
          break;
        }
      case 94:
        {
          Swal.fire({
            icon: 'error',
            text: '^ ' + 'Not allowed in 1st Place' + '!!!'
          });
          validStatus = false;
          break;
        }
      case 42:
        {
          Swal.fire({
            icon: 'error',
            text: '* ' + 'Not allowed in 1st Place' + '!!!'
          });
          validStatus = false;
          break;
        }
      case 92:
        {
          Swal.fire({
            icon: 'error',
            text: '\\ ' + 'Not allowed in 1st Place' + '!!!'
          });
          validStatus = false;
          break;
        }
      case 43:
        {
          Swal.fire({
            icon: 'error',
            text: '+ ' + 'Not allowed in 1st Place' + '!!!'
          });
          validStatus = false;
          break;
        }
      case 61:
        {
          Swal.fire({
            icon: 'error',
            text: '= ' + 'Not allowed in 1st Place' + '!!!'
          });
          validStatus = false;
          break;
        }
      case 123:
        {
          Swal.fire({
            icon: 'error',
            text: '{ ' + 'Not allowed in 1st Place' + '!!!'
          });
          validStatus = false;
          break;
        }
      case 125:
        {
          Swal.fire({
            icon: 'error',
            text: '} ' + 'Not allowed in 1st Place' + '!!!'
          });
          validStatus = false;
          break;
        }
      case 91:
        {
          Swal.fire({
            icon: 'error',
            text: '[ ' + 'Not allowed in 1st Place' + '!!!'
          });
          validStatus = false;
          break;
        }
      case 93:
        {
          Swal.fire({
            icon: 'error',
            text: '] ' + 'Not allowed in 1st Place' + '!!!'
          });
          validStatus = false;
          break;
        }
      case 60:
        {
          Swal.fire({
            icon: 'error',
            text: '< ' + 'Not allowed in 1st Place' + '!!!'
          });
          validStatus = false;
          break;
        }
      case 62:
        {
          Swal.fire({
            icon: 'error',
            text: '> ' + 'Not allowed in 1st Place' + '!!!'
          });
          validStatus = false;
          break;
        }
      case 64:
        {
          Swal.fire({
            icon: 'error',
            text: '@ ' + 'Not allowed in 1st Place' + '!!!'
          });
          validStatus = false;
          break;
        }
      default:
        validStatus = true;
        break;
    }
    if (validStatus == false) {
      // (<HTMLInputElement>document.getElementById(evt.target.id)).value='';
      evt.target.value = '';
    }
    return validStatus;
  }
  selectDropdown(elmVal:any, msg:any)
  {
      if(elmVal == 0 || elmVal == '' || typeof (elmVal) == undefined || elmVal == null)
      {
        Swal.fire({
          icon: 'error',
          text: 'Select '+' '+msg
        });
        return false;
      }
      return true;
  }

}