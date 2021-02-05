import _map from 'lodash/map';
import _merge from 'lodash/merge';
import _pick from 'lodash/pick';
import _transform from 'lodash/transform';
import Cookie from './cookie';
import Error from 'next/error';
import getLocationAndLanguageFromPath from './middleware/get-location-and-language-from-path';
import getSiteConfig from './middleware/get-site-config';
import handleInvalidLocationOrLanguage from './middleware/handle-invalid-location-or-language';
import Link from 'next/link';
import React from 'react';
import redirectLowercase from './middleware/redirect-lowercase';
import redirectToLocationAndLanguageSubpath from './middleware/redirect-to-location-and-language-subpath';
import serveRobots from './middleware/serve-robots';
import setCacheControl from './middleware/set-cache-control';

function CustomApp(context) {
  const { Component, pageProps, statusCode } = context;
  const cookie = new Cookie();
  return <div style={{ backgroundColor: pageProps.theme.color }}>
    <div>
      {_map(['one.local', 'two.local'], value => {
        return <Link key={value} href="/feature/abc">
          <a onClick={() => { cookie.set('hostname', value, { path: '/' }) }}>
            {value}
          </a>
        </Link>;
      })}
    </div>
    {statusCode !== 200 ? <Error statusCode={statusCode} /> : <Component {...pageProps} /> }
  </div>;
}

CustomApp.getInitialProps = ({ ctx }) => _pick(_transform([
  redirectLowercase,
  setCacheControl,
  getSiteConfig,
  serveRobots,
  // @TODO: serve sitemap.xml
  getLocationAndLanguageFromPath,
  redirectToLocationAndLanguageSubpath,
  handleInvalidLocationOrLanguage,
  ({ req, res }, { features, asPath }) => {
    if (asPath.indexOf('/feature/abc') === 0 && features?.abc === false) {
      return { statusCode: 404 };
    }
    return false;
  },
  ({ res }, { site, location, language, theme, statusCode = 200 }) => {
    if (res) res.statusCode = statusCode;
    return ({ pageProps: { site, location, language, theme }, statusCode });
  },
], (accumulated, method) => {
  const result = method(ctx, accumulated);
  if (result === true) return false;
  _merge(accumulated, result);
}, {}), 'pageProps', 'statusCode');

export default CustomApp;
