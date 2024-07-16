import '../styles/global.css';
import { SessionProvider } from 'next-auth/react';
import AppProviders from '../components/AppProviders/AppProviders';

function MyApp({ Component, pageProps: { data, ...pageProps } }) {
  return (
    <SessionProvider session={data} refetchInterval={5 * 60}>
      <AppProviders user={pageProps?.session?.user}>
        <Component {...pageProps} />;
      </AppProviders>
    </SessionProvider>
  );
}

export default MyApp;
