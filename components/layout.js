import Head from "next/head";
import { siteDescription, siteTitle } from "../src/constants";
import Navbar from "./Navbar";
import PageTitleMeta from "./PageTitleMeta";

export default function Layout ({ children }) {
  return (
    <>
      <PageTitleMeta />
      <Head>
        <meta name="description" content={siteDescription} />
        <meta name="robots" content="noindex,nofollow" />
        <link
          rel="icon"
          type="image/png"
          sizes="128x128"
          href="/icons/favicon-128x128.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/icons/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        <link rel="icon" type="image/ico" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="pt-40 w-full mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-50 h-screen">{children}</main>
    </>
  );
}
