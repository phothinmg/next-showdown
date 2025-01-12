import React from "react";
import { formatDate } from "@/lib/helpers";
type PostLayoutProps = {
  convertedHtml: string;
  postTitle?: string;
  date?: string;
  description?: string;
  tags?: string[];
};
const PostLayout: React.FC<PostLayoutProps> = ({
  convertedHtml,
  postTitle,
  date,
  description,
  tags,
}) => {
  const html = { __html: convertedHtml };
  const title = postTitle ?? "";
  const dst = date ? formatDate(date) : "";
  const des = description ?? "";
  const tgs = tags ?? [];
  return (
    <section>
      <div className="flex flex-col justify-center items-center">
        <h1 className="mb-3 font-medium text-2xl">{title}</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">{dst}</p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">{des}</p>
        <div className="flex flex-wrap gap-2 text-xs text-gray-600 dark:text-gray-300 mt-3">
          {tgs?.map((tg) => (
            <span
              key={tg}
              className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-600"
            >
              {tg}
            </span>
          ))}
        </div>
      </div>
      <hr className="mt-5 mb-5" />
      <div className="flex flex-col w-auto items-center">
        <article
          suppressHydrationWarning={true}
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={html}
        />
      </div>
    </section>
  );
};

export default PostLayout;
