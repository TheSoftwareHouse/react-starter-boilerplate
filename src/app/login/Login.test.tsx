import React from 'react';
import { act, fireEvent, render, wait } from 'tests';

import { Login } from './Login';
describe('Login', () => {
  test('calls onSubmit prop with username and password', async () => {
    const onSubmit = jest.fn(() => Promise.resolve(true));

    const { getByText, getByLabelText } = render(<Login onSubmit={onSubmit} />);

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
    });
  });

  test('displays an error if login failed', async () => {
    const onSubmit = jest.fn(() => Promise.resolve(false));
    const { getByText, getByLabelText } = render(<Login onSubmit={onSubmit} />);

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
      expect(getByText('Invalid username and/or password')).toBeTruthy();
    });
  });

  test('displays validation errors', async () => {
    const onSubmit = jest.fn(() => Promise.resolve(true));
    const { getAllByText, getByText } = render(<Login onSubmit={onSubmit} />);

    act(() => {
      fireEvent.click(getByText('submit'));
    });

    await wait(() => {
      expect(getAllByText('This field is required').length).toBe(2);
    });
  });
});
