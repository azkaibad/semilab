import type { NextConfig } from "next";

// Set by the GitHub Pages workflow. The site is then built as plain static
// files and served from https://<user>.github.io/<repo>/.
const pagesBasePath = process.env.PAGES_BASE_PATH;

const nextConfig: NextConfig = {
  /* config options here */
  // Partial prerendering needs a server, so it is off in the static export.
  ...(pagesBasePath === undefined
    ? { cacheComponents: true, partialPrefetching: true }
    : { output: "export", basePath: pagesBasePath, trailingSlash: true }),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
