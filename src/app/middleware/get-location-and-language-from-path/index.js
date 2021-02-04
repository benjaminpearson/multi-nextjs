import Cookies from 'cookies';
import cookie from 'cookie';

const getLocationAndLanguageFromPath = ({ req, res, asPath }, { locations, languages }) => {
  const url = asPath || req.url;
  const locationLangRegex = new RegExp(`^\/[a-z]{2}\/[a-z]{2}\/`, 'gi');
  const matchedLocationLang = url.match(locationLangRegex);
  if (matchedLocationLang) {
    const parts = matchedLocationLang[0].split('/');
    const location = parts[1];
    const language = parts[2];

    if (process.browser) {
      document.cookie = cookie.serialize('location', location, { path: '/' });
      document.cookie = cookie.serialize('language', language, { path: '/' });
    } else {
      const cookies = new Cookies(req, res);
      // @TODO: Set longer duration of this cookie preference
      cookies.set('location', location, { path: '/', httpOnly: false });
      cookies.set('language', language, { path: '/', httpOnly: false });
    }

    return { location, language, asPath: url.replace(locationLangRegex, '/') };
  }
  return false;
};

export default getLocationAndLanguageFromPath;
