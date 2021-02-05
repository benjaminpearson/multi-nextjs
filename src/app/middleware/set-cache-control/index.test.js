import setCacheControl from '.';

describe('server', () => {
  it('sets cache control when res object exists', () => {
    const res = { setHeader: jest.fn() };
    expect(setCacheControl({ res })).toBe(false);
    expect(res.setHeader).toHaveBeenCalledWith('cache-control', 's-maxage=1, stale-while-revalidate');
  });
});

describe('client', () => {
  it('does not set cache control when res object does not exist', () => {
    expect(setCacheControl({})).toBe(false);
  });
});
