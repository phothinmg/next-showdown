import Link from "next/link";
import { formatDate } from "@/lib/helpers";
export type BlogCardProps = {
  link: string;
  title: string;
  date: string;
  description?: string;
  tags?: string[];
};

export default function BlogCard({
  link,
  title,
  date,
  description,
  tags,
}: BlogCardProps) {
  return (
    <div className="p-4 flex flex-col w-auto justify-center items-center gap-1 border rounded-md">
      <Link
        href={link}
        className="text-xl font-semibold text-blue-700 hover:underline two-lines dark:text-blue-100"
      >
        {title}
      </Link>
      <p>{formatDate(date)}</p>
      <div className="flex flex-wrap gap-2 text-xs text-gray-600 dark:text-gray-300">
        {tags?.map((tg) => (
          <span
            key={tg}
            className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-600"
          >
            {tg}
          </span>
        ))}
      </div>
      <p className="text-gray-800 two-lines dark:text-gray-300">
        {description}
      </p>
    </div>
  );
}
