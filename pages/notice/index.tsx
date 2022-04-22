import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/router";
import { Button } from "@mui/material";

const Notice: NextPage = () => {
  const router = useRouter();
  const routeCreatingNoticePage = () => {
    router.push("/notice/create");
  };

  return (
    <div>
      <Head>
        <title>Pple Admin | Notice</title>
        <meta name="description" content="피플 Admin 공지사항" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      공지사항 페이지
      <Button variant={"contained"} onClick={routeCreatingNoticePage}>
        공지 글 등록하기
      </Button>
    </div>
  );
};

export default Notice;
