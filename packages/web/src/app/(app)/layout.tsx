import {type Metadata} from 'next';
import {Roboto} from 'next/font/google';
import {type PropsWithChildren, Suspense} from 'react';
import {Footer, type NavLinkDefinition} from 'ui';
import {CookieConsent} from '../../components/cookie-consent/cookie-consent';
import {getCurrentUser} from '../../context/user/user';
import {getNavRoutes} from '../../lib/features/features';
import {Nav} from './nav';
import {Providers} from './providers';

import '../../../styles/globals.css';

const roboto = Roboto({
  weight: ['400', '900'],
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-roboto',
});

export const dynamic = 'force-dynamic';

export const generateMetadata = (): Metadata => ({
  metadataBase: new URL(process.env.FRONTEND_URL),
  title: {
    absolute: 'Yes Theory Family',
    template: '%s - Yes Theory Family',
  },
  icons: {
    icon: [
      {
        url: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
    ],
    apple: {
      sizes: '180x180',
      url: '/apple-touch-icon.png',
    },
  },
});

const RootLayout = async ({children}: PropsWithChildren) => {
  const user = await getCurrentUser();
  // TODO figure out why I am not allowed to check with payload here...
  const routes: NavLinkDefinition[] = await getNavRoutes();

  return (
    <html lang='en' className={roboto.variable}>
      <head>
        <link rel='manifest' href='/site.webmanifest' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#154eff' />
        <meta name='msapplication-TileColor' content='#2d89ef' />
        <meta name='theme-color' content='#ffffff' />
      </head>
      <body>
        <Suspense>
          <Providers user={user}>
            <CookieConsent />
            <div className='flex min-h-screen flex-col justify-between'>
              <Nav user={user} routes={routes} />
              <main>{children}</main>
              <div className='bg-white pt-6'>
                <Footer
                  links={[
                    {text: 'Imprint', href: '/legal/imprint'},
                    {text: 'Privacy', href: '/legal/privacy'},
                  ]}
                />
              </div>
            </div>
          </Providers>
        </Suspense>
      </body>
    </html>
  );
};

export default RootLayout;
