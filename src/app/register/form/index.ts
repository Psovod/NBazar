import { ValidatorFn, Validators } from '@angular/forms';

export interface RegisterForm {
  id: string;
  type: string;
  validators: Array<ValidatorFn>;
  name: string;
  error: string;
}

export const registerForm: Array<RegisterForm> = [
  {
    id: 'name',
    type: 'text',
    validators: [Validators.required],
    name: 'Jméno',
    error: 'Jméno je povinné',
  },
  {
    id: 'surname',
    type: 'text',
    validators: [Validators.required],
    name: 'Příjmení',
    error: 'Příjmení je povinné',
  },
  {
    id: 'email',
    type: 'email',
    validators: [Validators.required, Validators.email],
    name: 'Emailová adresa',
    error: 'Emailová adresa je povinná a musí být ve správném formátu',
  },
  {
    id: 'password',
    type: 'password',
    validators: [Validators.required],
    name: 'Heslo',
    error: 'Heslo je povinné',
  },
  {
    id: 'passwordConfirm',
    type: 'password',
    validators: [Validators.required],
    name: 'Potvrzení hesla',
    error: 'Potvrzení hesla je povinné',
  },
];
