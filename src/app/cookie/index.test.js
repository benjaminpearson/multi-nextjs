import Cookie from '.';
import doc from '../document';

jest.mock('../document', () => ({
  cookie: 'yummy_cookie=choco; tasty_cookie=strawberry',
}));

describe('server', () => {
  const req = { headers: { cookie: 'yummy_cookie=choco; tasty_cookie=strawberry' }, connection: { encrypted: true } };
  const res = { getHeader: jest.fn(), set: jest.fn(), setHeader: jest.fn() };

  it('should construct cookie', () => {
    expect(new Cookie({ req, res }).cookies).toMatchSnapshot();
  });

  it('should get cookie value', () => {
    const cookie = new Cookie({ req, res });
    expect(cookie.get('yummy_cookie')).toBe('choco');
  });

  it('should return undefined for unknown cookie', () => {
    const cookie = new Cookie({ req, res });
    expect(cookie.get('foobar')).toBeUndefined();
  });

  it.skip('should set cookie value', () => {
    const cookie = new Cookie({ req, res });
    cookie.set('new_cookie', 'new_value');
    expect(cookie.get('new_cookie')).toBe('new_value');
    expect(cookie.get('yummy_cookie')).toBe('choco');
  });
});

describe('client', () => {
  beforeAll(() => process.browser = true);
  afterAll(() => process.browser = false);

  it('should construct cookie', () => {
    expect(new Cookie({}).cookies).toMatchSnapshot();
  });

  it('should get cookie value', () => {
    const cookie = new Cookie();
    expect(cookie.get('yummy_cookie')).toBe('choco');
  });

  it('should return undefined for unknown cookie', () => {
    const cookie = new Cookie();
    expect(cookie.get('foobar')).toBeUndefined();
  });

  it('should set cookie value', () => {
    const cookie = new Cookie();
    cookie.set('new_cookie', 'new_value');
    expect(cookie.get('new_cookie')).toBe('new_value');
    // @TODO: Improve document cookie mock to add getters and setters
    // expect(cookie.get('yummy_cookie')).toBe('choco');
  });

  it.todo('should set cookie value with option');
});
