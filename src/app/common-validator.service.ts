import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const CommonValidatorService = {

  // Custom validator for full name
  fullNameValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const fullName: string = control.value;
    if (fullName != null) {
      // Split the full name into words using whitespace as the delimiter
      const words = fullName.trim().split(/\s+/);

      // Check if there are at least two words in the full name
      // if (words.length < 2) {
      //   return { 'fullNameInvalid': true };
      // }

      // Check if the full name contains any special characters or numbers
      const specialCharactersRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]/;
      if (specialCharactersRegex.test(fullName)) {
        return { 'fullNameContainsSpecialChars': true };
      }
    }
     // Check if the full name is less than 50 characters
     if (fullName.length >= 50) {
      return { 'fullNameTooLong': true };
    }

    if (fullName.length <= 2) {
      return { 'fullNameTooSmall': true };
    }

    // Return null if the full name is valid
    return null;
  },


  // Custom password validator
validatePassword(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value;

  // Space validation
  if (/\s/.test(value)) {
    return { 'space': true };
  }
  
  // Password length validation
  if (value.length < 8) {
    return { 'length': true };
  }

  // Uppercase letter validation
  if (!/[A-Z]/.test(value)) {
    return { 'uppercase': true };
  }

  // Lowercase letter validation
  if (!/[a-z]/.test(value)) {
    return { 'lowercase': true };
  }

  // Number validation
  if (!/\d/.test(value)) {
    return { 'number': true };
  }

  // Special character validation
  if (!/[!@#$%^&*()_+[\]{}|;:'",.<>?]/.test(value)) {
    return { 'specialCharacter': true };
  }

  

  return null;
},
  validateEmail(control: AbstractControl): ValidationErrors | null {
  // Allow null or empty values
  const email: string | null = control.value;

  // If email is null or empty, consider it valid
  if (email === null || email.trim() === '') {
    return null;
  }

  // Email format validation using a regular expression
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailPattern.test(email)) {
    return { 'emailFormat': true };
  }

  return null;
},
validatePan(control: AbstractControl): ValidationErrors | null {

  // Allow null or empty values
  const pan: string | null = control.value;
  // If email is null or empty, consider it valid
  if (pan === null || pan.trim() === '') {
    return null;
  }
  // Email format validation using a regular expression
  const panPattern = /^[A-Za-z]{5}[0-9]{4}[A-Za-z]$/;
  if (!panPattern.test(pan)) {
    return { 'panFormat': true };
  }
  return null;
}
}

