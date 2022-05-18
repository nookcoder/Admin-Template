import React from "react";
import IUser from "../../model/interface/user/IUser";
import styles from "../styles/User.module.scss";
import TermsRadio from "../common/TermsRadio";

type UserData = {
  userData: IUser;
};

const TermsBox: React.FunctionComponent<UserData> = ({ userData }) => {
  return (
    <>
      <div aria-label={"약관 동의 Box"} className={styles.terms_box}>
        <div className={styles.terms_box_component}>
          <TermsRadio
            label={"개인정보 처리방침"}
            agreement={userData.privacyPolicy}
          />
        </div>
        <div className={styles.terms_box_component}>
          <TermsRadio
            label={"서비스 이용약관"}
            agreement={userData.termOfService}
          />
        </div>
        <div className={styles.terms_box_component}>
          <TermsRadio
            label={"마케팅활용 동의"}
            agreement={userData.marketingUserAgreement}
          />
        </div>
      </div>
    </>
  );
};

export default TermsBox;
