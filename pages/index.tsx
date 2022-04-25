import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import React, { useState } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";

const Home: NextPage = () => {
  const router = useRouter();
  const [token, setToken] = useState<string>("");

  const onClick = () => {
    router.push("/login");
  };

  const onClickAdminTest = async () => {
    const tokenFromUrl = router.query;
    if (tokenFromUrl.token && typeof tokenFromUrl.token == "string") {
      await setToken(tokenFromUrl.token);
      console.log(tokenFromUrl.token);
      console.log("Success!");
    }

    axios
      .get(`${process.env["NEXT_PUBLIC_ADMIN_TEST"]}`, {
        headers: {
          "X-AUTH-TOKEN": `${tokenFromUrl.token}`,
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        console.log(res);
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
      <Button onClick={onClick}>로그인 Test</Button>
      <Button variant={"contained"} onClick={onClickAdminTest}>
        Admin Test
      </Button>
    </div>
  );
};

export default Home;
