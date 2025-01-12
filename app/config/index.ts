import * as mod from "../../site.config";

const config: import("./types").Configuration = mod.default;
//
export const base_url = config.baseUrl ?? "http://localhost:3000";
// Meta
export const siteName = config.siteName ?? "Next Showdown";
export const meta = config.meta
  ? {
      title: {
        template: `%s | ${siteName}`,
        default: siteName,
      },
      ...config.meta,
    }
  : {
      title: {
        template: `%s | ${siteName}`,
        default: siteName,
      },
    };
// Showdown
export const showdownOptions = config.showdown?.converterOptions ?? {};
export const showdownFlavor = config.showdown?.flavor ?? "github";
// Markdown
export const mdDir = config.markdownDirectory?.dir ?? "content";
export const indexFile =
  config.markdownDirectory?.indexFile ?? "content/index.md";
export const pagesDir = config.markdownDirectory?.pages ?? "content/pages";
export const postsDir = config.markdownDirectory?.posts ?? "content/posts";
// Nav Links

export const navLinks = config.navBarItems ?? [];
export const socialLinks = config.socialLinks ?? [];
