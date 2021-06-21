import jwtDecode from "jwt-decode";

export type DecodedToken = {
  token_type: string;
  exp: 1624113793;
  jti: string;
  user_id: string;
};

class AuthToken {
  readonly decodedToken: DecodedToken | null;

  constructor(readonly token?: string) {
    this.decodedToken = null;
    try {
      if (token) this.decodedToken = jwtDecode(token);
    } catch (error) {
      // TODO June 19, 2021: Handle Error
    }
  }

  get userId(): string | null {
    return this.decodedToken.user_id || null;
  }

  get expiresAt(): Date | null {
    if (this.decodedToken) return new Date(this.decodedToken.exp * 1000);
    return null;
  }

  get isExpired(): boolean {
    if (this.decodedToken && this.expiresAt !== null)
      return new Date() > this.expiresAt;
    return true;
  }

  get isValid(): boolean {
    return !this.isExpired;
  }
}

export default AuthToken;
