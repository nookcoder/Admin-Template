import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";
import { useAppDispatch } from "../hooks/ReduxHooks";
import { setAccessToken } from "../redux/feature/auth/authSlice";

const Home: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [token, setToken] = useState<string>("");

  const onClick = () => {
    router.push("/login");
  };

  useEffect(() => {
    const tokenFromUrl = router.query;
    if (tokenFromUrl.token && typeof tokenFromUrl.token == "string") {
      setToken(tokenFromUrl.token);
      dispatch(setAccessToken(tokenFromUrl.token));
    }
  }, [dispatch, router.query]);

  const onClickAdminTest = () => {
    axios
      .get(`${process.env["NEXT_PUBLIC_ADMIN_TEST"]}`, {
        headers: {
          "X-AUTH-TOKEN": `${token}`,
          "Access-Control-Allow-Origin":
            "https://admin-template-lyart.vercel.app",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onClickAdminTestAAA = () => {
    axios
      .get(
        `http://ppledevtest-env.eba-9fa279up.ap-northeast-2.elasticbeanstalk.com/api/v1/aaa/test`,
        {
          headers: {
            "Access-Control-Allow-Origin":
              "https://admin-template-lyart.vercel.app",
          },
        },
      )
      .then((res) => {
        console.log(res);
        console.log("hio");
      })
      .catch((err) => {
        console.error(err);
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
      <Button variant={"contained"} onClick={onClickAdminTest}>
        Admin Test /sss
      </Button>
      <Button variant={"contained"} onClick={onClickAdminTestAAA}>
        Admin Test /aaa
      </Button>
    </div>
  );
};

export default Home;
