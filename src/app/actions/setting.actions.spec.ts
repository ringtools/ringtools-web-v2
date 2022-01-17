import * as fromSetting from './setting.actions';

describe('loadSettings', () => {
  it('should return an action', () => {
    expect(fromSetting.loadSettings().type).toBe('[Setting] Load Settings');
  });
});
