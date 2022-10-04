import React from "react";
import Head from "next/head";

const Loading = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
      <Head>
        <title>Comments</title>

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-20 h-20 rounded-full border-t-4 border-l-4 border-black animate-spin" />
    </div>
  );
};

export default Loading;
