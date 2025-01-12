import { Configuration } from "@/config/types";
import showdownShiki from "showdown-shiki";
// import copyCode from "@/extensions/copy-code";
export default {
  siteName: "NextShowdown",
  meta: {},
  showdown: {
    converterOptions: {
      emoji: true,
      parseImgDimensions: true,
      noHeaderId: true,
      openLinksInNewWindow: true,
      headerLevelStart: 2,
      extensions: [
        showdownShiki({
          themes: {
            darkMode: true,
            theme: { light: "vitesse-light", dark: "vitesse-dark" },
          },
        }),
      ],
    },
    flavor: "github",
  },
  navBarItems: [
    {
      name: "Blog",
      link: "/blog",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Projects",
      link: "/projects",
    },
  ],
  socialLinks: [
    {
      name: "github",
      link: "https://github.com/",
    },
  ],
} satisfies Configuration;
