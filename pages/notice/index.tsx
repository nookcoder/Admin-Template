import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button, CircularProgress } from "@mui/material";
import { appAxiosGet } from "../../api/AppAxios";
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
import { setGridPropsRow } from "../../hooks/GridHook";
import { routePageByUuid } from "../../hooks/RouterHook";

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
      setIsInitial(false);
      appAxiosGet("/api/v1/notice/all", accessToken)
        .then(async (res) => {
          const noticeList: Notice[] = await res.data;
          await setGridPropsRow(noticeList, setNotices);
          console.log("OK!");
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    }
  }, [accessToken, isInitial]);

  return (
    <div>
      <Head>
        <title>Pple Admin | Notice</title>
        <meta name="description" content="피플 Admin 공지사항" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2>공지사항 페이지</h2>
      {notices ? (
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
