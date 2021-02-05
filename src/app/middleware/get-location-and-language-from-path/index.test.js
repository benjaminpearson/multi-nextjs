import getLocationAndLanguageFromPath from '.';

jest.mock('../../cookie');

describe('server', () => {
  it('gets location and language from valid path and returns adjusted asPath', () => {
    const req = { url: '/au/en/feature' };
    expect(getLocationAndLanguageFromPath({ req, res: {} })).toMatchSnapshot();
    // @TODO: Check cookie set
  });

  it('returns false if invalid location and language', () => {
    const req = { url: '/feature' };
    expect(getLocationAndLanguageFromPath({ req, res: {} })).toBe(false);
    // @TODO: Check cookie not set
  });
});

describe('client', () => {
  it('gets location and language from valid path and returns adjusted asPath', () => {
    expect(getLocationAndLanguageFromPath({ asPath: '/au/en/feature' })).toMatchSnapshot();
    // @TODO: Check cookie set
  });

  it('returns false if invalid location and language', () => {
    expect(getLocationAndLanguageFromPath({ asPath: '/feature' })).toBe(false);
    // @TODO: Check cookie not set
  });
});
