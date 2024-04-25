import { AxiosError, AxiosResponse } from 'axios';

import { getStandardizedApiError } from './apiError';

const getMockAxiosError = (data: unknown) => {
  return new AxiosError('mockError', 'ERR', undefined, undefined, {
    status: 400,
    data,
  } as AxiosResponse);
};

describe('getStandardizedApiError', () => {
  it('returns basic ApiError', () => {
    const errorData = {
      error: {
        code: 'MOCK_ERROR',
        message: 'Mock error',
      },
    };
    const mockAxiosError = getMockAxiosError(errorData);

    expect(getStandardizedApiError(mockAxiosError)).toMatchObject({
      type: 'basic',
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

    expect(getStandardizedApiError(mockAxiosError)).toMatchObject({
      type: 'form',
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

    expect(getStandardizedApiError(mockAxiosError)).toMatchObject({
      statusCode: 400,
      type: 'unknown',
      data: errorData,
      originalError: mockAxiosError,
    });
  });
});
