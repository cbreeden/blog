import { getAllPosts, PostContent } from '../lib/api'
import Head from 'next/head'


type IndexProps = {
  allPosts: PostContent[]
}

const Index = ({ allPosts }: IndexProps) => {
  console.log(allPosts);
  
  return (
    <>
      <Head>
        <title>Next.js Blog Example with Me.</title>
        <link rel="stylesheet" type="text/css" href="/static/css/katex.min.css" media="screen" />
      </Head>        
      <p>
        Hello, World!
      </p>
      <PostHistory allPosts={allPosts} />
    </>
  )
}

export default Index

const PostHistory = ({ allPosts }: IndexProps) => {
  console.log("post history");
  if (!allPosts.length) {
    console.log("early return");
    return null;
  }

  return (
    <ul>
      {allPosts.map(post => {
        return (<li>{post.meta.title}</li>)
      })}
    </ul>
  )
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts();

  return {
    props: { allPosts },
  }
}
