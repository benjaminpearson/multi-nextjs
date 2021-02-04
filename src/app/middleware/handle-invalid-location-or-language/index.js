const handleInvalidLocationOrLanguage = ({ shouldRedirect } = {}) => ({ res }, { locations, languages, location, language }) => {
  if (locations.list.indexOf(location) === -1 || languages.list.indexOf(language) === -1) {
    if (shouldRedirect) {
      // Redirect to default location and/or langauge
      res.writeHead(301, {
        Location: `/${locations.list.indexOf(location) === -1 ? locations.default : location}/${languages.list.indexOf(language) === -1 ? languages.default : language}${req.url.replace(locationLangRegex, '/')}`,
      });
      res.end();
      return true;
    }

    // Return not found is invalid location and/or langauge
    // NOTE: I think this is the most preferred solution for SEO purposes (check with others though, because redirect above helps user more)
    console.log('Manually visited invalid location and or language', { location, language });
    if (process.browser) {
      return { statusCode: 404 };
    } else {
      res.statusCode = 404;
    }
  }
  return false;
}

export default handleInvalidLocationOrLanguage;
