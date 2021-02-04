
import Cookies from 'cookies';
import cookie from 'cookie';
import _replace from 'lodash/replace';
import _find from 'lodash/find';

// Countries: https://www.npmjs.com/package/country-list
// Languages: https://www.npmjs.com/package/iso-639-1
// @TODO: Switch out the domain names based on node env being production or not
const SITES = {
  'one.local': {
    theme: {
      color: 'blue',
    },
    locations: {
      list: ['au', 'uk'],
      default: 'au',
    },
    languages: {
      list: ['en', 'zh'],
      default: 'en',
    },
    features: {
      abc: true,
    }
  },
  'two.local': {
    theme: {
      color: 'red',
    },
    locations: {
      list: ['au', 'uk'],
      default: 'uk',
    },
    languages: {
      list: ['en', 'zh'],
      default: 'zh',
    },
    features: {
      abc: false,
    },
  }
};

const getSiteConfig = ({ req, res, query }) => {
  const cookies = process.browser ? cookie.parse(document.cookie)  : (new Cookies(req, res));
  const headerHostname = req?.headers.host;
  const cookieHostname = process.browser ? cookies.hostname : cookies.get('hostname');
  const queryHostname = query?.hostname;
  const validHostname = _find([_replace(headerHostname, ':3000', ''), queryHostname, cookieHostname], hostname => SITES[hostname]);
  const foundSite = SITES[validHostname];

  // @TODO: This status code could change
  if (!foundSite) {
    console.log('Could not find site config', { headerHostname, cookieHostname, queryHostname });
    res.statusCode = 404;
    return true;
  }

  if (process.browser) {
    document.cookie = cookie.serialize('hostname', validHostname, { path: '/' });
  } else {
    cookies.set('hostname', validHostname, { path: '/', httpOnly: false });
  }
  const { theme, locations, languages, features } = foundSite;
  return { theme, locations, languages, features };
}

export default getSiteConfig;
