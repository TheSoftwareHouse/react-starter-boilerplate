import { renderHook } from '@testing-library/react';

import { useHandleQueryErrors } from './useHandleQueryErrors';

describe('useHandleQueryErrors', () => {
  describe('shouldHandleGlobalError', () => {
    it('should return false when no metaError & errorCode provided', () => {
      const { result } = renderHook(useHandleQueryErrors);

      expect(result.current.shouldHandleGlobalError()).toEqual(false);
    });

    it('should return false when no metaError provided', () => {
      const { result } = renderHook(useHandleQueryErrors);

      expect(result.current.shouldHandleGlobalError(undefined, 400)).toEqual(false);
    });

    it('should return false when no errorCode provided', () => {
      const { result } = renderHook(useHandleQueryErrors);

      expect(result.current.shouldHandleGlobalError({ excludedCodes: [400], showGlobalError: true })).toEqual(false);
    });

    it('should return false when errorCode is included in excldudedCodes', () => {
      const { result } = renderHook(useHandleQueryErrors);

      expect(result.current.shouldHandleGlobalError({ excludedCodes: [400], showGlobalError: true }, 400)).toEqual(
        false,
      );
    });

    it('should return false when showGlobalError equals false', () => {
      const { result } = renderHook(useHandleQueryErrors);

      expect(result.current.shouldHandleGlobalError({ excludedCodes: [400], showGlobalError: false }, 400)).toEqual(
        false,
      );
    });

    it('should return true when errorCode is not included in excludedCodes', () => {
      const { result } = renderHook(useHandleQueryErrors);

      expect(result.current.shouldHandleGlobalError({ excludedCodes: [400], showGlobalError: true }, 500)).toEqual(
        true,
      );
    });
  });
});
