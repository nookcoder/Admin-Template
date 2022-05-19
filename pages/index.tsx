import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelect } from "../hooks/ReduxHooks";
import { setAccessToken } from "../redux/feature/auth/authSlice";
import CheckingAuthTemplate from "../components/template/CheckingAuthTemplate";
import { sendAuthCodeToSlack } from "../lib/api/AppFetchPost";

const Home: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelect((state) => state.auth.accessToken);
  const url = `${process.env["NEXT_PUBLIC_KAKAO_LOGIN_URL"]}`;

  const [authCode, setAuthCode] = useState<string>();
  const [publishedAuthCode, setPublishedAuthCode] = useState<string>();
  const [isAccess, setIsAccess] = useState<boolean>(false);

  const onClick = () => {
    if (authCode == publishedAuthCode) {
      alert("Correct");
      location.href = url;
    } else {
      alert("No");
    }
  };

  const publishAuthCode = useCallback(() => {
    sendAuthCodeToSlack(setPublishedAuthCode);
  }, []);

  const onChangeAuthCode = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setAuthCode(event.currentTarget.value);
    },
    [],
  );

  useEffect(() => {
    const tokenFromUrl = router.query;
    if (tokenFromUrl.token && typeof tokenFromUrl.token == "string") {
      setIsAccess(true);
      dispatch(setAccessToken(tokenFromUrl.token));
      router.push("/");
      return;
    }
    if (accessToken) {
      setIsAccess(false);
      return;
    }
  }, [router, dispatch]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Pple Admin | Main</title>
        <meta name="description" content="피플 Admin 웹사이트" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/*<Button variant={"contained"} onClick={onClickHekari}>*/}
      {/*  Hikeri*/}
      {/*</Button>*/}
      {isAccess ? (
        <CheckingAuthTemplate>인증 성공</CheckingAuthTemplate>
      ) : (
        <>
          <div className={styles.box}>
            <TextField onChange={onChangeAuthCode} label={"인증 코드 입력"} />
            <Button variant={"contained"} onClick={onClick}>
              인증하기
            </Button>
          </div>
          <div className={styles.box2}>
            <Button variant={"outlined"} onClick={publishAuthCode}>
              인증 토큰 발행
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
