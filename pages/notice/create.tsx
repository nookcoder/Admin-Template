import React, { useState } from "react";
import { NextPage } from "next";
import NoticeTemplate from "../../components/template/NoticeTemplate";

const Create: NextPage = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [file, setFile] = useState<File>();
  const [imageSource, setImageSource] = useState<string>();

  return (
    <div style={{ textAlign: "center" }}>
      <NoticeTemplate
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        file={file}
        setFile={setFile}
        imageSource={imageSource}
        setImageSource={setImageSource}
      />
    </div>
  );
};

export default Create;
