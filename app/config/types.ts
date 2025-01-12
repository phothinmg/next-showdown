import type { Metadata } from "next";

export interface Configuration {
  baseUrl?: string;
  siteName?: string;
  meta?: Omit<Metadata, "title">;
  socialLinks?: Array<{
    name:
      | "codepen"
      | "codesandbox"
      | "dev-to"
      | "discord"
      | "facebook"
      | "gitbook"
      | "github"
      | "gitlab"
      | "hashnode"
      | "jsfiddle"
      | "line"
      | "linkedin"
      | "mastodon"
      | "medium"
      | "messenger"
      | "slack"
      | "stackedit"
      | "stackoverflow"
      | "telegram"
      | "viber"
      | "wechat"
      | "whatsapp"
      | "wordpress"
      | "youtube"
      | "twitter-X";
    link: string;
  }>;
  showdown?: {
    converterOptions?: import("showdown").ConverterOptions;
    flavor?: import("showdown").Flavor;
  };
  navBarItems?: Array<{ name: string; link: string }>;
  /**
   * Directory info for markdown files
   */
  markdownDirectory?: {
    /**
     * Main directory of markdown files
     * @default "content"
     *
     * */
    dir?: string;
    /**
     * Name of the file that serve as Home Page
     * @default "content/index.md"
     */
    indexFile?: string;
    /**
     * Sub-directory for pages
     * @default "content/pages"
     */
    pages?: string;
    /**
     * Sub-directory for blog's posts
     * @default "content/posts"
     */
    posts?: string;
  };
}
