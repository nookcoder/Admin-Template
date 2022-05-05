import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useAppSelect } from "../../hooks/ReduxHooks";
import Head from "next/head";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRowsProp,
  MuiEvent,
} from "@mui/x-data-grid";
import { ClICK_TYPE, GRID_COLUMN } from "../../util/constant";
import { appAxiosGet } from "../../api/AppAxios";
import { IEvent } from "../../model/interface/event/IEvent";
import { setGridPropsRow } from "../../hooks/GridHook";
import { PrintErrorMessage } from "../../util/Error";
import { Button, CircularProgress } from "@mui/material";
import { routePageByUuid } from "../../hooks/RouterHook";

const Event: NextPage = () => {
  const router = useRouter();

  const accessToken = useAppSelect((state) => state.auth.accessToken);
  const [events, setEvents] = useState<IEvent[]>();
  const [isInitial, setInitial] = useState<boolean>(true);
  const dataRow: GridRowsProp = events ? events : [];
  const dataColumn: GridColDef[] = GRID_COLUMN.EVENT;

  const routerCreatingEventPage = () => {
    router.push("/event/create");
  };
  const onCellClick = (
    params: GridCellParams<any>,
    event: MuiEvent<React.MouseEvent>,
  ) => {
    if (event.detail == ClICK_TYPE.DOUBLE) {
      routePageByUuid("event", params.row.uuid, router);
    }
  };

  useEffect(() => {
    if (isInitial && accessToken) {
      setInitial(false);
      appAxiosGet("api/v1/pple/event", accessToken)
        .then(async (res) => {
          const eventList: IEvent[] = await res.data;
          await setGridPropsRow(eventList, setEvents);
        })
        .catch((err) => {
          PrintErrorMessage(err);
          router.push("/");
        });
    }
  }, [isInitial, accessToken, router]);

  return (
    <div>
      <Head>
        <title>Pple Admin | Event</title>
        <meta name="description" content="피플 Admin 공지사항" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2>이벤트 설정 페이지</h2>

      {events ? (
        <DataGrid
          columns={dataColumn}
          rows={dataRow}
          autoHeight={true}
          onCellClick={onCellClick}
        />
      ) : (
        <CircularProgress />
      )}

      <Button variant={"contained"} onClick={routerCreatingEventPage}>
        이벤트 등록하기
      </Button>
    </div>
  );
};

export default Event;
