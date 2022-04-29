import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import { appAxiosGet } from "../../api/AppAxios";
import { useAppSelect } from "../../hooks/ReduxHooks";
import Notice from "../../model/interface/notice/notice";

const Notice: NextPage = () => {
  const router = useRouter();
  const accessToken = useAppSelect((state) => state.auth.accessToken);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [initial, setInitial] = useState<boolean>(false);
  const routeCreatingNoticePage = () => {
    router.push("/notice/create");
  };
  const onClickGetNotice = () => {
    appAxiosGet("/api/v1/notice/all", accessToken)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (accessToken && !initial) {
      setInitial(true);
      appAxiosGet("/api/v1/notice/all", accessToken)
        .then(async (res) => {
          const noticeList: Notice[] = await res.data;
          await setNotices(noticeList);
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    }
    alert("AccessToken 이 없습니다.");
  }, [accessToken, initial]);

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
      <Button variant={"contained"} onClick={onClickGetNotice}>
        공지 글 확인하기
      </Button>
    </div>
  );
};

export default Notice;
