import Router from 'next/router';
import getToLocation from './utils/get-to-location';
import getToLanguage from './utils/get-to-language';

const redirectToLocationAndLanguageSubpath = ({ req, res, asPath }, { location, language, locations, languages }) => {
  if (location && language) return false;

  const toLocation = getToLocation({ req, res, locations });
  const toLanguage = getToLanguage({ req, res, languages });

  const toUrl = `/${toLocation}/${toLanguage}${asPath || req.url}`;
  if (process.browser) {
    Router.push(toUrl);
  } else {
    res.writeHead(301, { Location: toUrl });
    res.end();
  }
  return true;
};

export default redirectToLocationAndLanguageSubpath;
