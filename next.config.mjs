import nextMDX from '@next/mdx';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import path from 'path';
import { fileURLToPath } from 'url';

// Buat bisa pake __dirname di ESM
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
    domains: ['avatars.githubusercontent.com', 'i.scdn.co']
  },
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@components': path.resolve(__dirname, 'src/components'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@public': path.resolve(__dirname, 'public')
    };
    return config;
  }
});
