export enum ClICK_TYPE {
  SINGLE = 1,
  DOUBLE = 2,
}

export const GRID_COLUMN = {
  User: [
    { field: "displayName", headerName: "닉네임", width: 200 },
    { field: "email", headerName: "이메일", width: 200 },
    { field: "phoneNumber", headerName: "전화번호", width: 120 },
    { field: "birthDay", headerName: "생년월일" },
    // { field: "bloodType", headerName: "혈액형" },
    { field: "gender", headerName: "성별" },
    { field: "marketingUserAgreement", headerName: "마케팅활용동의" },
    { field: "status", headerName: "상태" },
    { field: "createdAt", headerName: "가입날짜" },
    { field: "uuid", headerName: "사용자 식별자", width: 300 },
  ],

  Story: [
    { field: "title", headerName: "제목" },
    { field: "viewsCount", headerName: "조회수" },
    { field: "replyCount", headerName: "댓글 수" },
    { field: "likesCount", headerName: "좋아요 수" },
    { field: "renewCount", headerName: "연장한 횟수" },
    { field: "createdAt", headerName: "등록 일자", width: 110 },
    { field: "uuid", headerName: "사연 식별자", width: 300 },
  ],

  NOTICE: [
    { field: "title", headerName: "공지 제목" },
    { field: "content", headerName: "공지 내용", width: 500 },
  ],

  EVENT: [
    { field: "title", headerName: "이벤트 제목" },
    { field: "content", headerName: "이벤트 내용", width: 500 },
  ],
};

export const API = {
  GET: {
    ALL: {
      EVENT: "/api/v1/pple/event",
      NOTICE: "/api/v1/notice/all",
      ACCOUNT: "/api/v1/account/all",
      DONATION: "/api/v1/donation/all",
    },
  },

  POST: {
    EVENT: "/api/v1/admin/pple/event",
    NOTICE: "/api/v1/admin/notice",
    HEKARI: "/api/admin/hikari/info",
  },

  PATCH: {
    EVENT: "/api/v1/admin/pple/event",
    NOTICE: "/api/v1/admin/notice/update",
  },
};

export const FILE_TYPE = "image/jpg, image/png";
