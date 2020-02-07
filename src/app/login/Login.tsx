import React, { useState, useCallback } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import { useAuthState } from 'hooks';
import { LoginProps } from './Login.types';

/*
 * TODO:
 *   - create re-usable Input/Button components and replace inputs and/or button with them
 *     you can use React.forwardRef in order to pass reference to the proper element
 *     https://pl.reactjs.org/docs/forwarding-refs.html
 * */

export const Login: React.FC<LoginProps> = ({ onSubmit }) => {
  const { register, handleSubmit, errors } = useForm();
  const { isAuthorizing } = useAuthState();

  const [error, setError] = useState(false);

  const handleSubmitCallback = useCallback(
    async (body: FieldValues) => {
      const valid = await onSubmit(body);
      if (!valid) {
        setError(!valid);
      }
    },
    [onSubmit],
  );

  return (
    <>
      <h2>Login</h2>
      {error && <div>Invalid username and/or password</div>}
      <form onSubmit={handleSubmit(handleSubmitCallback)}>
        <div>
          <label>
            username:
            <input name="username" ref={register({ required: true })} />
          </label>
          {errors.username && <span>This field is required</span>}
        </div>
        <div>
          <label>
            password:
            <input name="password" type="password" ref={register({ required: true })} />
          </label>
          {errors.password && <span>This field is required</span>}
        </div>
        <button type="submit" disabled={isAuthorizing}>
          submit
        </button>
      </form>
    </>
  );
};
