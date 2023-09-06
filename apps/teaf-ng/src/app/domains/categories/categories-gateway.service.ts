import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategoryResponse, ICategoryPayload, IFullCategoryResponse } from './categories.types';
import { TServerEntityId } from '../../common/types';

@Injectable({
  providedIn: 'root',
})
export class CategoriesGatewayService {
  requestOptions = {headers:new HttpHeaders({'ngrok-skip-browser-warning':'hello'})}
  public constructor(private readonly http: HttpClient) {}

  public getCategories(): Observable<ICategoryResponse[]> {
    return this.http.get<ICategoryResponse[]>('/api/categories', this.requestOptions);
  }

  public deleteCategory(id: TServerEntityId): Observable<unknown> {
    return this.http.delete<unknown>(`/api/categories/${id}`, this.requestOptions);
  }

  public createCategory(payload: ICategoryPayload): Observable<ICategoryResponse> {
    return this.http.post<ICategoryResponse>('/api/categories', payload, this.requestOptions);
  }

  public updateCategory(id: TServerEntityId, payload: ICategoryPayload): Observable<ICategoryResponse> {
    return this.http.patch<ICategoryResponse>(`/api/categories/${id}`, payload, this.requestOptions);
  }

  public getCategoryById(id: TServerEntityId): Observable<IFullCategoryResponse> {
    return this.http.get<IFullCategoryResponse>(`/api/categories/${id}`, this.requestOptions);
  }
}
