import Head from 'next/head'

import { getEvents, getMedia, getPosts, getFeaturedMedia } from '../utils/wordpress';

import Post from "../components/Post";
import Event from "../components/Event";

export default function Home({posts, events, media}) {

  const jsxPosts = posts.map(post => {
    const featuredMediaId = post["featured_media"];
    const featuredMedia = getFeaturedMedia(media, featuredMediaId);
    return (
      <Post post={post} featuredMedia={featuredMedia} key={post.id}/>
    )
  });

  const jsxEvents = events.map(event => {
    const featuredMediaId = event["featured_media"];
    const featuredMedia = getFeaturedMedia(media, featuredMediaId);
    return (
      <Event event={event} featuredMedia={featuredMedia} key={event.id}/>
    )
  });

  return (
    <>
      <Head>
        <title>Tech Blog</title>
        <meta name="description" content="Keep up to date with the latest trends in tech" />
        <link rel="icon" href="/favicon.ico" />
        {/* You can add more metadata here, like open graph tags for social media, etc */}
      </Head>

      <div className="container pt-5">
        <h1 className="text-center pb-5">Tech Blog</h1>
        <div className="row">
          <div className="col-lg-8">
            <h2 className="pb-3">Our blog posts</h2>
            {jsxPosts}
          </div>
          <div className="col-lg-4">
            <h2 className="pb-3">Events</h2>
            {jsxEvents}
          </div>
        </div>
      </div>
    </>
  )

}

export async function getStaticProps({ params }) {

  const posts = await getPosts();
  const events = await getEvents();
  const media = await getMedia();

  return {
    props: {
     posts,
     events,
     media
    },
    revalidate: 10, // In seconds
  }

}
