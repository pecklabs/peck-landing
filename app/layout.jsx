import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "Peck - AI PR review agent",
  description:
    "Peck is a native macOS menu-bar app that watches GitHub PRs, drafts AI reviews, and shows your PR approval status from egg to chicken."
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
      </body>
    </html>
  );
}
