import React from "react";
import { NextPage } from "next";
import { Button } from "@mui/material";

const Login: NextPage = () => {
  const url = `${process.env["NEXT_PUBLIC_KAKAO_LOGIN_URL"]}`;
  const onClick = () => {
    location.href = url;
  };
  return (
    <div>
      <Button onClick={onClick} variant={"outlined"}>
        카카오톡 로그인
      </Button>
    </div>
  );
};

export default Login;
