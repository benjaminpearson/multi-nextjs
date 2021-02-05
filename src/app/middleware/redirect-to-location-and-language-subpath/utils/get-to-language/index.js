import Cookie from '../../../../cookie';
import parser from 'accept-language-parser';
import _includes from 'lodash/includes';
import _find from 'lodash/find';

const getToLanguage = ({ req, languages }) => {
  const cookies = new Cookie({ req });
  const cookieLanguage = cookies.get('language');
  const acceptLanguageHeader = req?.headers['accept-language'];
  return (_includes(languages.list, cookieLanguage) && cookieLanguage) || parser.pick(languages.list, acceptLanguageHeader) || languages.default;
};

export default getToLanguage;
