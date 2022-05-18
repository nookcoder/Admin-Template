import React from "react";
import DetailTextField from "../common/DetailTextField";
import { setDisplayName } from "../../redux/feature/detail/userSlice";
import { useAppSelect } from "../../hooks/ReduxHooks";
import IUser from "../../model/interface/user/IUser";

type UserData = {
  userData: IUser;
};

const UserDetailLeftBox: React.FunctionComponent<UserData> = ({ userData }) => {
  const displayName = useAppSelect((state) => state.detailUser.displayName);
  return (
    <>
      <DetailTextField
        defaultValue={userData.displayName}
        label={"닉네임"}
        state={displayName}
        slice={setDisplayName}
      />

      <DetailTextField
        defaultValue={userData.birthDay}
        label={"생년월일"}
        isDisabled={true}
      />

      <DetailTextField
        defaultValue={userData.email}
        label={"이메일"}
        isDisabled={true}
      />

      <DetailTextField
        defaultValue={userData.gender}
        label={"성별"}
        isDisabled={true}
      />
    </>
  );
};

export default UserDetailLeftBox;
