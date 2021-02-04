const setCacheControl = ({ res }) => {
  if (res) {
    res.setHeader('cache-control', 's-maxage=1, stale-while-revalidate');
  }
};

export default setCacheControl;
