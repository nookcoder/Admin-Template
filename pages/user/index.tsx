import React, { useEffect, useState } from "react";
import GlobalNavigationBar from "../../components/common/GlobalNavigationBar";
import Head from "next/head";
import { NextPage } from "next";
import IUser from "../../model/interface/IUser";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRowsProp,
  MuiEvent,
} from "@mui/x-data-grid";
import { ClickType, GridColumn } from "../../util/constant";
import { routePageByUuid } from "../../hooks/RouterHook";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";
import { fetchWithBaseURL } from "../../api/basicFetch";
import { setGridPropsRow } from "../../hooks/GridHook";

// @ts-ignore
const User: NextPage<IUser[]> = ({ data }) => {
  const router = useRouter();
  const [userData, setUserData] = useState<Array<IUser[]>>();

  const dataColumn: GridColDef[] = GridColumn.User;
  const dataRow: GridRowsProp = userData ? userData : [];

  const onCellClick = (
    params: GridCellParams<any>,
    event: MuiEvent<React.MouseEvent>,
  ) => {
    if (event.detail == ClickType.DOUBLE) {
      routePageByUuid("user", params.row.uuid, router);
    }
  };

  useEffect(() => {
    setGridPropsRow(data, setUserData);
  }, [data]);

  // 기본 회원 정보, 감사 메세지 수 , 좋/댓/공, 수혈완료, 포인트
  return (
    <>
      <Head>
        <title>Pple Admin | User</title>
        <meta name="description" content="피플 Admin 유저정보" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalNavigationBar />
      {userData ? (
        <DataGrid
          columns={dataColumn}
          rows={dataRow}
          autoHeight={true}
          onCellClick={onCellClick}
        />
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export async function getServerSideProps() {
  const res = await fetchWithBaseURL("/api/v1/account/all");
  const data = await res.json();
  return {
    props: { data },
  };
}

export default User;
