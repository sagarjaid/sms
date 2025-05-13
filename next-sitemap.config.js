/** @format */

module.exports = {
  // REQUIRED: add your own domain name here (e.g. https://smslly.com),
  siteUrl: 'https://smslly.com',
  generateRobotsTxt: true,
  // use this to exclude routes from the sitemap (i.e. a user dashboard). By default, NextJS app router metadata files are excluded (https://nextjs.org/docs/app/api-reference/file-conventions/metadata)
  exclude: [
    '/twitter-image.*',
    '/opengraph-image.*',
    '/icon.*',
    '/api/*',
    '/dash/*',
    '/signin/*',
    '/_*',
    '/404',
    '/500',
  ],
  // Add additional configuration for better static URL handling
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 1000,
  autoLastmod: true,
  // Generate sitemap for all static pages
  generateIndexSitemap: true,
  // Add trailing slashes to URLs
  trailingSlash: true,
  // Additional options for better handling of dynamic routes
  transform: async (config, path) => {
    // Custom transform function to handle dynamic routes
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
  // Additional options for better static generation
  outDir: 'public',
  // Add additional paths that should be included in the sitemap
  additionalPaths: async (config) => {
    const result = [];
    // Add any additional paths that should be included in the sitemap
    return result;
  },
};
