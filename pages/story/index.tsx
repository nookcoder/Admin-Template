import React from "react";
import { NextPage } from "next";
import GlobalNavigationBar from "../../components/common/GlobalNavigationBar";
import Head from "next/head";

const Story: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Pple Admin | Story</title>
        <meta name="description" content="피플 Admin 사연 정보" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalNavigationBar />
      story 페이지
    </div>
  );
};

export default Story;
