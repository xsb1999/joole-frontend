import { AbstractControl } from '@angular/forms';

//  control refer to the whole form group encompassing the different fields being validated
export function PasswordValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const password = control.get('userPassword');
  const confirmPassword = control.get('confirmPassword');

  if (password?.pristine || confirmPassword?.pristine) {
    return null;
  }
  return password && confirmPassword && password.value !== confirmPassword.value ?
    { 'misMatch': true } : null;
}