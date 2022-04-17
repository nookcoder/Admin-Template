import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import React from "react";
import GlobalNavigationBar from "../components/common/GlobalNavigationBar";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pple Admin | Main</title>
        <meta name="description" content="피플 Admin 웹사이트" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <GlobalNavigationBar />
    </div>
  );
};

export default Home;
