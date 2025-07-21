export default function robots() {
    return {
      rules: [
        {
          userAgent: "*",
          allow: "/",
          disallow: "/private/",
        },
      ],
      sitemap: "https://www.riverside-dip.com/sitemap.xml",
    };
  }