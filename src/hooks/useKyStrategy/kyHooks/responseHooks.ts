import { HTTPError } from 'ky';

export const responseErrorHook = async (error: HTTPError) => Promise.reject(error);
