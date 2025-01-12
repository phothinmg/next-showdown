import type { Metadata } from "next";
import { getPostsContent } from "@/lib/converter";
import BlogCard from "@/components/BlogCard";

export const metadata: Metadata = {
  title: "Blog",
  description: "NextShowdown Blog",
};

export default function BlogPosts() {
  const allBlogs = getPostsContent();
  return (
    <section className="h-screen w-full">
      <h3 className="text-lg font-semibold">All Posts</h3>
      <div className="flex flex-col gap-3 justify-center max-w-7xl px-4 py-3 mx-auto sm:px-6">
        {allBlogs
          .sort((a, b) => {
            if (new Date(a.data.date) > new Date(b.data.date)) {
              return -1;
            }
            return 1;
          })
          .map((post) => (
            <BlogCard
              key={post.slug}
              link={`/blog/${post.slug}`}
              title={post.data.title}
              date={post.data.date}
              description={post.data.description ?? ""}
              tags={post.data.tags ?? [""]}
            />
          ))}
      </div>
    </section>
  );
}
