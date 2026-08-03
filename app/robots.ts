import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },

    sitemap: "https://connectkes.com/sitemap.xml",

    host: "https://connectkes.com",
  };
}