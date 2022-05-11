export const PrintErrorMessage = (errorCode: number) => {
  switch (errorCode) {
    case 400:
      alert("Error Code : 400 잘못된 요청입니다");
      break;
    case 401:
      alert("Error Code : 401 권한이 없습니다");
      break;
    case 403:
      alert("Error Code : 403 권한이 없습니다");
      break;
    case 404:
      alert("Error Code : 404 해당 페이지를 찾을 수 없습니다");
      break;
    case 500:
      alert("Error Code : 500 서버에러입니다. 관리자에게 문의해주세요");
      break;
    default:
      break;
  }
};
