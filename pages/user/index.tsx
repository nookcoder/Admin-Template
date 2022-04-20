import React, { useEffect, useState } from "react";
import GlobalNavigationBar from "../../components/common/GlobalNavigationBar";
import Head from "next/head";
import { NextPage } from "next";
import IUser from "../../model/interface/IUser";
import IUserDataGrid from "../../model/interface/IUserDataGrid";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRowsProp,
  MuiEvent,
} from "@mui/x-data-grid";
import { ClickType } from "../../util/constant";
import { routePageByUuid } from "../../hooks/routerHook";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";
import { fetchData } from "../../api/basicFetch";
import { PrintErrorMessage } from "../../util/Error";

// @ts-ignore
const User: NextPage = () => {
  const router = useRouter();
  const [initData, setInitData] = useState<IUser[]>();
  const [userInformation, setUserInformation] =
    useState<Array<IUserDataGrid>>();

  const createUserInformation = (initData: IUser[]) => {
    const userInformation: Array<IUserDataGrid> = [];
    initData.map((data, index) => {
      const user: IUserDataGrid = {
        id: index,
        uuid: data.uuid,
        createdAt: data.createdAt,
        birthDay: data.birthDay,
        displayName: data.displayName,
        status: data.status,
        phoneNumber: data.phoneNumber,
        marketingUserAgreement: data.marketingUserAgreement,
        gender: data.gender,
        email: data.email,
      };
      userInformation.push(user);
    });
    setUserInformation([...userInformation]);
  };

  const dataColumn: GridColDef[] = [
    { field: "displayName", headerName: "닉네임", width: 200 },
    { field: "email", headerName: "이메일", width: 200 },
    { field: "phoneNumber", headerName: "전화번호", width: 120 },
    { field: "birthDay", headerName: "생년월일" },
    // { field: "bloodType", headerName: "혈액형" },
    { field: "gender", headerName: "성별" },
    { field: "marketingUserAgreement", headerName: "마케팅활용동의" },
    { field: "status", headerName: "상태" },
    { field: "createdAt", headerName: "가입날짜" },
    { field: "uuid", headerName: "사용자 식별자", width: 300 },
  ];

  const dataRow: GridRowsProp = userInformation ? [...userInformation] : [];

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
      fetchData("/api/v1/account/all", setInitData).catch((err) => {
        PrintErrorMessage(err);
      });
    }
    if (initData) {
      createUserInformation(initData);
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
      {userInformation ? (
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
