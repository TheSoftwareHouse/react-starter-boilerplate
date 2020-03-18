const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const EXPIRES_KEY = 'expires';

class AuthStorage {
  private _accessToken: string | null = null;
  private _refreshToken: string | null = null;
  private _expires: number | null = null;

  constructor() {
    try {
      this.accessToken = sessionStorage.getItem(ACCESS_TOKEN_KEY);
      this.refreshToken = sessionStorage.getItem(REFRESH_TOKEN_KEY);
      this.expires = Number(sessionStorage.getItem(EXPIRES_KEY));
    } catch (error) {
      this.accessToken = null;
      this.refreshToken = null;
      this.expires = null;
    }
  }

  get accessToken(): string | null {
    return this._accessToken;
  }

  set accessToken(value: string | null) {
    this._accessToken = value;

    try {
      if (typeof value === 'string') {
        sessionStorage.setItem(ACCESS_TOKEN_KEY, value);
      } else {
        sessionStorage.removeItem(ACCESS_TOKEN_KEY);
      }
    } catch (error) {}
  }

  get refreshToken(): string | null {
    return this._refreshToken;
  }

  set refreshToken(value: string | null) {
    this._refreshToken = value;

    try {
      if (typeof value === 'string') {
        sessionStorage.setItem(REFRESH_TOKEN_KEY, value);
      } else {
        sessionStorage.removeItem(REFRESH_TOKEN_KEY);
      }
    } catch (error) {}
  }

  get expires(): number | null {
    return this._expires;
  }

  set expires(value: number | null) {
    this._expires = value;

    try {
      if (typeof value === 'number') {
        sessionStorage.setItem(EXPIRES_KEY, value.toString());
      } else {
        sessionStorage.removeItem(EXPIRES_KEY);
      }
    } catch (error) {}
  }
}

export const authStorage = new AuthStorage();
