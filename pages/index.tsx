import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelect } from "../hooks/ReduxHooks";
import { setAccessToken } from "../redux/feature/auth/authSlice";
import axios from "axios";
import { PrintErrorMessage } from "../util/Error";

// todo: 각 페이지별 권한 체크
const Home: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelect((state) => state.auth.accessToken);
  const [token, setToken] = useState<string>("");

  const onClick = () => {
    router.push("/login");
  };

  useEffect(() => {
    const tokenFromUrl = router.query;
    if (tokenFromUrl.token && typeof tokenFromUrl.token == "string") {
      setToken(tokenFromUrl.token);
      dispatch(setAccessToken(tokenFromUrl.token));
      console.log("OK");
    }
  }, [dispatch, router.query]);

  const onClickHekari = () => {
    axios
      .post(
        "http://ppledevtest-env.eba-9fa279up.ap-northeast-2.elasticbeanstalk.com/api/v1/admin/hikari/info",
        "",
        {
          headers: {
            "X-AUTH-TOKEN": `${accessToken}`,
          },
        },
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        PrintErrorMessage(err.status);
      });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Pple Admin | Main</title>
        <meta name="description" content="피플 Admin 웹사이트" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Button onClick={onClick}>로그인 Test /sss</Button>

      <Button variant={"contained"} onClick={onClickHekari}>
        Hikeri
      </Button>
    </div>
  );
};

export default Home;
