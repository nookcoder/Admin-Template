import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import GlobalNavigationBar from "../../components/common/GlobalNavigationBar";
import Head from "next/head";
import { GridColumn } from "../../util/constant";
import { fetchWithBaseURL } from "../../api/basicFetch";
import { IDonation, IDonationContent } from "../../model/interface/IDonation";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { setGridPropsRow } from "../../hooks/GridPropsRowHook";
import { CircularProgress } from "@mui/material";

const Story: NextPage<IDonation> = ({ data }) => {
  const [content, setContent] = useState<Array<IDonationContent>>();
  const dataColum: GridColDef[] = GridColumn.Story;
  const dataRow: GridRowsProp = content ? content : [];

  useEffect(() => {
    setGridPropsRow(data.content, setContent);
  }, [data]);

  return (
    <div>
      <Head>
        <title>Pple Admin | Story</title>
        <meta name="description" content="피플 Admin 사연 정보" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalNavigationBar />
      {content ? (
        <DataGrid columns={dataColum} rows={dataRow} autoHeight={true} />
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
