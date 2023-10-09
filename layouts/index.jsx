import Head from "next/head";
import { Toaster } from "@/components/ui/toaster";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Sahib AI will help you handle the boring part of your startup so that you can focus on what matters to you."
        />
        <link rel="canonical" href="https://startup-assitant.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Sahib AI" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:description"
          content="Sahib AI will help you handle the boring part of your startup so that you can focus on what matters to you."
        />
        <meta property="og:image" content="./twitter_og.png" />
        <meta
          property="og:url"
          content="https://startup-assitant.vercel.app/"
        />
        <meta property="og:site_name" content="Sahib AI" />
        <meta name="robots" content="index, follow" />
      </Head>
      {children}
      <Toaster />
    </>
  );
}
