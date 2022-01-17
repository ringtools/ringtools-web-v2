import { reducer, initialSettingState } from './setting.reducer';

describe('Setting Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialSettingState, action);

      expect(result).toBe(initialSettingState);
    });
  });
});
