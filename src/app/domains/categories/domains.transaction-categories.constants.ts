import { TServerEntityId } from 'src/app/common/http/common.http.types';
import { environment } from 'src/environments/environment';

export const API_TRANSACTION_CATEGORIES_URL = environment.apiUrl + '/categories';

export const API_TRANSACTION_CATEGORY_FULL_URL = (id: TServerEntityId): string =>
  (`${API_TRANSACTION_CATEGORIES_URL}/${id}`);
