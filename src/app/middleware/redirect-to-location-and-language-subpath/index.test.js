
import getToLanguage from './utils/get-to-language';
import getToLocation from './utils/get-to-location';
import Router from 'next/router';

import redirectToLocationAndLanguageSubpath from '.';

jest.mock('./utils/get-to-language');
jest.mock('./utils/get-to-location');
jest.mock('next/router');

const createRes = () => ({ writeHead: jest.fn(), end: jest.fn() });

describe('server', () => {
  const req = { url: '/feature' };
  it('returns false when location and language are populated', () => {
    const res = createRes();
    expect(redirectToLocationAndLanguageSubpath({ req, res }, { location: 'au', language: 'en' })).toBe(false);
    expect(getToLanguage).toBeCalledTimes(0);
    expect(getToLocation).toBeCalledTimes(0);
    expect(Router.push).toBeCalledTimes(0);
    expect(res.writeHead).toBeCalledTimes(0);
    expect(res.end).toBeCalledTimes(0);
  });

  it('writes redirect on res with defaults if no language and location', () => {
    const res = createRes();
    getToLanguage.mockReturnValue('en');
    getToLocation.mockReturnValue('au');
    expect(redirectToLocationAndLanguageSubpath({ req, res }, {})).toBe(true);
    expect(getToLanguage).toBeCalledTimes(1);
    expect(getToLocation).toBeCalledTimes(1);
    expect(Router.push).toBeCalledTimes(0);
    expect(res.writeHead).toBeCalledWith(301, { 'Location': '/au/en/feature' });
    expect(res.end).toBeCalledTimes(1);
  });
});

describe('client', () => {
  beforeAll(() => process.browser = true);
  afterAll(() => process.browser = false);
  const asPath = '/feature';

  it('returns false when location and language are populated', () => {
    expect(redirectToLocationAndLanguageSubpath({ asPath }, { location: 'au', language: 'en' })).toBe(false);
    expect(getToLanguage).toBeCalledTimes(0);
    expect(getToLocation).toBeCalledTimes(0);
    expect(Router.push).toBeCalledTimes(0);
  });

  it('writes redirect on res with defaults if no language and location', () => {
    getToLanguage.mockReturnValue('en');
    getToLocation.mockReturnValue('au');
    expect(redirectToLocationAndLanguageSubpath({ asPath }, {})).toBe(true);
    expect(getToLanguage).toBeCalledTimes(1);
    expect(getToLocation).toBeCalledTimes(1);
    expect(Router.push).toBeCalledWith('/au/en/feature');
  });
});
