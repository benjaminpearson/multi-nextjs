import Cookie from '../../cookie';
import _trim from 'lodash/trim';
import _split from 'lodash/split';
import _map from 'lodash/map';

const PATH_REGEX = new RegExp(`^\/[a-z]{2}\/[a-z]{2}\/`, 'gi');

const getLocationAndLanguageFromPath = ({ req, res, asPath }) => {
  const url = asPath || req.url;
  const [location, language] = _split(_trim(url.match(PATH_REGEX), '/'), '/') || [];
  if (location && language) {
    const cookie = new Cookie({ req, res });
    // @TODO: Set longer duration of this cookie preference
    _map({ location, language }, (value, key) => cookie.set(key, value, { path: '/', httpOnly: false }));
    return { location, language, asPath: url.replace(PATH_REGEX, '/') };
  }
  return false;
};

export default getLocationAndLanguageFromPath;
