import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ICategoryResponse,
  ICategoryPayload,
  IFullCategoryResponse,
} from './categories.types';
import { TServerEntityId } from '../../common/types';

const BASE_URL = '/api/categories';

@Injectable({
  providedIn: 'root',
})
export class CategoriesGatewayService {
  public constructor(private readonly http: HttpClient) {}

  public getCategories(): Observable<ICategoryResponse[]> {
    return this.http.get<ICategoryResponse[]>(BASE_URL);
  }

  public deleteCategory(id: TServerEntityId): Observable<unknown> {
    return this.http.delete<unknown>(`${BASE_URL}/${id}`);
  }

  public createCategory(
    payload: ICategoryPayload,
  ): Observable<ICategoryResponse> {
    return this.http.post<ICategoryResponse>(BASE_URL, payload);
  }

  public updateCategory(
    id: TServerEntityId,
    payload: ICategoryPayload,
  ): Observable<ICategoryResponse> {
    return this.http.patch<ICategoryResponse>(`${BASE_URL}/${id}`, payload);
  }

  public getCategoryById(
    id: TServerEntityId,
  ): Observable<IFullCategoryResponse> {
    return this.http.get<IFullCategoryResponse>(`${BASE_URL}/${id}`);
  }
}
