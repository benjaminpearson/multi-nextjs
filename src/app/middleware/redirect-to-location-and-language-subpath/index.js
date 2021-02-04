import Cookies from 'cookies';
import cookie from 'cookie';
import parser from 'accept-language-parser';
import _includes from 'lodash/includes';
import _find from 'lodash/find';
import Router from 'next/router';

const redirectToLocationAndLanguageSubpath = ({ res, req, asPath }, { location, language, locations, languages }) => {
  if (!location && !language) {
    const url = asPath || req.url;
    // @TODO: Optimise this code
    const validHeader = !process.browser && _find(['X-Domain-Country', 'CF-IPCountry', 'X-Appengine-Country', 'CloudFront-Viewer-Country'], (header) => _includes(locations.list, req.headers[header]));
    const toLocation = (process.browser ? cookie.parse(document.cookie)?.location : validHeader && req.headers[validHeader]) || locations.default;

    const cookieLanaguage = process.browser ? cookie.parse(document.cookie)?.language : (new Cookies(req, res)).get('language');
    const acceptLanguageHeader = req?.headers['accept-language'] || 'en';
    const toLanguage = (_includes(languages.list, cookieLanaguage) && cookieLanaguage) || parser.pick(languages.list, acceptLanguageHeader) || languages.default;

    console.log(process.browser && cookie.parse(document.cookie), toLocation, toLanguage);
    const toUrl = `/${toLocation}/${toLanguage}${url}`;
    if (process.browser) {
      Router.push(toUrl);
      return true;
    } else {
      res.writeHead(301, {
        Location: toUrl,
      });
      res.end();
      return true;
    }
  }
  return false;
};

export default redirectToLocationAndLanguageSubpath;
