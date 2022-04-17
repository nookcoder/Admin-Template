import React from "react";
import GlobalNavigationBar from "../../components/common/GlobalNavigationBar";
import Head from "next/head";
import { NextPage } from "next";
import IUser from "../../model/interface/IUser";

// @ts-ignore
const User: NextPage = ({ data }) => {
  return (
    <>
      <Head>
        <title>Pple Admin | User</title>
        <meta name="description" content="피플 Admin 유저정보" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalNavigationBar />
      User 페이지
      {console.log(data)}
    </>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`${process.env.BASE_URL}api/v1/account/all`);
  const data: IUser[] = await res.json();
  return {
    props: { data },
  };
}
export default User;
