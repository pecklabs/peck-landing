import { Analytics } from "@vercel/analytics/next";
import { Agentation } from "agentation";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

const title = "Peck - AI PR review agent";
const description =
  "Peck is a native macOS menu-bar app that watches GitHub PRs, drafts AI reviews, and shows your PR approval status from egg to chicken.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Peck",
    type: "website",
    images: [
      { url: "/og-b.png", width: 1200, height: 630, type: "image/png", alt: title }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-b.png"]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css"
        />
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        {children}
        <Analytics />
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  );
}
