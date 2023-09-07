import { act, renderHook } from 'tests';
import { AppProviders } from 'providers/AppProviders';
import { Environment } from '../../context/logger/loggerContextController/LoggerContextController.types';

import { useLogger } from './useLogger';

describe('useLogger', () => {
  test('should initialize logger', async () => {
    const { result } = renderHook(() => useLogger(), {
      wrapper: ({ children }) => (
        <AppProviders>
          <>{children}</>,
        </AppProviders>
      ),
    });

    await act(() =>
      result.current?.initialize({
        environment: Environment.Development,
        accessToken: 'MTQ0NjJkZmQ5OTM2NDE1ZTZjNGZmZjI3',
      }),
    );
    expect(result.current).toBeDefined();
  });
});
