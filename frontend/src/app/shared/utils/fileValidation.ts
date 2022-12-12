import {AbstractControl, FormControl, FormGroup} from "@angular/forms";

export function validateAllFormFields(formGroup: FormGroup) {
  Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control?.disabled !== true) {
        if (control instanceof FormControl) {
          control.markAsTouched({onlySelf: true});
        } else if (control instanceof FormGroup) {
          validateAllFormFields(control);
        }
      }
    }
  );
}

export function hexCodeValidator(control: AbstractControl) {
  if (!control.disabled) {
    let validationRegex = new RegExp('^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$')
    let isValid = validationRegex.test(control.value)

    return isValid ? null : {VHexCode: true}
  }
  return null
}
