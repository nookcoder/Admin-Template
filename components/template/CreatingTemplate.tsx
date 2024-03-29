import React, { ChangeEvent, FormEventHandler, useCallback } from "react";
import { InputLabel, TextField } from "@mui/material";
import { useAppDispatch, useAppSelect } from "../../hooks/ReduxHooks";
import {
  setNoticeContent,
  setNoticeTitle,
} from "../../redux/feature/notice/noticeSlice";
import { appAxiosPost } from "../../lib/api/AppAxios";
import { FILE_TYPE } from "../../util/constant";
import {
  setEventContent,
  setEventTitle,
} from "../../redux/feature/event/eventSlice";
import { PrintErrorMessage } from "../../util/Error";
import CheckingAuthTemplate from "./CheckingAuthTemplate";

type CreatingType = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  file: File | undefined;
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  imageSource: string | undefined;
  setImageSource: React.Dispatch<React.SetStateAction<string | undefined>>;
  type: string;
  apiUrl: string;
  reduxTitle: string;
  reduxContent: string;
};

const NoticeTemplate: React.FunctionComponent<CreatingType> = ({
  title,
  setTitle,
  content,
  setContent,
  file,
  setFile,
  imageSource,
  setImageSource,
  type,
  apiUrl,
  reduxTitle,
  reduxContent,
}) => {
  const dispatch = useAppDispatch();

  const accessToken = useAppSelect((state) => state.auth.accessToken);
  const typeText = type == "NOTICE" ? "공지" : "이벤트";
  const onChangeTitle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(event.currentTarget.value);
      if (type == "NOTICE") {
        dispatch(setNoticeTitle(event.currentTarget.value));
        return;
      }
      dispatch(setEventTitle(event.currentTarget.value));
    },
    [dispatch, setTitle, type],
  );
  const onChangeContent = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setContent(event.currentTarget.value);
      if (type == "NOTICE") {
        dispatch(setNoticeContent(event.currentTarget.value));
      }
      dispatch(setEventContent(event.currentTarget.value));
    },
    [dispatch, setContent, type],
  );
  const handleFillChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setFile(file);
      setImageSource(URL.createObjectURL(file));
      dispatch(setEventContent(URL.createObjectURL(file)));
    }
  };
  const onSubmitNotice: FormEventHandler<HTMLElement> = (event) => {
    event.preventDefault();

    const bodyDto = {
      title: reduxTitle,
      content: reduxContent,
    };

    appAxiosPost(apiUrl, bodyDto, accessToken)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmitEvent: FormEventHandler<HTMLElement> = (event) => {
    event.preventDefault();

    if (file) {
      const bodyDto = new FormData();
      bodyDto.set("content", reduxContent);
      bodyDto.set("title", reduxTitle);
      bodyDto.set("uploadImageFile", file, file.name);
      appAxiosPost(apiUrl, bodyDto, accessToken)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          PrintErrorMessage(err);
        });
    }
  };

  return (
    <CheckingAuthTemplate>
      <h1>{typeText} 등록/수정</h1>

      <form
        method={"POST"}
        onSubmit={type == "NOTICE" ? onSubmitNotice : onSubmitEvent}
      >
        <div>
          <InputLabel htmlFor={"notice_title"}>{typeText} 제목</InputLabel>
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
          <InputLabel htmlFor={"notice_content"}>{typeText} 내용</InputLabel>
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

        <input
          aria-label={"이미지 업로드"}
          type={"file"}
          onChange={handleFillChange}
          accept={FILE_TYPE}
        />
        {imageSource ? (
          <div style={{ textAlign: "center" }}>
            <h4>실제 모바일에는 사이즈 맞춰서 들어갈거에요</h4>
            {/*<Image*/}
            {/*  src={imageSource}*/}
            {/*  alt={"미리보기 이미지"}*/}
            {/*  width={300}*/}
            {/*  height={300}*/}
            {/*/>*/}
          </div>
        ) : (
          <></>
        )}

        <div>
          <button type="submit">제출하기</button>
        </div>
      </form>
    </CheckingAuthTemplate>
  );
};

export default NoticeTemplate;
