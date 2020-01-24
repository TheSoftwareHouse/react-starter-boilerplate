import React from 'react';
import { act, fireEvent, render, wait } from 'tests';

import { Login } from './Login';

describe('Login', () => {
  const fetchCurrentUser = Promise.resolve({
    error: false,
    payload: {
      firstName: 'Foo',
      lastName: 'Bar',
      username: 'baz',
    },
  });

  test('calls onSubmit prop with username and password and redirects on success', async () => {
    const onSubmit = jest.fn(() =>
      Promise.resolve({
        error: false,
        payload: {
          accessToken: 'foo',
          refreshToken: 'bar',
        },
      }),
    );

    const { getByText, getByLabelText, queryByText } = render(
      <Login onSubmit={onSubmit} fetchCurrentUser={fetchCurrentUser} />,
    );

    act(() => {
      fireEvent.change(getByLabelText(/username/), {
        target: {
          value: 'foo',
        },
      });
      fireEvent.change(getByLabelText(/password/), {
        target: {
          value: 'bar',
        },
      });
      fireEvent.click(getByText('submit'));
    });

    await wait(() => {
      expect(onSubmit).toBeCalledWith({
        username: 'foo',
        password: 'bar',
      });

      expect(queryByText('Login')).not.toBeInTheDocument();
    });
  });

  test('displays an error if login failed', async () => {
    const onSubmit = jest.fn(() =>
      Promise.resolve({
        error: true,
      }),
    );
    const { getByText } = render(<Login onSubmit={onSubmit} fetchCurrentUser={fetchCurrentUser} />);

    act(() => {
      fireEvent.click(getByText('submit'));
    });

    await wait(() => {
      expect(getByText('Invalid username and/or password')).toBeTruthy();
    });
  });
});
