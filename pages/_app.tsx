import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';

import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
// import { Inter } from 'next/font/google';
import { GoogleFonts } from 'next-google-fonts';


import '@/styles/globals.css';

// const inter = Inter({ subsets: ['latin'] });

function App({ Component, pageProps }: AppProps<{}>) {
  const queryClient = new QueryClient();

  return (
    <div>
      {/* <div className={inter.className}> */}
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <GoogleFonts href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" />
        <Component {...pageProps} />
      </QueryClientProvider>
    </div>
  );
}

export default appWithTranslation(App);
