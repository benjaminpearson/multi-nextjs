import serveRobots from '.';

describe('server', () => {
  it('serves robots when /robots.txt requested', () => {
    const req = { url: '/robots.txt' };
    const res = { setHeader: jest.fn(), send: jest.fn() };
    const result = serveRobots({ req, res });
    expect(res.setHeader).toHaveBeenCalledWith('content-type', 'text/plain');
    expect(res.send.mock.calls).toMatchSnapshot();
    expect(result).toBe(true);
  });

  it.todo('serves robots with robots disallowed when non production');

  it.todo('serves robots with robots allowed when production');

  it('does not serve robots when req url does not equal /robots.txt', () => {
    expect(serveRobots({ req: { url: '/foo' } })).toBe(false);
  });
})

describe('client', () => {
  it('does not serve robots when req is empty', () => {
    expect(serveRobots({})).toBe(false);
  });
})
