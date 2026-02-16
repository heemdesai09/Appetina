import type { Metadata } from 'next';
import { Playfair_Display, Lora, Montserrat } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Appetina - The Banquet & Restaurant | Premium Events & Dining in Ahmedabad',
  description:
    'Experience luxury dining and unforgettable events at Appetina, Ahmedabad\'s premier banquet hall and multi-cuisine restaurant. Perfect for weddings, corporate events, and celebrations.',
  keywords:
    'Appetina, banquet hall Ahmedabad, restaurant Ahmedabad, wedding venue, corporate events, multi-cuisine restaurant, fine dining, CTM Ahmedabad, Amraiwadi',
  authors: [{ name: 'Appetina Restaurant' }],
  openGraph: {
    title: 'Appetina - The Banquet & Restaurant',
    description:
      'Experience luxury dining and unforgettable events at Appetina, Ahmedabad\'s premier banquet hall and restaurant.',
    url: 'https://appetina.com',
    siteName: 'Appetina',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Appetina Restaurant & Banquet Hall',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Appetina - The Banquet & Restaurant',
    description:
      'Experience luxury dining and unforgettable events at Appetina, Ahmedabad\'s premier banquet hall.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${lora.variable} ${montserrat.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#333',
              border: '1px solid #6f2c2c',
            },
            success: {
              iconTheme: {
                primary: '#6f2c2c',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#dc2626',
                secondary: '#fff',
              },
            },
          }}
        />
        
        {/* Schema.org markup for Restaurant */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Restaurant',
              name: 'Appetina The Banquet & Restaurant',
              image: 'https://appetina.com/og-image.jpg',
              '@id': 'https://appetina.com',
              url: 'https://appetina.com',
              telephone: '+919979448440',
              priceRange: '$$',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Aastha-99, Near CTM, Amraiwadi',
                addressLocality: 'Ahmedabad',
                addressRegion: 'Gujarat',
                postalCode: '380026',
                addressCountry: 'IN',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 23.0344,
                longitude: 72.6211,
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                  opens: '11:00',
                  closes: '23:00',
                },
              ],
              servesCuisine: ['North Indian', 'Chinese', 'South Indian', 'Multi-Cuisine'],
              acceptsReservations: true,
            }),
          }}
        />
      </body>
    </html>
  );
}
