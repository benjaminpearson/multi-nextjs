import React from 'react';
import Error from 'next/error';

function Error404() {
  return <Error statusCode={404} />
}

export default Error404;
