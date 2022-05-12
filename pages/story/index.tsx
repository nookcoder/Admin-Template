import React, { useCallback, useEffect, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { ClICK_TYPE, GRID_COLUMN } from "../../util/constant";
import { fetchWithBaseURL } from "../../lib/api/AppFetch";
import { IDonationContent } from "../../model/interface/story/IDonation";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRowsProp,
  MuiEvent,
} from "@mui/x-data-grid";
import { CircularProgress } from "@mui/material";
import { routePageByUuid } from "../../hooks/RouterHook";
import { useRouter } from "next/router";
import { useAppSelect } from "../../hooks/ReduxHooks";
import { setGridPropsRow } from "../../hooks/GridHook";
import { PrintErrorMessage } from "../../util/Error";

const Story: NextPage = () => {
  const router = useRouter();

  const accessToken = useAppSelect((state) => state.auth.accessToken);
  const [content, setContent] = useState<Array<IDonationContent>>();
  const [isInitial, setInitial] = useState<boolean>(true);
  const dataColum: GridColDef[] = GRID_COLUMN.Story;
  const dataRow: GridRowsProp = content ? content : [];
  const onCellClick = (
    params: GridCellParams<any>,
    event: MuiEvent<React.MouseEvent>,
  ) => {
    if (event.detail == ClICK_TYPE.DOUBLE) {
      routePageByUuid("story", params.row.uuid, router);
    }
  };

  const initStories = useCallback(async () => {
    const res = await fetchWithBaseURL("/api/v1/donation", {
      header: {
        "X-AUTH-TOKEN": `${accessToken}, `,
      },
    });

    const data = await res.json();
    setGridPropsRow([...data["content"]], setContent);
  }, [accessToken]);

  useEffect(() => {
    if (isInitial) {
      initStories().catch((err) => {
        PrintErrorMessage(err.status);
      });
      setInitial(false);
    }
  }, [initStories, isInitial]);

  return (
    <div>
      <Head>
        <title>Pple Admin | Story</title>
        <meta name="description" content="피플 Admin 사연 정보" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {content ? (
        <DataGrid
          onCellClick={onCellClick}
          columns={dataColum}
          rows={dataRow}
          autoHeight={true}
        />
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default Story;
