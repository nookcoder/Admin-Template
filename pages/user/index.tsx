import React, { useEffect, useState } from "react";
import Head from "next/head";
import { NextPage } from "next";
import IUser from "../../model/interface/user/IUser";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRowsProp,
  MuiEvent,
} from "@mui/x-data-grid";
import { ClICK_TYPE, GRID_COLUMN } from "../../util/constant";
import { routePageByUuid } from "../../hooks/RouterHook";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";
import { useAppSelect } from "../../hooks/ReduxHooks";
import { initGridProps } from "../../lib/api/AppFetchGet";
import { PrintErrorMessage } from "../../util/Error";
import CheckingAuthTemplate from "../../components/template/CheckingAuthTemplate";

// @ts-ignore
const User: NextPage = () => {
  const router = useRouter();

  const accessToken = useAppSelect((state) => state.auth.accessToken);
  const [isInitial, setIsInitial] = useState<boolean>(true);
  const [userData, setUserData] = useState<IUser[]>();
  const dataColumn: GridColDef[] = GRID_COLUMN.User;
  const dataRow: GridRowsProp = userData ? userData : [];

  const onCellClick = (
    params: GridCellParams<any>,
    event: MuiEvent<React.MouseEvent>,
  ) => {
    if (event.detail == ClICK_TYPE.DOUBLE) {
      routePageByUuid("user", params.row.uuid, router);
    }
  };

  useEffect(() => {
    if (isInitial) {
      initGridProps(
        "/api/v1/admin/account/all",
        accessToken,
        setUserData,
      ).catch((err) => {
        PrintErrorMessage(err.status);
      });
      setIsInitial(false);
    }
  }, [isInitial, accessToken]);

  // 기본 회원 정보, 감사 메세지 수 , 좋/댓/공, 수혈완료, 포인트
  return (
    <CheckingAuthTemplate>
      <Head>
        <title>Pple Admin | User</title>
        <meta name="description" content="피플 Admin 유저정보" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {userData ? (
        <DataGrid
          columns={dataColumn}
          rows={dataRow}
          autoHeight={true}
          onCellClick={onCellClick}
          pageSize={10}
        />
      ) : (
        <CircularProgress />
      )}
    </CheckingAuthTemplate>
  );
};

export default User;
