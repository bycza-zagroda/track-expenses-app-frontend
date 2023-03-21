import { FormControl } from '@angular/forms';
import { TServerEntityId } from 'src/app/common/http/common.http.types';

export interface ITransactionCategoryDeletingModalFormType {
  category: FormControl<TServerEntityId | null>;
}
  