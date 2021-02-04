# multi-nextjs
Example for hosting multiple sites, locations, languages from one NextJS codebase

Cloudflare Responsibilities
-------------------
- Detect Geo location - CF-IPCountry (not visible to visitors in response)
  - Use non .com domain name as precendence (ie, irrespective of country if I visit example.com.au then still set country header to Australia - use X-Domain-Country)
- Pass Accept-Language onto origin (should be out of the box)
- Handle DDOS, rate limiting, IP blocking (out of the box)
- Cache disabled
- DNS for all domains (.com.au, .co.uk) point to the one .com domain (apple and microsoft do this)
- .com domains all point to the one vercel project deployment
- Image Optimisation for assets not in CMS??? Not "must have" if it means higher plan is required
- Remove www. from urls (although could do this with nextjs looking at hostname)

Vercel Responsibilities
--------------
- Edge Cache - stale-while-revalidate (should cache per hostname https://github.com/vercel/vercel/discussions/5234#discussioncomment-121364)
- One project, continuous delivery, use feature flags
- Multiple domains can be added for one project (https://vercel.com/docs/platform/limits#domains - max 50 unless contact team)
- TODO: Think about how to set env vars if they need to be different per domain

NextJS Responsibilities
--------------
- [x] Read hostname in order to load config for that site and put on context provider for use elsewhere
  - [x] If hostname isn't recognised and in non production env, then look at querystring `?hostname=domain.com` to use as hostname. This is needed for preview urls where you can't have multiple domains easily. For local development setup aliases in `/etc/hosts` file (ie, `127.0.0.1 one.local` so you can view `localhost:3000?hostname=one.local` or just `one.local`).
  - [x] Finally allow switching site using cookie and store chosen choice for next load
- [x] Read headers to inform location and language, otherwise choose default
- [x] Store cookie of manually chosen language (if done) and use that over using the Accept-Language header option
- [x] Always have location and language in url path
- [x] Contains awareness of each brand and locations and associated config
- [x] Convert all urls to lowercase
- [x] Always add trailing slash to URL, makes pages served consistent and not end up with two pages with same content which isn't good for SEO. Having trailing slash helps with regex to check its the complete segment of the path. https://nextjs.org/docs/api-reference/next.config.js/trailing-slash
- Put language hreflang meta tags in header (see uber page source). Use https://github.com/garmeeh/next-seo
- [x] Return 404 for pages that are disabled for that location's config
  - Also ensure they are not in the hreflang meta data links if they are disabled in that region
- Ensure robots can't visit site when not in production mode (X-Robots-Tag is an option https://developers.google.com/search/reference/robots_meta_tag#xrobotstag). Note: Preview urls already add https://vercel.com/docs/platform/deployments#preview
- [x] Return 404 on urls that are not supported for that location's config


Notes:
- Tried NextJS built in rewrites, however that doesn't allow you to change the rewrites dynamically based on the currently requested site
- Tried using internationalisation routes but doesn't have outcome the above can achieve, has drawbacks
  - Mapping domain to default language ignores if someone with chinese computer lang visits .com.au for instance
  - Using accept langauge header is non ideal way of figuring out location

TODO:
- Investigate dynamic sitemap
  - Has dynamic urls
  - Has different pages enabled per location
  - Includes hreflang attributes https://medium.com/@sajidhasan054/hreflang-implementation-unsing-xml-sitemap-616afb4f6a41
- Add tests for code
