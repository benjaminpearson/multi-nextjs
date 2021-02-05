import handleInvalidLocationOrLanguage from '.';

const validProps = { locations: { list: ['au', 'uk'] }, languages: { list: ['en', 'zh'] }, location: 'au', language: 'en' };

describe('server + client', () => {
  it('returns 404 status code if invalid language', () => {
    expect(handleInvalidLocationOrLanguage({}, { ...validProps, language: 'xx' })).toEqual({ statusCode: 404 });
  });

  it('returns 404 status code if invalid location', () => {
    expect(handleInvalidLocationOrLanguage({}, { ...validProps, location: 'xx' })).toEqual({ statusCode: 404 });
  });

  it('returns 404 status code if invalid language and location', () => {
    expect(handleInvalidLocationOrLanguage({}, { ...validProps, language: 'xx', location: 'xx' })).toEqual({ statusCode: 404 });
  });

  it('returns false for valid language and location', () => {
    expect(handleInvalidLocationOrLanguage({}, validProps)).toBe(false);
  });
});
