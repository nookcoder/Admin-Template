import React from "react";
import { NextPage } from "next";
import GlobalNavigationBar from "../../components/common/GlobalNavigationBar";
import Head from "next/head";

const Notice: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Pple Admin | Notice</title>
        <meta name="description" content="피플 Admin 공지사항" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalNavigationBar />
      공지사항 페이지
    </div>
  );
};

export default Notice;
