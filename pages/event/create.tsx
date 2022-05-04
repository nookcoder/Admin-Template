import React, { useState } from "react";
import { NextPage } from "next";
import { useAppSelect } from "../../hooks/ReduxHooks";
import CreatingTemplate from "../../components/template/CreatingTemplate";
import { API } from "../../util/constant";

const EventCreate: NextPage = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [file, setFile] = useState<File>();
  const [imageSource, setImageSource] = useState<string>();
  const eventTitle = useAppSelect((state) => state.event.title);
  const eventContent = useAppSelect((state) => state.event.title);

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
        type={"EVENT"}
        apiUrl={API.POST.EVENT}
        reduxTitle={eventTitle}
        reduxContent={eventContent}
      />
    </div>
  );
};

export default EventCreate;
