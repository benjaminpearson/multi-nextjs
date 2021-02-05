
import Cookies from 'cookies';
import cookie from 'cookie';
import doc from '../document';

class Cookie {
  constructor({ req, res } = {}) {
    try {
      this.cookies = process.browser ? cookie.parse(doc.cookie) : new Cookies(req, res);
    } catch (err) {
      this.cookies = process.browser ? {} : { get: () => null, set: () => {} };
    }
  }

  get(key) {
    try {
      return process.browser ? this.cookies[key] : this.cookies.get(key);
    } catch (err) {
      return undefined;
    }
  }

  set(key, value, opts) {
    try {
      process.browser ? doc.cookie = cookie.serialize(key, value, opts) : this.cookies.set(key, value, opts);
      this.cookies = process.browser ? cookie.parse(doc.cookie) : this.cookies;
    } catch (err) {}
  }
}

export default Cookie;
