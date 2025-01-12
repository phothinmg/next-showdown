import fs from "fs";
import path from "path";
import Showdown from "showdown";
import {
  showdownOptions,
  showdownFlavor,
  mdDir,
  indexFile,
  pagesDir,
  postsDir,
} from "@/config";
import frontmatter from "lwe8-frontmatter";
// types
type PageMetadata = {
  title: string;
  description?: string;
  ogImg?: string;
};
type PostMetadata = {
  title: string;
  date: string;
  description?: string;
  tags?: string[];
  ogImg?: string;
};
export type Posts = {
  data: PostMetadata;
  slug: string;
  convertedHtml: string;
};
export type Pages = {
  data: PageMetadata;
  slug: string;
  convertedHtml: string;
};
// Create new showdown converter instance
const showdownConverter = new Showdown.Converter(showdownOptions);
showdownConverter.setFlavor(showdownFlavor);
// creating path for markdown files
const projectRoot = process.cwd();
const mdDirPath = path.join(projectRoot, mdDir);
const indexFilePath = path.join(projectRoot, indexFile);
const pagesDirPath = path.join(projectRoot, pagesDir);
const postsDirPath = path.join(projectRoot, postsDir);

// ------------------------------------------------------
(() => {
  if (!fs.existsSync(mdDirPath)) {
    console.info(
      `Directory for markdown files ${mdDir} dose not exist.Blog will create that.`
    );
    fs.mkdirSync(mdDirPath, { recursive: true });
  }
  if (!fs.existsSync(pagesDirPath)) {
    console.info(
      `Directory for pages ${pagesDir} dose not exist.Blog will create that.`
    );
    fs.mkdirSync(pagesDirPath, { recursive: true });
  }
  if (!fs.existsSync(postsDirPath)) {
    console.info(
      `Directory for posts ${postsDir} dose not exist.Blog will create that.`
    );
    fs.mkdirSync(postsDirPath, { recursive: true });
  }
  if (!fs.existsSync(indexFilePath)) {
    console.info(
      `Markdown file for home page ${indexFile} dose not exist. Blog will create that to start the app.`
    );
    fs.writeFileSync(indexFilePath, "## This is Home Page.");
  }
})();
// ---------------------------------------------------------------------------------

export function getIndexContent() {
  const raw = fs.readFileSync(indexFilePath, "utf8");
  const { content } = frontmatter(raw);
  return showdownConverter.makeHtml(content);
}

export function getPagesContent() {
  const pageFiles = (
    fs.readdirSync(pagesDirPath, { recursive: true }) as string[]
  ).filter((i) => path.extname(i) === ".md");
  const pages: Pages[] = [];
  pageFiles.map((file) => {
    const rawContent = fs.readFileSync(path.join(pagesDirPath, file), "utf-8");
    const { data, content } = frontmatter<PageMetadata>(rawContent);
    const convertedHtml = showdownConverter.makeHtml(content);
    const slug = path.basename(file, path.extname(file));
    pages.push({ data, slug, convertedHtml });
  });
  return pages;
}

export function getPostsContent() {
  const postFiles = (
    fs.readdirSync(postsDirPath, { recursive: true }) as string[]
  ).filter((i) => path.extname(i) === ".md");
  const posts: Posts[] = [];
  postFiles.map((file) => {
    const rawContent = fs.readFileSync(path.join(postsDirPath, file), "utf-8");
    const { data, content } = frontmatter<PostMetadata>(rawContent);
    const convertedHtml = showdownConverter.makeHtml(content);
    const slug = path.basename(file, path.extname(file));
    posts.push({ data, slug, convertedHtml });
  });
  return posts;
}
