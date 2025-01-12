/*
 In Next 15, Dynamic APIs have been made asynchronous. 
 - The `params` and `searchParams` props that get provided to posts, layouts, metadata APIs, and route handlers.
 - `cookies()`, `draftMode()`, and `headers()` from `next/headers`
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostsContent } from "@/lib/converter";
import PostLayout from "@/layoutes/post-layout";
import { base_url } from "@/config";

// // ---
// /**
//  * Asynchronously retrieves static parameters for posts.
//  *
//  * @returns {Promise<Array<{ slug: string }>>} A promise that resolves to an array of objects,
//  * each containing a `slug` property representing the post identifier.
//  */
// export const getStaticParams = async (): Promise<Array<{ slug: string }>> =>
//   getPostsContent().map(({ slug }) => ({ slug }));
// // ---
export async function generateStaticParams() {
  let posts = getPostsContent();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const slug = (await params).slug;
  const post = getPostsContent().find((p) => p.slug === slug);
  if (!post) return;
  const { title, description, ogImg } = post.data;
  const ogImage =
    `${base_url}/${ogImg}` ||
    `${base_url}/ogp?title=${encodeURIComponent(title)}`;
  return {
    metadataBase: new URL(base_url),
    title,
    description: description,
    openGraph: {
      title,
      description: description,
      type: "article",
      url: base_url,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description,
      images: [ogImage],
    },
  };
}

export default async function Blog({
  params,
}: {
  // Params must be promise
  params: Promise<{ slug: string }>;
}) {
  // asynchronous access of `params.slug`.
  const slug = (await params).slug;
  const post = getPostsContent().find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }
  return (
    <PostLayout
      convertedHtml={post.convertedHtml}
      postTitle={post.data.title}
      date={post.data.date}
      description={post.data.description}
      tags={post.data.tags}
    />
  );
}
