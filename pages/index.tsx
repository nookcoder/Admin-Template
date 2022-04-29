import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
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
      console.log("OK");
    }
  }, [dispatch, router.query]);

  const onClickAdminTest = async () => {
    // axios
    //   .get(`${process.env["NEXT_PUBLIC_ADMIN_TEST"]}`, {
    //     headers: {
    //       "X-AUTH-TOKEN": `eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyM2UwYWE3NC02ZmYwLTQ1NTYtOWJhMS0wZmQ2N2M5MmNkYTMiLCJyb2xlcyI6IkFETUlOIiwiaWF0IjoxNjUwOTgxNzk3LCJleHAiOjE2NTYxNjU3OTd9.f7ku5ixbxe5KSDEKGmzbm0dE39-NAPDOS02mBL1yJZ8`,
    //       "Access-Control-Allow-Origin":
    //         "https://admin-template-lyart.vercel.app",
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });

    const res = await fetch(
      "http://ppledevtest-env.eba-9fa279up.ap-northeast-2.elasticbeanstalk.com/api/v1/aaa/test",
      {
        mode: "no-cors",
        method: "GET",
        headers: {
          "X-AUTH-TOKEN":
            "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyM2UwYWE3NC02ZmYwLTQ1NTYtOWJhMS0wZmQ2N2M5MmNkYTMiLCJyb2xlcyI6IkFETUlOIiwiaWF0IjoxNjUwOTgxNzk3LCJleHAiOjE2NTYxNjU3OTd9.f7ku5ixbxe5KSDEKGmzbm0dE39-NAPDOS02mBL1yJZ8",
        },
      },
    );
    const data = await res.json();
    data
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  const onClickAdminTestAAA = async () => {
    const res = await fetch(
      "http://ppledevtest-env.eba-9fa279up.ap-northeast-2.elasticbeanstalk.com/api/v1/aaa/test",
      {
        mode: "no-cors",
        method: "GET",
      },
    );
    const data = await res.json();
    data
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => {
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
