import Router from 'next/router';

import redirectLowercase from '.';

jest.mock('next/router');

describe('server', () => {
  it('redirects uppercase to lowercase url', () => {
    const res = { writeHead: jest.fn(), end: jest.fn() };
    const result = redirectLowercase({ req: { url: '/UPpERcAsE/asd' }, res });
    expect(res.writeHead).toHaveBeenCalledWith(308, { 'Location': '/uppercase/asd' });
    expect(res.end).toHaveBeenCalled();
    expect(result).toBe(true);
  });

  it('does not redirect already lowercase url', () => {
    const res = { writeHead: jest.fn(), end: jest.fn() };
    const result = redirectLowercase({ req: { url: '/lowercase' }, res });
    expect(res.writeHead).not.toHaveBeenCalled();
    expect(res.end).not.toHaveBeenCalled();
    expect(result).toBe(false);
  });
});

describe('client', () => {
  beforeAll(() => process.browser = true);
  afterAll(() => process.browser = false);

  it('redirects uppercase to lowercase url', () => {
    const result = redirectLowercase({ asPath: '/UPpERcAsE/asd' });
    expect(Router.push).toHaveBeenCalledWith('/uppercase/asd');
    expect(result).toBe(true);
  });

  it('does not redirect already lowercase url', () => {
    const result = redirectLowercase({ asPath: '/lowercase' });
    expect(Router.push).not.toHaveBeenCalled();
    expect(result).toBe(false);
  });
});
