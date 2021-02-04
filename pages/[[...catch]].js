// [[catch]].js is an optional catch all route https://github.com/vercel/next.js/pull/12887

import React from 'react';
import Error from 'next/error';

function Catch() {
  return <Error statusCode={404} />
}

export default Catch;
