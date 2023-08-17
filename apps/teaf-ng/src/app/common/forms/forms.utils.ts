import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';

export function markAllControlsAsDirty(
  abstractControls: AbstractControl[],
): void {
  abstractControls.forEach((abstractControl) => {
    if (abstractControl instanceof FormControl) {
      abstractControl.markAsDirty({ onlySelf: true });
    } else if (abstractControl instanceof FormGroup) {
      markAllControlsAsDirty(Object.values(abstractControl.controls));
    } else if (abstractControl instanceof FormArray) {
      markAllControlsAsDirty(abstractControl.controls);
    }
  });
}
