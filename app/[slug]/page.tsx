/*
 In Next 15, Dynamic APIs have been made asynchronous. 
 - The `params` and `searchParams` props that get provided to pages, layouts, metadata APIs, and route handlers.
 - `cookies()`, `draftMode()`, and `headers()` from `next/headers`
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPagesContent } from "@/lib/converter";
import PageLayout from "@/layoutes/page-layout";
import { base_url } from "@/config";

// ---
/**
 * Asynchronously retrieves static parameters for pages.
 *
 * @returns {Promise<Array<{ slug: string }>>} A promise that resolves to an array of objects,
 * each containing a `slug` property representing the page identifier.
 */
export const getStaticParams = async (): Promise<Array<{ slug: string }>> =>
  getPagesContent().map(({ slug }) => ({ slug }));
// ---
/**
 * Generates metadata for a page based on the provided slug.
 *
 * @param {Object} params - An object containing a promise that resolves to an object with a slug property.
 * @returns {Promise<Metadata | undefined>} A promise that resolves to the metadata object or undefined if the page is not found.
 *
 * The metadata includes the title, description, and Open Graph and Twitter card information.
 * If the page corresponding to the slug is not found, the function returns undefined.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const slug = (await params).slug;
  const page = getPagesContent().find((p) => p.slug === slug);
  if (!page) return;
  const { title, description, ogImg } = page.data;
  const ogImage = ogImg || `${base_url}/ogp?title=${encodeURIComponent(title)}`;
  return {
    title,
    description: description,
    openGraph: {
      title,
      description: description,
      type: "article",
      url: `${base_url}/${page.slug}`,
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
// --
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const page = getPagesContent().find((p) => p.slug === slug);
  if (!page) {
    notFound();
  }
  return <PageLayout convertedHtml={page.convertedHtml} />;
}
