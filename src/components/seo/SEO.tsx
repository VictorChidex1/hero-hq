import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  name?: string;
  type?: string;
  canonical?: string;
}

export default function SEO({
  title,
  description,
  name = "The Can Man",
  type = "website",
  canonical,
}: SEOProps) {
  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Facebook Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {/* <meta property="og:image" content={image} /> See below */}

      {/* Twitter Tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
