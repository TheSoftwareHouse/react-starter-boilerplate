import { Storage } from './AuthStorage.types';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const EXPIRES_KEY = 'expires';

class AuthStorage {
  private _accessToken: string | null = null;
  private _refreshToken: string | null = null;
  private _expires: number | null = null;
  private _storage: Storage | null = null;

  constructor(_storage: Storage) {
    try {
      this._storage = _storage;
      this.accessToken = _storage.getItem(ACCESS_TOKEN_KEY);
      this.refreshToken = _storage.getItem(REFRESH_TOKEN_KEY);
      this.expires = Number(_storage.getItem(EXPIRES_KEY));
    } catch (error) {
      this._storage = null;
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
        this._storage?.setItem(ACCESS_TOKEN_KEY, value);
      } else {
        this._storage?.removeItem(ACCESS_TOKEN_KEY);
      }
    } catch (error) {
      this._storage?.onError(error);
    }
  }

  get refreshToken(): string | null {
    return this._refreshToken;
  }

  set refreshToken(value: string | null) {
    this._refreshToken = value;

    try {
      if (typeof value === 'string') {
        this._storage?.setItem(REFRESH_TOKEN_KEY, value);
      } else {
        this._storage?.removeItem(REFRESH_TOKEN_KEY);
      }
    } catch (error) {
      this._storage?.onError(error);
    }
  }

  get expires(): number | null {
    return this._expires;
  }

  set expires(value: number | null) {
    this._expires = value;

    try {
      if (typeof value === 'number') {
        this._storage?.setItem(EXPIRES_KEY, value.toString());
      } else {
        this._storage?.removeItem(EXPIRES_KEY);
      }
    } catch (error) {
      this._storage?.onError(error);
    }
  }
}

const storage: Storage = {
  getItem: (key: string) => sessionStorage.getItem(key),
  setItem: (key: string, value: string) => sessionStorage.setItem(key, value),
  removeItem: (key: string) => sessionStorage.removeItem(key),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onError: (error: unknown) => {
    // handle errors here
  },
};

export const authStorage = new AuthStorage(storage);
