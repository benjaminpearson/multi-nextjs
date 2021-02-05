import Head from 'next/head';
import { useRouter } from 'next/router'
import React from 'react';

function Placeholder({ ...props }) {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Placeholder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Placeholder</h1>
        <p>Props: {JSON.stringify(props)}</p>
        <p>Query: {JSON.stringify(router.query)}</p>
      </main>
    </div>
  )
}

export default Placeholder;
