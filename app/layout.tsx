import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { meta } from "@/config";
import { ThemeProvider } from "@/components/ThemeSwitch";
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { inter } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  ...meta,
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${inter.variable} font-sans antialiasedm bg-[#ffffff] dark:bg-[#222121] text-slate-600 dark:text-[#ededed] flex flex-col items-center justify-center mx-auto mt-2 lg:mt-8 mb-20 lg:mb-40`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex-auto min-w-0 mt-2 md:mt-6 flex flex-col px-6 sm:px-4 md:px-0 max-w-[1200px] w-full">
            <NavBar />
            {children}
            <Footer />
            <SpeedInsights />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
