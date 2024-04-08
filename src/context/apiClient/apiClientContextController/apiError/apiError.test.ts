import { AxiosError, AxiosResponse } from 'axios';

import { getStandarizedApiError } from './apiError';

const getMockAxiosError = (data: unknown) => {
  return new AxiosError('mockError', 'ERR', undefined, undefined, {
    status: 400,
    data,
  } as AxiosResponse);
};

describe('getStandarizedApiError', () => {
  it('returns basic ApiError', () => {
    const errorData = {
      error: {
        code: 'MOCK_ERROR',
        message: 'Mock error',
      },
    };
    const mockAxiosError = getMockAxiosError(errorData);

    expect(getStandarizedApiError(mockAxiosError)).toEqual({
      isBasicError: true,
      statusCode: 400,
      data: errorData,
      originalError: mockAxiosError,
    });
  });

  it('returns form ApiError', () => {
    const errorData = {
      errors: {
        name: ['MOCK_ERROR'],
      },
    };
    const mockAxiosError = getMockAxiosError(errorData);

    expect(getStandarizedApiError(mockAxiosError)).toEqual({
      isFormError: true,
      statusCode: 400,
      data: errorData,
      originalError: mockAxiosError,
    });
  });

  it('returns unknown ApiError', () => {
    const errorData = {
      data: {
        error: 'some unknown error shape',
      },
    };
    const mockAxiosError = getMockAxiosError(errorData);

    expect(getStandarizedApiError(mockAxiosError)).toEqual({
      statusCode: 400,
      data: errorData,
      originalError: mockAxiosError,
    });
  });
});
