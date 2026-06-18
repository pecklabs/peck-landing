import fs from "node:fs";
import path from "node:path";
import Script from "next/script";
import DownloadTracking from "./download-tracking";

function getLandingMarkup() {
  const html = fs.readFileSync(path.join(process.cwd(), "index.html"), "utf8");
  const bodyMarkup = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? "";

  return bodyMarkup.replace(/<script\s+src=["']script\.js["']><\/script>/i, "");
}

export default function Home() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: getLandingMarkup() }} />
      <DownloadTracking />
      <Script src="/script.js" strategy="afterInteractive" />
    </>
  );
}
