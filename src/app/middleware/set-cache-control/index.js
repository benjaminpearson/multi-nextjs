const setCacheControl = ({ res }) => {
  res && res.setHeader('cache-control', 's-maxage=1, stale-while-revalidate');
  return false;
};

export default setCacheControl;
