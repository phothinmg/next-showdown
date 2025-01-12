import { getIndexContent } from "@/lib/converter";
import PageLayout from "@/layoutes/page-layout";

export default function Home() {
  const html = getIndexContent();
  return <PageLayout convertedHtml={html} />;
}
