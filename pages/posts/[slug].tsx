import { getPostBySlug, getAllSlugs, markdownToHtml, getAllPosts, PostContent } from '../../lib/api'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'

const Blog = ({ post }) => {
  return (
    <>
      <Head>
        <title>Next.js Blog Example with Me.</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css" />
      </Head>
      <h1>{post.meta.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </>
  )
}

export default Blog;

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params.slug as string;
  const post = getPostBySlug(slug);
  post.content = markdownToHtml(post.content);

  return {
    props: { post },
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allSlugs = getAllSlugs();

  return {
    paths: allSlugs.map(slug => {
      return {
        params: { slug }
      }
    }),
    fallback: false
  };
}