import { Storage, TokenData } from './AuthStorage.types';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const EXPIRES_KEY = 'expires';

const defaultTokenData = {
  accessToken: null,
  refreshToken: null,
  expires: null,
} satisfies TokenData;
class AuthStorage {
  private _storage;
  private _tokenData;
  private _listeners: VoidFunction[] = [];

  constructor(_storage: Storage) {
    try {
      this._storage = _storage;
      const expires = _storage.getItem(EXPIRES_KEY);
      this._tokenData = {
        accessToken: _storage.getItem(ACCESS_TOKEN_KEY),
        refreshToken: _storage.getItem(REFRESH_TOKEN_KEY),
        expires: expires ? Number(expires) : defaultTokenData.expires,
      };
    } catch (error) {
      this._storage = null;
      this._tokenData = defaultTokenData;
    }
  }

  subscribe = (listener: VoidFunction) => {
    this._listeners = [...this._listeners, listener];

    return () => {
      this._listeners = this._listeners.filter((subscriber) => subscriber !== listener);
    };
  };

  private notify() {
    this._listeners.forEach((listener) => listener());
  }

  getTokenData = () => {
    return this._tokenData;
  };

  private setStorageValue = (storageKey: string, value: number | string | null) => {
    try {
      if (value !== null) {
        this._storage?.setItem(storageKey, String(value));
      } else {
        this._storage?.removeItem(storageKey);
      }
    } catch (error) {
      this._storage?.onError(error);
    }
  };

  set tokenData(value: TokenData) {
    this._tokenData = value;
    this.setStorageValue(REFRESH_TOKEN_KEY, value.refreshToken);
    this.setStorageValue(ACCESS_TOKEN_KEY, value.accessToken);
    this.setStorageValue(EXPIRES_KEY, value.expires);
    this.notify();
  }

  set accessToken(value: string | null) {
    this.tokenData = {
      ...this._tokenData,
      accessToken: value,
    };
  }

  set refreshToken(value: string | null) {
    this.tokenData = {
      ...this._tokenData,
      refreshToken: value,
    };
  }

  set expires(value: number | null) {
    this.tokenData = {
      ...this._tokenData,
      expires: value,
    };
  }

  resetTokens = () => {
    this.tokenData = defaultTokenData;
  };
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
