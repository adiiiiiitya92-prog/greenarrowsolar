export function JsonLd({ data }: { data: object }) {
  // `<` is escaped so content can never close the script tag (XSS-safe).
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
