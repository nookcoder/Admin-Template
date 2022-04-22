import React, { useCallback, useState } from "react";
import { InputLabel, TextField } from "@mui/material";
import { useAppDispatch, useAppSelect } from "../../hooks/ReduxHooks";
import {
  setNoticeContent,
  setNoticeTitle,
} from "../../redux/feature/notice/noticeSlice";

const Create = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const noticeTitle = useAppSelect((state) => state.notice.title);
  const noticeContent = useAppSelect((state) => state.notice.content);

  const onChangeTitle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(event.currentTarget.value);
      dispatch(setNoticeTitle(event.currentTarget.value));
    },
    [dispatch],
  );

  const onChangeContent = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setContent(event.currentTarget.value);
      dispatch(setNoticeContent(event.currentTarget.value));
    },
    [dispatch],
  );

  return (
    <div>
      <h1>공지 등록</h1>
      <InputLabel htmlFor={"notice_title"}>공지 제목</InputLabel>
      <TextField
        aria-label={"공지 제목"}
        placeholder={"여기에는 이제 공지 제목을.."}
        value={title}
        style={{ width: "28rem", marginBottom: "20px" }}
        onChange={onChangeTitle}
      />

      <InputLabel htmlFor={"notice_content"}>공지 내용</InputLabel>
      <TextField
        value={content}
        id={"notice_content"}
        aria-label={"공지 내용"}
        placeholder={"공지 내용 작성해주세요~!"}
        minRows={10}
        style={{ width: "28rem" }}
        onChange={onChangeContent}
        multiline={true}
      />

      <button onClick={() => console.log(`${noticeTitle} / ${noticeContent}`)}>
        리덕스 조회
      </button>
    </div>
  );
};

export default Create;
