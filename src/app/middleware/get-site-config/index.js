import Cookie from '../../cookie';
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
  const cookie = new Cookie({ req, res });
  const cookieHostname = cookie.get('hostname');

  const headerHostname = req?.headers.host;
  const queryHostname = query?.hostname;
  const validHostname = _find([_replace(headerHostname, ':3000', ''), queryHostname, cookieHostname], hostname => SITES[hostname]);
  const foundSite = SITES[validHostname];

  // @TODO: This status code could change
  if (!foundSite) {
    console.log('Could not find site config', { headerHostname, cookieHostname, queryHostname });
    return { statusCode: 404 };
  }

  cookie.set('hostname', validHostname, { path: '/', httpOnly: false });
  return foundSite;
}

export default getSiteConfig;
