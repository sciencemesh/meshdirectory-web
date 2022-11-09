import Head from "next/head";
import { siteTitle } from "../src/constants";

export default function PageTitleMeta({ subtitle = "" }) {
  const title = `${siteTitle}${subtitle ? " | " + subtitle : ""}`;
  return (
    <Head key="title">
      <title key="pageTitle">{title}</title>
      <meta key="pageTitleMeta" name="title" content={title} />
    </Head>
  );
}
