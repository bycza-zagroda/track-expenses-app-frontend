import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRefreshTokenResponse, ISignInPayload, ISignInResponse, ISignOnPayload } from './auth.types';

@Injectable({
  providedIn: 'root',
})
export class AuthGatewayService {
  public constructor(private readonly http: HttpClient) {}

  public signIn(_payload: ISignInPayload): Observable<ISignInResponse> {
    return this.http.post<ISignInResponse>('/api/auth/login', _payload);
  }

  public refreshToken(): Observable<IRefreshTokenResponse> {
    return this.http.post<IRefreshTokenResponse>('/api/auth/refresh', {});
  }

  public signOut(): Observable<void> {
    return this.http.post<void>('/api/auth/logout', {});
  }

  public signOn(payload: ISignOnPayload): Observable<ISignOnPayload> {
    return this.http.post<ISignOnPayload>('/api/auth/register', payload);
  }

}
