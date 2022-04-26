import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { ClICK_TYPE, GRID_COLUMN } from "../../util/constant";
import { fetchWithBaseURL } from "../../api/basicFetch";
import {
  IDonation,
  IDonationContent,
} from "../../model/interface/story/IDonation";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRowsProp,
  MuiEvent,
} from "@mui/x-data-grid";
import { setGridPropsRow } from "../../hooks/GridHook";
import { Button, CircularProgress } from "@mui/material";
import { routePageByUuid } from "../../hooks/RouterHook";
import { useRouter } from "next/router";

const Story: NextPage<IDonation> = ({ data }) => {
  const router = useRouter();
  const [content, setContent] = useState<Array<IDonationContent>>();
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
  useEffect(() => {
    setGridPropsRow(data.content, setContent);
  }, [data]);

  const onClickRequestDonationFromBrowser = async () => {
    const res = await fetch("https://pple-test.herokuapp.com/api/v1/donation", {
      headers: {
        "Access-Control-Allow-Origin": "https://pple-test.herokuapp.com",
      },
    });
    const data = res.json();
    console.log(res);
    console.log(data);
  };

  return (
    <div>
      <Head>
        <title>Pple Admin | Story</title>
        <meta name="description" content="피플 Admin 사연 정보" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Button onClick={onClickRequestDonationFromBrowser}>Test Requet</Button>
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

export async function getServerSideProps() {
  const res = await fetchWithBaseURL("/api/v1/donation");
  const data = await res.json();
  return {
    props: { data },
  };
}

export default Story;
