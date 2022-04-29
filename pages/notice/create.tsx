import React, {
  ChangeEvent,
  FormEventHandler,
  useCallback,
  useState,
} from "react";
import { InputLabel, TextField } from "@mui/material";
import { useAppDispatch, useAppSelect } from "../../hooks/ReduxHooks";
import {
  setNoticeContent,
  setNoticeTitle,
} from "../../redux/feature/notice/noticeSlice";
import { NextPage } from "next";
import Image from "next/image";
import { FILE_TYPE } from "../../util/constant";
import { appAxiosPost } from "../../api/AppAxios";

const Create: NextPage = () => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [file, setFile] = useState<File>();
  const [imageSource, setImageSource] = useState<string>();

  const noticeTitle = useAppSelect((state) => state.notice.title);
  const noticeContent = useAppSelect((state) => state.notice.content);
  const accessToken = useAppSelect((state) => state.auth.accessToken);

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

  const handleFillChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setFile(file);
      setImageSource(URL.createObjectURL(file));
    }
  };

  const onSubmit: FormEventHandler<HTMLElement> = (event) => {
    event.preventDefault();

    const bodyDto = {
      title: noticeTitle,
      content: noticeContent,
    };

    appAxiosPost("/api/v1/admin/notice/post", bodyDto, accessToken)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>공지 등록</h1>
      <form method={"POST"} onSubmit={onSubmit}>
        <div>
          <InputLabel htmlFor={"notice_title"}>공지 제목</InputLabel>
          <TextField
            required
            aria-label={"공지 제목"}
            placeholder={"여기에는 이제 공지 제목을.."}
            value={title}
            style={{ width: "28rem", marginBottom: "20px" }}
            onChange={onChangeTitle}
          />
        </div>
        <div>
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
            required
          />
        </div>

        <input type={"file"} onChange={handleFillChange} accept={FILE_TYPE} />
        {imageSource ? (
          <div style={{ textAlign: "center" }}>
            <h4>실제 모바일에는 사이즈 맞춰서 들어갈거에요</h4>
            <Image
              src={imageSource}
              alt={"미리보기 이미지"}
              width={300}
              height={300}
            />
          </div>
        ) : (
          <></>
        )}

        <div>
          <button type="submit">제출하기</button>
        </div>
      </form>
    </div>
  );
};

export default Create;
