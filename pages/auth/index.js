import { getSession } from 'next-auth/react';
import React from 'react';
import Auth from '../../components/Auth/Auth';

export default function AuthPage() {
  return <Auth />;
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return { props: {} };
}
