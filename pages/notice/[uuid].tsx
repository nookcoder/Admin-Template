import React from "react";
import { useRouter } from "next/router";

const NoticeDetail = () => {
  const router = useRouter();
  const uuid = router.query.uuid;
  return <div></div>;
};

export default NoticeDetail;
