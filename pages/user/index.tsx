import React, { useCallback, useEffect, useState } from "react";
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

// @ts-ignore
const User: NextPage = ({ data }) => {
  const router = useRouter();
  const [initData, setInitData] = useState<IUser[]>(data);
  const [userInformation, setUserInformation] = useState<Array<IUserDataGrid>>(
    [],
  );
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

  const dataRow: GridRowsProp = [...userInformation];

  const initUserInformation = useCallback(() => {
    let newUserInformationArray: Array<IUserDataGrid> = [];
    initData.map((user, key) => {
      let userInfo: IUserDataGrid = {
        id: key,
        birthDay: user.birthDay,
        displayName: user.displayName,
        // bloodType: {
        //   abo: user.bloodType.abo,
        //   rh: user.bloodType.rh,
        // },
        createdAt: user.createdAt.slice(0, 10),
        email: user.email,
        gender: user.gender,
        marketingUserAgreement: user.marketingUserAgreement,
        phoneNumber: user.phoneNumber,
        status: user.status,
        uuid: user.uuid,
      };
      newUserInformationArray.push(userInfo);
    });
    setUserInformation([...newUserInformationArray]);
  }, [initData]);

  const onCellClick = (
    params: GridCellParams<any>,
    event: MuiEvent<React.MouseEvent>,
  ) => {
    if (event.detail == ClickType.DOUBLE) {
      routePageByUuid("user", params.row.uuid, router);
    }
  };

  useEffect(() => {
    initUserInformation();
  }, []);

  // 기본 회원 정보, 감사 메세지 수 , 좋/댓/공, 수혈완료, 포인트
  return (
    <>
      <Head>
        <title>Pple Admin | User</title>
        <meta name="description" content="피플 Admin 유저정보" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalNavigationBar />
      <DataGrid
        columns={dataColumn}
        rows={dataRow}
        autoHeight={true}
        onCellClick={onCellClick}
      />
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
