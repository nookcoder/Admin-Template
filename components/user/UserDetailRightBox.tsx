import React from "react";
import IUser from "../../model/interface/user/IUser";
import DetailTextField from "../common/DetailTextField";
import { setDisplayName } from "../../redux/feature/detail/userSlice";
import { formatBloodType, formatCreateAt } from "../../util/Format";

type UserData = {
  userData: IUser;
};

const UserDetailRightBox: React.FunctionComponent<UserData> = ({
  userData,
}) => {
  return (
    <>
      <DetailTextField
        defaultValue={userData.phoneNumber}
        label={"휴대폰 번호"}
        slice={setDisplayName}
      />

      <DetailTextField
        defaultValue={userData.createdAt}
        label={"가입날짜"}
        isDisabled={true}
        formatFunction={formatCreateAt}
      />

      <DetailTextField
        defaultValue={userData.bloodType.abo + "/" + userData.bloodType.rh}
        label={"혈액형"}
        isDisabled={true}
        formatFunction={formatBloodType}
      />
    </>
  );
};

export default UserDetailRightBox;
