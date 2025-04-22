import nextMDX from '@next/mdx';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import path from 'path';
import { fileURLToPath } from 'url';

// Support __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('rehype-autolink-headings').Options} */
const rehypeAutolinkHeadingsOptions = {
  behavior: 'wrap'
};

/** @type {import('rehype-pretty-code').Options} */
const rehypePrettyCodeOptions = {
  theme: {
    light: 'light-plus',
    dark: 'dark-plus'
  },
  keepBackground: false,
  onVisitLine(element) {
    element.properties.className = ['line'];
  },
  onVisitHighlightedLine(element) {
    element.properties.className.push('highlighted');
  },
  onVisitHighlightedChars(element) {
    element.properties.className = ['word'];
  }
};

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions],
      [rehypePrettyCode, rehypePrettyCodeOptions]
    ],
    providerImportSource: '@mdx-js/react'
  }
});

export default withMDX({
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com', 'i.scdn.co'],
    unoptimized: true // Added for static exports (if needed)
  },
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  // Explicitly configure pages directory
  experimental: {
    appDir: false, // Disable App Router
    pagesDir: path.join(__dirname, 'src/pages') // Point to custom pages location
  },
  // Enable static export if needed
  output: 'export', // Optional: for static site generation
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@components': path.resolve(__dirname, 'src/components'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      '@public': path.resolve(__dirname, 'public')
      // Removed @pages alias since we're using experimental.pagesDir
    };
    return config;
  }
});
