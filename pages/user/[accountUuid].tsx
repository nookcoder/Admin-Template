import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { getRouterQuery } from "../../hooks/RouterHook";
import IUser from "../../model/interface/user/IUser";
import { fetchData } from "../../lib/api/AppFetch";
import { PrintErrorMessage } from "../../util/Error";
import styles from "../../styles/AccountDetail.module.scss";
import DetailTextField from "../../components/common/DetailTextField";
import { useAppSelect } from "../../hooks/ReduxHooks";
import { CircularProgress } from "@mui/material";
import Head from "next/head";
import {
  setBirthDay,
  setDisplayName,
} from "../../redux/feature/detail/userSlice";

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
      {userData ? (
        <div className={styles.box}>
          <h2>유저 상세 정보 조회 및 수정 / 삭제</h2>

          <DetailTextField
            defaultValue={userData.birthDay}
            label={"생년월일"}
            state={birthDay}
            slice={setBirthDay}
          />

          <DetailTextField
            defaultValue={userData.displayName}
            label={"닉네임"}
            state={displayName}
            slice={setDisplayName}
          />
          <button
            onClick={() => {
              console.log(displayName + " ? " + birthDay);
            }}
          >
            출력
          </button>
        </div>
      ) : (
        <CircularProgress></CircularProgress>
      )}
    </div>
  );
};

export default AccountUuid;
