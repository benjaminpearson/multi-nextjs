import Cookie from '../../../../cookie';
import _includes from 'lodash/includes';
import _find from 'lodash/find';

const getToLocation = ({ req, locations }) => {
  const cookies = new Cookie({ req });
  const cookieLocation = cookies.get('location');
  const validHeader = req && _find(['x-domain-country', 'cf-ipcountry', 'x-appengine-country', 'cloudfront-viewer-country'], (header) => _includes(locations.list, req.headers[header]));
  return _includes(locations.list, cookieLocation) && cookieLocation || validHeader && req.headers[validHeader] || locations.default;
};

export default getToLocation;
