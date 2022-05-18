import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { getRouterQuery } from "../../hooks/RouterHook";
import IUser from "../../model/interface/user/IUser";
import { fetchData } from "../../lib/api/AppFetch";
import { PrintErrorMessage } from "../../util/Error";
import styles from "../../styles/AccountDetail.module.scss";
import { useAppSelect } from "../../hooks/ReduxHooks";
import { CircularProgress, Divider } from "@mui/material";
import Head from "next/head";
import UserDetailLeftBox from "../../components/user/UserDetailLeftBox";
import UserDetailRightBox from "../../components/user/UserDetailRightBox";
import TermsBox from "../../components/user/TermsBox";

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
        <>
          <h2 className={styles.title}>유저 상세 정보 조회 및 수정 / 삭제</h2>

          <main className={styles.box}>
            <section aria-label={"왼쪽 컬럼"} className={styles.box_column}>
              <UserDetailLeftBox userData={userData} />
            </section>

            <section aria-label={"오른쪽 컬럼"} className={styles.box_column}>
              <UserDetailRightBox userData={userData} />
              <TermsBox userData={userData} />
            </section>
          </main>

          <Divider />

          <main></main>

          <button
            onClick={() => {
              console.log(displayName + " ? " + birthDay);
            }}
          >
            출력
          </button>
        </>
      ) : (
        <CircularProgress></CircularProgress>
      )}
    </div>
  );
};

export default AccountUuid;
