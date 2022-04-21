export enum ClickType {
  SINGLE = 1,
  DOUBLE = 2,
}

export const GridColumn = {
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
};
