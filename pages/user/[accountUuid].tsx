import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import GlobalNavigationBar from "../../components/common/GlobalNavigationBar";
import { useRouter } from "next/router";
import { getRouterQuery } from "../../hooks/routerHook";
import IUser from "../../model/interface/IUser";
import { fetchDataOnBrowser } from "../../api/basicFetch";
import { PrintErrorMessage } from "../../util/Error";

const AccountUuid: NextPage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<IUser>();
  const accountUuid = getRouterQuery(router, "accountUuid");
  useEffect(() => {
    if (accountUuid && !userData) {
      fetchDataOnBrowser(`/api/v1/account/${accountUuid}`, setUserData).catch(
        (error) => {
          PrintErrorMessage(error);
        },
      );
    }
  }, [accountUuid, userData]);

  return (
    <div>
      <GlobalNavigationBar />
      <h1>유저 상세 정보 및 정보 수정 / 삭제</h1>
      <button onClick={() => console.log(userData)}>dd</button>
    </div>
  );
};

export default AccountUuid;
