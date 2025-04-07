import dynamic from 'next/dynamic';
import type { Metadata } from "next";
// scripts
import Script from "next/script";
import { GoogleAnalytics } from '@next/third-parties/google'
// font
import localFont from "next/font/local";
// scss
import "./globals.css";
// theme
import { ThemeProvider } from "@/components/theme-provider";
// components
import NavigationLoader from './navigation-loader';

// Dynamically import non-critical components
const Navigation = dynamic(() => import('./navigation'), { ssr: false, loading: () => <NavigationLoader />});
const Footer = dynamic(() => import('./footer'), { ssr: false });
const DynamicToaster = dynamic(
  () => import('@/components/ui/toaster').then((mod) => mod.Toaster),
  { ssr: false }
);

const myFont = localFont({
  src: [
    {
      path: "../public/fonts/Roboto-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Roboto-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Roboto-Bold.ttf",
      weight: "700",
      style: "bold",
    },
  ],
  variable: "--font-geist-sans",
});

const ecolivingtoolsFont = localFont({
  src: "../public/fonts/ecolivingtools.woff",
  variable: "--font-there-tools",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.BASE_URL}`),
  title: `Best Eco Living Tools for a Greener Home & Lifestyle`,
  description: `Discover the best eco living tools to save energy, reduce waste, and create a sustainable home. Upgrade your lifestyle with smart choices - ${process.env.APP_NAME}`,
  applicationName: `${process.env.APP_NAME}`,
  authors: {
    name: `${process.env.APP_NAME} team`,
    url: `${process.env.BASE_URL}`,
  },
  creator: `${process.env.APP_NAME} team`,
  publisher: `${process.env.APP_NAME}`,
  icons: {
    icon: [
      {
        rel: "icon",
        url: `${process.env.BASE_URL}/favicon.ico`,
        type: "image/x-icon",
      },
      {
        rel: "icon",
        url: `${process.env.BASE_URL}/favicon-16x16.png`,
        sizes: "16x16",
        type: "image/png",
      },
      {
        rel: "icon",
        url: `${process.env.BASE_URL}/favicon-32x32.png`,
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: "/apple-touch-icon.png?v=2",
  },
  openGraph: {
    type: "website",
    title:
      "Best Eco Living Tools for a Greener Home & Lifestyle",
    description: `Discover the best eco living tools to save energy, reduce waste, and create a sustainable home. Upgrade your lifestyle with smart choices`,
    siteName: `${process.env.APP_NAME}`,
    emails: `contact@${process.env.APP_NAME_S}.com`,
    url: `${process.env.BASE_URL}`,
    images: {
      url: `${process.env.BASE_URL}/ecolivingtools.png`,
      secureUrl: `${process.env.BASE_URL}/ecolivingtools.png`,
      alt: `${process.env.APP_NAME}`,
    },
  },
  twitter: {
    card: "summary_large_image",
    site: `${process.env.X_SITE}`,
    creator: `${process.env.APP_NAME}`,
    title:
      "Best Eco Living Tools for a Greener Home & Lifestyle",
    description: `Discover the best eco living tools to save energy, reduce waste, and create a sustainable home. Upgrade your lifestyle with smart choices`,
    images: {
      url: `${process.env.BASE_URL}/ecolivingtools.png`,
      secureUrl: `${process.env.BASE_URL}/ecolivingtools.png`,
      alt: `${process.env.APP_NAME}`,
    },
  },
  alternates: {
    canonical: `${process.env.BASE_URL}`,
    languages: {
      "en-us": `${process.env.BASE_URL}` || "https://www.ecolivingtools.com",
      "en-ca": `${process.env.BASE_URL}` || "https://www.ecolivingtools.com",
      en: `${process.env.BASE_URL}` || "https://www.ecolivingtools.com",
      "x-default": `${process.env.BASE_URL}` || "https://www.ecolivingtools.com",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Initialize Consent Mode with default settings */}
        <Script id="consent-default" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){ dataLayer.push(arguments); }
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'analytics_storage': 'denied'
            });
          `}
        </Script>
      </head>
      <body className={`${myFont.variable} ${ecolivingtoolsFont.variable}`}>
        <ThemeProvider>
          <div className="app">
            <Navigation />
            <div className="app-body font-[family-name:var(--font-geist-sans)]">
              <main className="flex flex-col row-start-2">
                {children}
              </main>
            </div>
            <Footer />
          </div>
          <DynamicToaster />
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId={`${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
    </html>
  );
}

/**
 * TODO
 * categories must fetch with on server and cached
 * enhance the text editor
 * fixing redirect issue https://chatgpt.com/c/67ce2f31-7bf8-800c-9c9d-c85ce7a76263
 */
/**
 * TO IMPROVE
 * aws s3 bucket, secure
 * the api is secure | same orgin by defualt | need more security
 * build a category page
 *
 */
