import Router from 'next/router';

const redirectLowercase = ({ req, res, asPath }) => {
  const url = asPath || req.url;
  const lowerCaseUrl = url.toLowerCase();

  if (url === lowerCaseUrl) return false;

  if (process.browser) {
    Router.push(lowerCaseUrl);
  } else {
    res.writeHead(308, { Location: lowerCaseUrl });
    res.end();
  }
  return true;
};

export default redirectLowercase;
