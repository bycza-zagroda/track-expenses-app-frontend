import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthGatewayService } from '../../domains/auth/auth-gateway.service';
import { ISignInPayload, ISignOnPayload } from '../../domains/auth/auth.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isUserLoggedIn$: Observable<boolean>;

  private userLoggedInState: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private readonly ACCESS_TOKEN_LC_KEY = 'accessToken';

  public constructor(private readonly authGateway: AuthGatewayService) {
    this.isUserLoggedIn$ = this.userLoggedInState.asObservable();
    this.userLoggedInState.next(
      !!localStorage.getItem(this.ACCESS_TOKEN_LC_KEY),
    );
  }

  public getToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_LC_KEY);
  }

  public signIn(payload: ISignInPayload): Observable<unknown> {
    return this.authGateway.signIn(payload).pipe(
      tap((response) => {
        localStorage.setItem(this.ACCESS_TOKEN_LC_KEY, response.accessToken);

        this.userLoggedInState.next(true);
      }),
    );
  }

  public refreshToken(): Observable<unknown> {
    return this.authGateway.refreshToken().pipe(
      tap((response) => {
        localStorage.setItem(this.ACCESS_TOKEN_LC_KEY, response.accessToken);
      }),
    );
  }

  public signOn(payload: ISignOnPayload): Observable<unknown> {
    return this.authGateway.signOn(payload);
  }

  public signOut(): Observable<unknown> {
    return this.authGateway.signOut().pipe(
      tap(() => {
        localStorage.removeItem(this.ACCESS_TOKEN_LC_KEY);

        this.userLoggedInState.next(false);
      }),
    );
  }
}
