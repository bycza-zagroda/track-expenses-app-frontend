import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';

export class FormsUtils {
  public static markAllControlsAsDirty(abstractControls: AbstractControl[]): void {
    abstractControls.forEach(abstractControl => {
      if (abstractControl instanceof FormControl) {
        (abstractControl as FormControl).markAsDirty({onlySelf: true});
      } else if (abstractControl instanceof FormGroup) {
        this.markAllControlsAsDirty(Object.values((abstractControl as FormGroup).controls));
      } else if (abstractControl instanceof FormArray) {
        this.markAllControlsAsDirty((abstractControl as FormArray).controls);
      }
    });
  }
}
