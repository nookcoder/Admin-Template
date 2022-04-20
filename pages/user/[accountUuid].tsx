import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import GlobalNavigationBar from "../../components/common/GlobalNavigationBar";
import { useRouter } from "next/router";
import { getRouterQuery } from "../../hooks/routerHook";
import IUser from "../../model/interface/IUser";
import { fetchData } from "../../api/basicFetch";
import { PrintErrorMessage } from "../../util/Error";
import styles from "../../styles/AccountDetail.module.scss";
import DetailTextField from "../../components/common/DetailTextField";
import { useAppSelect } from "../../hooks/reduxHooks";
import { CircularProgress } from "@mui/material";
import Head from "next/head";

const AccountUuid: NextPage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<IUser>();
  const accountUuid = getRouterQuery(router, "accountUuid");
  const displayName = useAppSelect((state) => state.detailUser.displayName);
  const birthDay = useAppSelect((state) => state.detailUser.birthDay);

  useEffect(() => {
    if (accountUuid && !userData) {
      if (accountUuid.length < 36) {
        router.push("/user");
        return;
      }

      fetchData(`/api/v1/account/${accountUuid}`, setUserData).catch(
        (error) => {
          PrintErrorMessage(error);
        },
      );
    }
  }, [accountUuid, userData, router]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Pple | 유저 상세정보</title>
      </Head>
      <GlobalNavigationBar />
      {userData ? (
        <div className={styles.box}>
          <h2>유저 상세 정보 조회 및 수정 / 삭제</h2>

          <DetailTextField
            defaultValue={userData.birthDay}
            label={"생년월일"}
            state={birthDay}
          />

          <DetailTextField
            defaultValue={userData.displayName}
            label={"닉네임"}
            state={displayName}
          />
        </div>
      ) : (
        <CircularProgress></CircularProgress>
      )}
      <button
        onClick={() => {
          console.log(displayName + " ? " + birthDay);
        }}
      >
        출력
      </button>
    </div>
  );
};

export default AccountUuid;
