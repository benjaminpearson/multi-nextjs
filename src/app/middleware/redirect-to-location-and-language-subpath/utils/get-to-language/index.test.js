import doc from '../../../../document';

import getToLanguage from '.';

const languages = { list: ['en', 'zh', 'de'], default: 'de' };

describe('server', () => {
  it('gets language from valid server cookie', () => {
    expect(getToLanguage({ req: { headers: { cookie: 'language=en' } }, languages })).toBe('en');
  });

  it('gets language from valid accept-language header', () => {
    expect(getToLanguage({ req: { headers: { 'accept-language': 'en-GB,en;q=0.8' } }, languages })).toBe('en');
  });

  it('gets default language if invalid server cookie value', () => {
    expect(getToLanguage({ req: { headers: { cookie: 'language=fr' } }, languages })).toBe('de');
    expect(getToLanguage({ req: { headers: { cookie: 'asdas' } }, languages })).toBe('de');
  });

  it('gets default language if invalid accept-language header', () => {
    expect(getToLanguage({ req: { headers: { 'accept-language': 'fr-CA,fr;q=0.8' } }, languages })).toBe('de');
    expect(getToLanguage({ req: { headers: { 'accept-language': 'asdasd' } }, languages })).toBe('de');
  });

  it('gets default language if missing server headers', () => {
    expect(getToLanguage({ req: { headers: {} }, languages })).toBe('de');
  });
});

describe('client', () => {
  beforeAll(() => process.browser = true);
  afterAll(() => process.browser = false);

  it('gets language from valid client cookie', () => {
    doc.cookie = 'language=en';
    expect(getToLanguage({ languages })).toBe('en');
  });

  it('gets default language if invalid client cookie value', () => {
    doc.cookie = 'language=fr';
    expect(getToLanguage({ languages })).toBe('de');
    doc.cookie = 'asdasd';
    expect(getToLanguage({ languages })).toBe('de');
  });

  it('gets default language if missing client cookie', () => {
    doc.cookie = '';
    expect(getToLanguage({ languages })).toBe('de');
  });
})
