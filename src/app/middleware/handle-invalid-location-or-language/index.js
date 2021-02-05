const handleInvalidLocationOrLanguage = ({}, { locations, languages, location, language }) => {
  if (locations.list.indexOf(location) === -1 || languages.list.indexOf(language) === -1) {
    return { statusCode: 404 };
  }
  return false;
};

export default handleInvalidLocationOrLanguage;
