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
import { routePageByUuid } from "../../hooks/routerHook";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";
import { fetchInitUserData } from "../../api/basicFetch";
import { PrintErrorMessage } from "../../util/Error";

// @ts-ignore
const User: NextPage = () => {
  const router = useRouter();
  const [initData, setInitData] = useState<IUser[]>();

  const dataColumn: GridColDef[] = GridColumn.User;

  const dataRow: GridRowsProp = initData ? [...initData] : [];

  const onCellClick = (
    params: GridCellParams<any>,
    event: MuiEvent<React.MouseEvent>,
  ) => {
    if (event.detail == ClickType.DOUBLE) {
      routePageByUuid("user", params.row.uuid, router);
    }
  };

  useEffect(() => {
    if (!initData) {
      fetchInitUserData("/api/v1/account/all", setInitData).catch((err) => {
        PrintErrorMessage(err);
      });
      return;
    }
  }, [initData]);

  // 기본 회원 정보, 감사 메세지 수 , 좋/댓/공, 수혈완료, 포인트
  return (
    <>
      <Head>
        <title>Pple Admin | User</title>
        <meta name="description" content="피플 Admin 유저정보" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalNavigationBar />
      {initData ? (
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

export default User;
