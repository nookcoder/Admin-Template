import React, {
  FormEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelect } from "../../hooks/ReduxHooks";
import INotice from "../../model/interface/notice/notice";
import { appAxiosPatch } from "../../lib/api/AppAxios";
import { PrintErrorMessage } from "../../util/Error";
import { Button, CircularProgress } from "@mui/material";
import DetailTextField from "../../components/common/DetailTextField";
import { initDetailInformation } from "../../lib/api/AppFetch";
import {
  setNoticeContent,
  setNoticeTitle,
} from "../../redux/feature/notice/noticeSlice";
import DetailTextArea from "../../components/common/DetailTextArea";

type PatchBodyDto = {
  content: string;
  noticeUuid: string | string[];
  title: string;
};

const NoticeDetail = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const uuid = router.query.uuid;

  const [isInitial, setIsInitial] = useState<boolean>(true);
  const [noticeDetail, setNoticeDetail] = useState<INotice>();

  const title = useAppSelect((state) => state.notice.title);
  const content = useAppSelect((state) => state.notice.content);
  const accessToken = useAppSelect((state) => state.auth.accessToken);

  const onSubmit: FormEventHandler<HTMLFormElement> = (event): void => {
    event.preventDefault();
    if (typeof uuid === "string") {
      const body: PatchBodyDto = {
        title: title,
        content: content,
        noticeUuid: uuid,
      };

      appAxiosPatch("/api/v1/admin/notice", body, accessToken)
        .then(() => {
          router.push("/notice");
        })
        .catch((err) => {
          PrintErrorMessage(err.status);
        });
    }
    return;
  };

  const initNoticeDetail = useCallback((): void => {
    if (typeof uuid == "string") {
      initDetailInformation(
        `/api/v1/notice/one/${uuid}`,
        accessToken,
        setNoticeDetail,
      ).catch((err) => {
        PrintErrorMessage(err.status);
      });
    }
    return;
  }, [accessToken, uuid]);

  useEffect(() => {
    if (isInitial) {
      setIsInitial(false);
      initNoticeDetail();
    }
    if (noticeDetail) {
      dispatch(setNoticeTitle(noticeDetail.title));
      dispatch(setNoticeContent(noticeDetail.content));
    }
  }, [isInitial, noticeDetail, initNoticeDetail, dispatch]);

  return (
    <div>
      {noticeDetail ? (
        <form method={"PATCH"} onSubmit={onSubmit}>
          <div>
            <DetailTextField
              defaultValue={noticeDetail.title}
              state={title}
              label={"공지 제목"}
              slice={setNoticeTitle}
            />

            <DetailTextArea
              defaultValue={noticeDetail.content}
              label={"공지 내용"}
              state={content}
              slice={setNoticeContent}
            />
          </div>
          <div>
            <Button type={"submit"} variant={"contained"}>
              수정하기
            </Button>
          </div>
        </form>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default NoticeDetail;
