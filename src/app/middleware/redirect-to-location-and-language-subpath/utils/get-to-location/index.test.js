import doc from '../../../../document';

import getToLocation from '.';

const locations = { list: ['au', 'uk', 'us'], default: 'us' };

describe('server', () => {
  it('gets location from valid server cookie', () => {
    expect(getToLocation({ req: { headers: { cookie: 'location=au' } }, locations })).toBe('au');
  });

  it('gets location from valid server location header', () => {
    expect(getToLocation({ req: { headers: { 'x-domain-country': 'au' } }, locations })).toBe('au');
    expect(getToLocation({ req: { headers: { 'cf-ipcountry': 'au' } }, locations })).toBe('au');
    expect(getToLocation({ req: { headers: { 'x-appengine-country': 'au' } }, locations })).toBe('au');
    expect(getToLocation({ req: { headers: { 'cloudfront-viewer-country': 'au' } }, locations })).toBe('au');
  });

  it('gets default location if invalid server cookie value', () => {
    expect(getToLocation({ req: { headers: { cookie: 'location=fr' } }, locations })).toBe('us');
    expect(getToLocation({ req: { headers: { cookie: 'asdas' } }, locations })).toBe('us');
  });

  it('gets default location if invalid location header', () => {
    expect(getToLocation({ req: { headers: { 'x-domain-country': 'xx' } }, locations })).toBe('us');
    expect(getToLocation({ req: { headers: { 'cf-ipcountry': 'ch' } }, locations })).toBe('us');
    expect(getToLocation({ req: { headers: { 'x-appengine-country': 'jp' } }, locations })).toBe('us');
    expect(getToLocation({ req: { headers: { 'cloudfront-viewer-country': 'ca' } }, locations })).toBe('us');
  });

  it('gets default location if missing server headers', () => {
    expect(getToLocation({ req: { headers: {} }, locations })).toBe('us');
  });
});

describe('client', () => {
  beforeAll(() => process.browser = true);
  afterAll(() => process.browser = false);

  it('gets location from valid client cookie', () => {
    doc.cookie = 'location=au';
    expect(getToLocation({ locations })).toBe('au');
  });

  it('gets default location if invalid client cookie value', () => {
    doc.cookie = 'location=ca';
    expect(getToLocation({ locations })).toBe('us');
    doc.cookie = 'asdasd';
    expect(getToLocation({ locations })).toBe('us');
  });

  it('gets default location if missing client cookie', () => {
    doc.cookie = '';
    expect(getToLocation({ locations })).toBe('us');
  });
});
