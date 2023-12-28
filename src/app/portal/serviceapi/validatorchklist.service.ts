import { Injectable } from '@angular/core';
import { FormControlName } from '@angular/forms';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ValidatorchklistService {
  constructor() { }
  blankCheck(elmVal: any, msg: any) {
    let ele = document.getElementsByName(elmVal);
    if (elmVal == '' || typeof (elmVal) == undefined || elmVal == null) {
      Swal.fire({
        //icon: 'error',
        text: 'Please Enter ' + msg
      })
      return false;
    }
    return true;
  }

  blankCheckWithoutAlert(elmVal: any) {
    let ele = document.getElementsByName(elmVal);
    if (elmVal == '' || typeof (elmVal) == undefined || elmVal == null) {

      return false;
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

  blankFirstCharacter(e: any) {
    this.blockspecialchar_first(e)
    //this.blockspecialchar(e)
  }

  //============ Function to block special characters on first place of the field on key press ===============
  blockspecialchar_first(e: any) {
    var str;
    str = e.target.value;
    //var idName = e.id;
    switch (str.charCodeAt(0)) {
      case 44:
        {
          //viewAlert(", Not allowed in 1st Place!!!", idName);
          e.target.value = "";
          e.target.focus();
          return false;
        }

      case 47:
        {
          //viewAlert("/ Not allowed in 1st Place!!!", idName);
          e.target.value = "";
          e.target.focus();
          return false;
        }

      case 58:
        {
          //viewAlert(": Not allowed in 1st Place!!!", idName);
          e.target.value = "";
          e.target.focus();
          return false;
        }

      case 46:
        {
          //viewAlert(". Not allowed in 1st Place!!!", idName);
          e.target.value = "";
          e.target.focus();
          return false;
        }

      case 39:
        {
          //viewAlert("Single Quote not allowed in 1st Place!!!", idName);
          e.target.value = "";
          e.target.focus();
          return false;
        }

      case 32:
        {
          //viewAlert("White Space not allowed in 1st Place!!!", idName);
          e.target.value = "";
          e.target.focus();
          return false;
        }

      case 40:
        {
          //viewAlert("( Not allowed in 1st Place!!!", idName);
          e.target.value = "";
          e.target.focus();
          return false;
        }

      case 41:
        {
          //viewAlert(") Not allowed in 1st Place!!!", idName);
          e.target.value = "";
          e.target.focus();
          return false;
        }

      case 45:
        {
          //viewAlert("- Not allowed in 1st Place!!!", idName);
          e.target.value = "";
          e.target.focus();
          return false;
        }

      case 95:
        {
          //viewAlert("_ Not allowed in 1st Place!!!", idName);
          e.target.value = "";
          e.target.focus();
          return false;
        }

      case 59:
        {
          //viewAlert("; Not allowed in 1st Place!!!", idName);
          e.target.value = "";
          e.target.focus();
          return false;
        }

      case 124:
        {
          //viewAlert("| Not allowed in 1st Place!!!", idName);
          e.target.value = "";
          e.target.focus();
          return false;
        }

      case 63:
        {
          //viewAlert("? Not allowed in 1st Place!!!", idName);
          e.target.value = "";
          e.target.focus();
          return false;
        }

      /*case 64:
       {
       viewAlert("@ Not allowed in 1st Place!!!");
       e.target.value = "";
       e.target.focus();
       return false;
       }*/

      case 34:
        {
          //viewAlert('" Not allowed in 1st Place!!!', idName);
          e.target.value = "";
          e.target.focus();
          return false;
        }

      case 35:
        {
          //viewAlert("# Not allowed in 1st Place!!!", idName);
          e.target.value = "";
          e.target.focus();
          return false;
        }

      case 36:
        {
          //viewAlert("$ Not allowed in 1st Place!!!", idName);
          e.target.value = "";
          e.target.focus();
          return false;
        }

      case 38:
        {
          //viewAlert("& Not allowed in 1st Place!!!", idName);
          e.target.value = "";
          e.target.focus();
          return false;
        }

      case 126:
        {
          //viewAlert("~ Not allowed in 1st Place!!!", idName);
          e.target.value = "";
          e.target.focus();
          return false;
        }

      case 96:
        {
          //viewAlert("` Not allowed in 1st Place!!!", idName);
          e.target.value = "";
          e.target.focus();
          return false;
        }

      case 33:
        {
          //viewAlert("! Not allowed in 1st Place!!!", idName);
          e.target.value = "";
          e.target.focus();
          return false;
        }

      case 37:
        {
          //viewAlert("% Not allowed in 1st Place!!!", idName);
          e.target.value = "";
          e.target.focus();
          return false;
        }

      case 94:
        {
          //viewAlert("^ Not allowed in 1st Place!!!", idName);
          e.target.value = "";
          e.target.focus();
          return false;
        }

      case 42:
        {
          //viewAlert("* Not allowed in 1st Place!!!", idName);
          e.target.value = "";
          e.target.focus();
          return false;
        }
      case 92:
        {
          //viewAlert("\\ Not allowed in 1st Place!!!", idName);
          e.target.value = "";
          e.target.focus();
          return false;
        }

      case 43:
        {
          //viewAlert("+ Not allowed in 1st Place!!!", idName);
          e.target.value = "";
          e.target.focus();
          return false;
        }
      case 61:
        {
          //viewAlert("= Not allowed in 1st Place!!!", idName);
          e.target.value = "";
          e.target.focus();
          return false;
        }
      case 123:
        {
          //viewAlert("{ Not allowed in 1st Place!!!", idName);
          e.target.value = "";
          e.target.focus();
          return false;
        }

      case 125:
        {
          //viewAlert("} Not allowed in 1st Place!!!", idName);
          e.target.value = "";
          e.target.focus();
          return false;
        }

      case 91:
        {
          //viewAlert("[ Not allowed in 1st Place!!!", idName);
          e.target.value = "";
          e.target.focus();
          return false;
        }

      case 93:
        {
          //viewAlert("] Not allowed in 1st Place!!!", idName);
          e.target.value = "";
          e.target.focus();
          return false;
        }

      case 60:
        {
          //viewAlert("< Not allowed in 1st Place!!!", idName);
          e.target.value = "";
          e.target.focus();
          return false;
        }

      case 62:
        {
          //viewAlert("> Not allowed in 1st Place!!!", idName);
          e.target.value = "";
          e.target.focus();
          return false;
        }
      case 64:
        {
          //viewAlert("@ Not allowed in 1st Place!!!", idName);
          e.target.value = "";
          e.target.focus();
          return false;
        }
      default:
        return true;
    }

  }

  blockspecialchar(event: any) {


    switch (event.which) {
      case 49:
        {
          return false;
        }

      case 47:
        {
          return false;
        }

      case 58:
        {
          return false;
        }

      case 46:
        {
          return false;
        }

      case 39:
        {
          return false;
        }

      case 32:
        {
          return false;
        }

      case 40:
        {
          return false;
        }

      case 41:
        {
          return false;
        }

      case 45:
        {
          return false;
        }

      case 95:
        {
          return false;
        }

      case 59:
        {
          return false;
        }

      case 124:
        {
          return false;
        }

      case 63:
        {
          return false;
        }

      case 64:
        {
          return false;
        }

      case 34:
        {
          return false;
        }

      case 35:
        {
          return false;
        }

      case 36:
        {
          return false;
        }

      case 38:
        {
          return false;
        }

      case 126:
        {
          return false;
        }

      case 96:
        {
          return false;
        }

      case 33:
        {
          return false;
        }

      case 37:
        {
          return false;
        }

      case 94:
        {
          return false;
        }

      case 42:
        {
          return false;
        }
      case 92:
        {
          return false;
        }

      case 43:
        {
          return false;
        }
      case 61:
        {
          return false;
        }
      case 123:
        {
          return false;
        }

      case 125:
        {
          return false;
        }

      case 91:
        {
          return false;
        }

      case 93:
        {
          return false;
        }

      case 60:
        {
          return false;
        }

      case 62:
        {
          return false;
        }
      default:
        return true;
    }
  }

  blankImgCheck(elmVal: any, msg: any) {
    if (elmVal == '' || typeof (elmVal) == undefined || elmVal == null) {
      Swal.fire({
        //icon: 'error',
        text: 'Please ' + msg
      });
      return false;
    }
    return true;
  }

  validateAlphaNumeric(elmVal: any) {
    const alphaNumericRegex = /^[a-zA-Z0-9]+$/;
    if (!alphaNumericRegex.test(elmVal)) {
      Swal.fire({
        text: `Please enter valid input`,
      });
      return false;
    }
    return true;
  }


  blankCheckRdo(elmNm: any, msg: any) {
    let ele = document.getElementsByName(elmNm);
    let checkedCtr = 0;
    for (let i = 0; i < ele.length; i++) {

      if ((ele[i] as HTMLInputElement).checked) {
        checkedCtr++;
      }

    }
    // if(checkedCtr==0)
    // {
    //     Swal.fire({
    //       //icon: 'error',
    //       text: 'Please Select '+msg
    //     });

    //     return false;
    // }
    return true;
  }

  selectDropdown(elmVal: any, msg: any) {
    if (elmVal == 0 || elmVal == '' || typeof (elmVal) == undefined || elmVal == null) {
      Swal.fire({
        //icon: 'error',
        text: 'Please Select ' + msg
      })
      return false;
    }
    return true;
  }

  selectDropdownWithoutAlert(elmVal: any) {
    if (elmVal == 0 || elmVal == '' || typeof (elmVal) == undefined || elmVal == null) {
      
      return false;
    }
    return true;
  }
  maxLength(elmVal: any, fldLngth: any, msg: any) {
    if (elmVal.length > 0 && elmVal.length > fldLngth) {
      Swal.fire({
        //icon: 'error',
        text: msg + ' should not more than ' + fldLngth + ' character'
      });
      return false;
    }
    return true;
  }

  minLength(elmVal: any, fldLngth: any, msg: any) {
    if (elmVal.length > 0 && elmVal.length < fldLngth) {
      Swal.fire({
        //icon: 'error',
        text: msg + ' should not be less than ' + fldLngth + ' character'
      });
      return false;
    }
    return true;
  }
  /**
   * Function name:validAadhaar
   * description :This method check valid aadhar or not
   * created by  : Rasmi ranjan swain
   * created on  : 10-05-2022
   * return type : string
   */
  validAadhaar(elmVal: any) {
    if (elmVal != '') {
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
      let invertedArray = elmVal.split('').map(Number).reverse();
      invertedArray.forEach((val: any, i: any) => {
        c = d[c][p[(i % 8)][val]]
      });
      if (c === 0) {
        return true;
      } else {
        Swal.fire({
          //icon: 'error',
          text: 'Please Enter a Valid Aadhaar No.'
        });
        return false;
      }
      return true;
    }
    return true;
  }

  validEmail(elmVal: any) {
    let pattern = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);
    if (elmVal != '') {
      if (pattern.test(elmVal) == true)
        return true;
      else {
        Swal.fire({
          //icon: 'error',
          text: 'Please Enter a Valid email id'
        });
        return false;
      }
    }
    return true;
  }
  validMob(elmVal: any) {
    let pattern = new RegExp(/^[6-9][0-9]{9}$/);
    if (elmVal != '') {
      if (pattern.test(elmVal) == true)
        return true;
      else {
        Swal.fire({
          //icon: 'error',
          text: 'Please Enter a valid Mobile Number'
        });
        return false;
      }
    }
    return true;
  }

  allowNumericDigits(e: any) {
    if (/\D/g.test(e.target.value)) {
      e.target.value = e.target.value.replace(/\D/g, '');
    }
  }

  allowNumericDigitsDecimal(e: any) {
    // Allow up to four digits, including decimal point
    if (!/^\d{0,4}(\.\d{0,2})?$/.test(e.target.value)) {
      // Remove non-numeric and extra decimal point characters
      e.target.value = e.target.value.replace(/[^\d.]/g, '');
      // Remove extra decimal points
      const parts = e.target.value.split('.');
      e.target.value = parts[0] + (parts.length > 1 ? '.' + parts[1].slice(0, 2) : '');
    }
  }
  

  allowNumericDigitsWithSlash(e: any) {
    if (/[^\d/]/g.test(e.target.value)) {
      e.target.value = e.target.value.replace(/[^\d/]/g, '');
    }
  }

  allowNumericDigitsWithAlpha(e: any) {
    if (/[^a-zA-Z0-9/]/g.test(e.target.value)) {
      e.target.value = e.target.value.replace(/[^a-zA-Z0-9/]/g, '');
    }
  }

  allowAlpha(e: any) {
    if (/[^a-zA-Z/]/g.test(e.target.value)) {
      e.target.value = e.target.value.replace(/[^a-zA-Z/]/g, '');
    }
  }

  allowAlphaWithSpace(e: any) {
    if (/[^a-zA-Z\s/]/g.test(e.target.value)) {
      e.target.value = e.target.value.replace(/[^a-zA-Z\s/]/g, '');
    }
  }

  AllowAlphanumericWithSpace(e: any) {
    if (/[^a-zA-Z\s]/g.test(e.target.value)) {
      e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    }
  }
  allowNumericDigitsWithoutZero(e: any) {	
    debugger;
    let isValidEventValue = (e.target.value !== undefined || e.target.value.length === 1) 
    && (e.keyCode === 48)
		if(/\D/g.test(e.target.value)) {
			e.target.value = e.target.value.replace(/\D/g,'');
		} else if(isValidEventValue) {
      e.target.value = '';
    }
	}



  /*
  Function Name : validMobileOptinalField
  Desc : validatate optional mobile number field
  Created By : Gopinath Jena
  Created On : 16.03.2022
  Return Type : boolean
  */
  validMobOptinalField(elmVal: any) {
    console.log(elmVal);
    let pattern = new RegExp(/^[7-9][0-9]{9}$/);
    if (elmVal != null) {
      if (pattern.test(elmVal) == true)
        return true;
      else {
        Swal.fire({
          //icon: 'error',
          text: 'Please Enter a Valid Mobile Number'
        });
        return false;
      }
    }
    return true;
  }

  /*
  Function Name : Hide Digit
  Desc : hide number ex: ********6633
  Created By : Gopinath Jena
  Created On : 18.03.2022
  Return Type : string
  */
  hideDigit(elmVal: any) {

    if (elmVal != '' || typeof (elmVal) != undefined || elmVal != null) {
      const replaced = elmVal.slice(2).replace(/.(?=.....)/g, '*');
      return replaced;
    }


  }

  validPassword(elmVal: any) {
    let pattern = new RegExp(/^.*(?=.{8,15})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&!%()*?]).*$/);
    if (elmVal != '') {
      if (pattern.test(elmVal) == true)
        return true;
      else {
        Swal.fire({
          //icon: 'error',
          text: 'Please Enter a Valid Password'
        });
        return false;
      }
    }
    return true;
  }

  isCharKey(event: any) {
    let charCode = (event.which) ? event.which : event.keyCode
    if ((charCode > 31 && (charCode < 48 || charCode > 57)) || charCode == 13 || charCode == 8)
      return true;
    return false;
  }

  isNumberKey(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
      return false;
    return true;
  }

  isDecimalKey(evt: any) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if ((charCode > 47 && charCode < 58) || charCode == 46 || charCode == 8) {
      if (evt.target.value.indexOf(".") > 0 && charCode == 46)
        return false;
      else
        return true;
    }
    return false;
  }
  isAlphaNumeric(event: any) {
    var numPattern = new RegExp(/^[0-9a-zA-Z]*$/);
    var txtVal = event.target.value;
    if (txtVal != '') {
      if (numPattern.test(txtVal) == true)
        return true;
      else
        return false;
    }
    else
      return true;
  }
  /** This Function Use to only character and space validation :: Added By : Bindurekha Nayak :: On : 25-02-2022 * */
  keyPressAlphanumeric(event: any) {

    var inp = String.fromCharCode(event.keyCode);
    let inp1 = inp.trim();
    if (inp.length != inp1.length)
      return false;
    if (/^[a-zA-Z ]*$/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  /** This Function Use to only character and space validation :: Added By : Ranjit Kumar sahu :: On : 24-03-2022 * */
  checkSpcialChar(event: any) {
    if (!((event.keyCode >= 65) && (event.keyCode <= 90) || (event.keyCode >= 97) && (event.keyCode <= 122) || (event.keyCode >= 48) && (event.keyCode <= 57))) {
      event.returnValue = false;
      return;
    }
    event.returnValue = true;
  }
  //   checkSpecialChar(event:any) {

  //     var format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;

  // if(String.match(format) ){
  //   return true;
  // }else{
  //   return false;
  // }
  //   }
  /**
     * Function name:maskmobileno
     * description : this function will return masked Mobile No
     * created by  : Rasmi Ranjan Swain
     * created on  : 26-03-2022
     * return type : string
     */
  maskmobileno(elmVal: any) {
    if (elmVal == undefined || elmVal == null || elmVal == "") {
      return elmVal;
    } else {
      const elmVal1 = elmVal.toString();
      const replaced = `xxxxxx${elmVal1.substring(6)}`;
      return replaced;
    }
  }

  /**
     * Function name:onlyCharAndSpace
     * description : this function accpet only charactor and space
     * created by  : Gopnath Jena
     * created on  : 15-04-2022
     * return type : string
     */
  onlyCharAndSpace(e: any) {
    if ((e.which < 65 && e.which != 32) ||
      (e.which > 90 && e.which < 97) ||
      e.which > 122) {
      return false
    }
    return true
  }

  dynCtrlVal(ctrlValParam: any, elemObj: any) {

    let dynData = ctrlValParam['dynDataObj'];
    let elmVal = ctrlValParam['ctrlVal'];
    let drftSts = ctrlValParam['drftSts'];
    let dispNnSts = ctrlValParam['dispNnSts'];
    let sectnCtrlType = ctrlValParam['ctrlType'];
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
        if (!this.selectDropdown(elmVal, lblName)) {
          valSts = false;
        }
      }
    }
    // for radio button
    else if (mndSts == 1 && ctrlType == 5) {
      if (drftSts == false) {
        // if(!this.blankCheckRdo(ctrlNm,lblName))
        // {
        valSts = true;
        // } 
      }
    }
    // for text box
    else if (mndSts == 1 && ctrlType == 6) {
      if (drftSts == false) {
        if (!this.blankCheck(elmVal, lblName)) {
          valSts = false;
          //dynData.focus();
        }
      }
      if (!this.maxLength(elmVal, fldLngth, lblName)) {
        valSts = false;
        //dynData.focus();
      }
    }
    // for text area
    else if (mndSts == 1 && ctrlType == 7) {
      if (drftSts == false) {
        if (!this.blankCheck(elmVal, lblName)) {
          valSts = false;
          //dynData.focus();
        }
      }
      if (!this.maxLength(elmVal, fldLngth, lblName)) {
        valSts = false;
        //dynData.focus();
      }
    }

    // for date box
    else if (mndSts == 1 && ctrlType == 9) {
      if (drftSts == false) {
        if (!this.blankCheck(elmVal, lblName)) {
          valSts = false;
        }
      }
    }

    // for time box
    else if (mndSts == 1 && ctrlType == 10) {
      if (drftSts == false) {
        if (!this.blankCheck(elmVal, lblName)) {
          valSts = false;
        }
      }
    }

    // for date time box
    else if (mndSts == 1 && ctrlType == 11) {
      if (drftSts == false) {
        if (!this.blankCheck(elmVal, lblName)) {
          valSts = false;
        }
      }
    }

    else {
      valSts = true;
    }
    return valSts;
  }


}
