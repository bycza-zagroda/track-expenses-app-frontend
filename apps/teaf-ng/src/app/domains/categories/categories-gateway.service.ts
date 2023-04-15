import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategoryResponse, ICategoryPayload } from './categories.types';
import { TServerEntityId } from '../../common/types';

@Injectable({
  providedIn: 'root'
})
export class CategoriesGatewayService {
  constructor(private readonly http: HttpClient) {}

  public getCategories(): Observable<ICategoryResponse[]> {
    return this.http.get<ICategoryResponse[]>('/api/categories');
  }

  public deleteCategory(id: TServerEntityId): Observable<void> {
    return this.http.delete<void>(`/api/categories/${id}`);
  }

  public createCategory(payload: ICategoryPayload): Observable<ICategoryResponse> {
    return this.http.post<ICategoryResponse>('/api/categories', payload);
  }

  public updateCategory(id: TServerEntityId, payload: ICategoryPayload): Observable<ICategoryResponse> {
    return this.http.patch<ICategoryResponse>(`/api/categories/${id}`, payload);
  }

  public getCategoryById(id: TServerEntityId): Observable<ICategoryResponse> {
    return this.http.get<ICategoryResponse>(`/api/categories/${id}`);
  }
}
