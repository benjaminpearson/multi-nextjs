// @TODO: Change this config based on environment variable (ie, NODE_ENV or similar) to indicate production or not
const serveRobots = ({ req, res }) => {
  if (!req || req.url !== '/robots.txt') return false;

  // https://developers.google.com/search/docs/advanced/robots/create-robots-txt
  res.setHeader('content-type', 'text/plain');
  res.send(['User-agent: *', 'Disallow: /', 'Sitemap: http://www.example.com/sitemap.xml'].join('\n'));
  return true;
}

export default serveRobots;
