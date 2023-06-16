export interface ISignInPayload {
  email: string;
  password: string;
  isRememberMe: boolean;
}

export interface ISignInResponse {
  accessToken: string;
}

export interface IRefreshTokenResponse {
  accessToken: string;
}

export interface ISignOnPayload {
  email: string;
  password: string;
  username: string;
}
