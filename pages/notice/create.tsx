import React, { useState } from "react";
import { NextPage } from "next";
import CreatingTemplate from "../../components/template/CreatingTemplate";
import { useAppSelect } from "../../hooks/ReduxHooks";
import { API } from "../../util/constant";

const Create: NextPage = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [file, setFile] = useState<File>();
  const [imageSource, setImageSource] = useState<string>();
  const noticeTitle = useAppSelect((state) => state.notice.title);
  const noticeContent = useAppSelect((state) => state.notice.content);
  return (
    <div style={{ textAlign: "center" }}>
      <CreatingTemplate
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        file={file}
        setFile={setFile}
        imageSource={imageSource}
        setImageSource={setImageSource}
        type={"NOTICE"}
        apiUrl={API.POST.NOTICE}
        reduxTitle={noticeTitle}
        reduxContent={noticeContent}
      />
    </div>
  );
};

export default Create;
