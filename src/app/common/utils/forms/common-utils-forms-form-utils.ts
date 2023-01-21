import { FormGroup } from '@angular/forms';

export function checkInputError(form: FormGroup, inputName: string, errorType: string): boolean {
  return !!(form.get(inputName)?.invalid
    && form.get(inputName)?.touched
    && form.get(inputName)?.errors?.[errorType]
  );
}
