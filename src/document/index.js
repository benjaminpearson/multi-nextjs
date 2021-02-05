import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class CustomDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* These need to be absolute urls so we need the protocol somehow */}
          {/* Has to be added manually https://nextjs.org/docs/advanced-features/i18n-routing#search-engine-optimization */}
          {/* https://developers.google.com/search/docs/advanced/crawling/localized-versions#:~:text=The%20reserved%20value%20hreflang%3D%22x,page%20when%20no%20languages%20match. */}
          {/* Use https://github.com/garmeeh/next-seo */}
          {/* <link rel="alternate" href="http://example.com" hreflang="es-es" />
          <link rel="alternate" href="http://example.com/fr/" hreflang="fr-fr" />
          <link rel="alternate" href="http://example.com/uk/en/" hreflang="en-uk" />
          <link rel="alternate" href="http://example.com/au/en/" hreflang="en" /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default CustomDocument;
