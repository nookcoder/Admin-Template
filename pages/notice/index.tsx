import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button, CircularProgress } from "@mui/material";
import { useAppSelect } from "../../hooks/ReduxHooks";
import Notice from "../../model/interface/notice/notice";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRowsProp,
  MuiEvent,
} from "@mui/x-data-grid";
import { ClICK_TYPE, GRID_COLUMN } from "../../util/constant";
import { routePageByUuid } from "../../hooks/RouterHook";
import { initGridProps } from "../../lib/api/AppFetchGet";

const Notice: NextPage = () => {
  const router = useRouter();

  const accessToken = useAppSelect((state) => state.auth.accessToken);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isInitial, setIsInitial] = useState<boolean>(true);
  const dataColumn: GridColDef[] = GRID_COLUMN.NOTICE;
  const dataRow: GridRowsProp = notices ? notices : [];

  const routeCreatingNoticePage = () => {
    router.push("/notice/create");
  };

  const onCellClick = (
    params: GridCellParams<any>,
    event: MuiEvent<React.MouseEvent>,
  ) => {
    if (event.detail == ClICK_TYPE.DOUBLE) {
      routePageByUuid("notice", params.row.uuid, router);
    }
  };

  useEffect(() => {
    if (isInitial) {
      initGridProps("/api/v1/notice/all", accessToken, setNotices);
      setIsInitial(false);
    }
  }, [isInitial, setNotices, accessToken]);

  return (
    <div>
      <Head>
        <title>Pple Admin | Notice</title>
        <meta name="description" content="피플 Admin 공지사항" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2>공지사항 페이지</h2>
      {notices.length !== 0 ? (
        <DataGrid
          onCellClick={onCellClick}
          columns={dataColumn}
          rows={dataRow}
          autoHeight={true}
        />
      ) : (
        <CircularProgress />
      )}
      <Button variant={"contained"} onClick={routeCreatingNoticePage}>
        공지 글 등록하기
      </Button>
    </div>
  );
};

export default Notice;
