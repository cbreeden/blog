import matter from 'gray-matter'
import path from 'path'
import fs from 'fs'

const postsDirectory = path.join(process.cwd(), '_posts');

var md = require('markdown-it')(),
    mk = require('@iktakahiro/markdown-it-katex');

md.use(mk);

export interface PostMeta {
  title: string,
  date: string,
  excerpt?: string,
}

export interface PostContent {
  slug: string,
  content: string,
  meta: PostMeta,
}

export function getPostBySlug(slug: string): PostContent {
  const filePath = path.join(postsDirectory, slug + '.md');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const frontMatter = matter(fileContent);

  return {
    slug: slug,
    content: frontMatter.content,
    meta: {
      title: frontMatter.data.title || "",
      date: frontMatter.data.date || "",
      excerpt: frontMatter.excerpt || "",
    }
  }
}

export function getAllSlugs(): string[] {
  const allFiles = fs.readdirSync(postsDirectory);
  return allFiles.map(slug => slug.replace(/\.md$/, ''));
}

export function getAllPosts(): PostContent[] {
  const allSlugs = getAllSlugs();
  return allSlugs.map(slug => getPostBySlug(slug));
}

export function markdownToHtml(content: string): string {
  return md.render(content);
}