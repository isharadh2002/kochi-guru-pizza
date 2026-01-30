import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kochigurupizza.com"),
  title: "Kochi Guru Pizza - Coming Soon | Where Fire Meets Flavor",
  description:
    "Kochi Guru Pizza is launching soon! Experience authentic wood-fired pizzas in Kochi. Stay tuned for our grand opening. Where Fire Meets Flavor.",
  keywords:
    "pizza Kochi, wood-fired pizza, pizza delivery Kochi, best pizza Kochi, Kochi Guru Pizza, coming soon",
  authors: [{ name: "Kochi Guru Pizza" }],
  robots: "index, follow",
  openGraph: {
    title: "Kochi Guru Pizza - Coming Soon",
    description:
      "Kochi Guru Pizza is launching soon! Experience authentic wood-fired pizzas in Kochi. Where Fire Meets Flavor.",
    url: "https://kochigurupizza.com",
    siteName: "Kochi Guru Pizza",
    images: [
      {
        url: "/logo/logo.svg",
        width: 1200,
        height: 630,
        alt: "Kochi Guru Pizza Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kochi Guru Pizza - Coming Soon",
    description:
      "Kochi Guru Pizza is launching soon! Experience authentic wood-fired pizzas in Kochi.",
    images: ["/logo/logo.svg"],
  },
  icons: {
    icon: "/logo/logo.svg",
    apple: "/logo/logo.svg",
  },
  other: {
    "geo.region": "LK-32",
    "geo.placename": "Walasmulla",
    "geo.position": "6.2667;80.7333",
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
        <meta name="theme-color" content="#01383C" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Kochi Guru Pizza",
              description: "Authentic wood-fired pizzas in Kochi - Coming Soon",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Walasmulla",
                addressRegion: "Matara",
                addressCountry: "Sri Lanka",
                streetAddress:
                  "No.114, Basement Floor, Beliatta - Walasmulla Rd",
                postalCode: "82220",
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                opens: "10:00",
                closes: "22:00",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ],
              },
              priceRange: "LKR 900-4000",
              servesCuisine: "Pizza",
              slogan: "Where Fire Meets Flavor",
            }),
          }}
        />
      </head>
      <body className={`${poppins.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
