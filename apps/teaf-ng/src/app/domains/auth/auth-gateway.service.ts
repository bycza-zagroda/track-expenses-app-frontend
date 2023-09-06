import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IRefreshTokenResponse, ISignInPayload, ISignInResponse, ISignOnPayload } from './auth.types';

@Injectable({
  providedIn: 'root',
})
export class AuthGatewayService {
  public constructor(private readonly http: HttpClient) {}

  public signIn(_payload: ISignInPayload): Observable<ISignInResponse> {
//     return of({
//       accessToken: 'some token',
//     });

    return this.http.post<ISignInResponse>('/api/auth/login', _payload);
  }

  public refreshToken(): Observable<IRefreshTokenResponse> {
    return of({
      accessToken: 'some token',
    });

    // return this.http.post<IRefreshTokenResponse>('/api/auth/refresh', {});
  }

  public signOut(): Observable<unknown> {
    return of({});

    // return this.http.post<unknown>('/api/auth/logout', {});
  }

  public signOn(payload: ISignOnPayload): Observable<unknown> {
    return of({});

    // return this.http.post<unknown>('/api/auth/register', payload);
  }
}
