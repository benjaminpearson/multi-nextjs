import React from 'react';
import Error from 'next/error';
import _transform from 'lodash/transform';
import _merge from 'lodash/merge';
import _pick from 'lodash/pick';
import redirectLowercase from 'app/middleware/redirect-lowercase';
import getSiteConfig from 'app/middleware/get-site-config';
import serveRobots from 'app/middleware/serve-robots';
import setCacheControl from 'app/middleware/set-cache-control';
import handleInvalidLocationOrLanguage from 'app/middleware/handle-invalid-location-or-language';
import getLocationAndLanguageFromPath from 'app/middleware/get-location-and-language-from-path';
import redirectToLocationAndLanguageSubpath from 'app/middleware/redirect-to-location-and-language-subpath';
import _map from 'lodash/map';
import Link from 'next/link';
import cookie from 'cookie';

function MyApp(context) {
  const { Component, pageProps, statusCode } = context;
  return <div style={{ backgroundColor: pageProps.theme.color }}>
    <div>
      {_map(['one.local', 'two.local'], value => {
        return <Link key={value} href="/feature/abc"><a onClick={() => {
          document.cookie = cookie.serialize('hostname', value, { path: '/' });
        }}>{value}</a></Link>;
      })}
    </div>
    {statusCode !== 200 ? <Error statusCode={statusCode} /> : <Component {...pageProps} /> }
  </div>;
}

MyApp.getInitialProps = ({ ctx }) => _pick(_transform([
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

export default MyApp;
