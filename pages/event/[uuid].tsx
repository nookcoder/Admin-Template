import React, {
  ChangeEvent,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { fetchWithBaseURL } from "../../api/AppFetch";
import { IEvent } from "../../model/interface/event/IEvent";
import DetailTextField from "../../components/common/DetailTextField";
import { useAppDispatch, useAppSelect } from "../../hooks/ReduxHooks";
import DetailTextArea from "../../components/common/DetailTextArea";
import Image from "next/image";
import { Button } from "@mui/material";
import { FILE_TYPE } from "../../util/constant";
import styles from "../../styles/EventUpdate.module.scss";
import { setEventImageUrl } from "../../redux/feature/event/eventSlice";

const EventDetail: NextPage<IEvent> = ({
  eventDetail,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const dispatch = useAppDispatch();
  const title = useAppSelect((state) => state.event.title);
  const content = useAppSelect((state) => state.event.content);
  const imageSourceUrl = useAppSelect((state) => state.event.imageSourceUrl);
  const [imageFile, setImageFile] = useState<File>();
  const uploadFileInput = useRef<HTMLInputElement>(null);

  const onClickFileUploadElement = () => {
    if (uploadFileInput) {
      uploadFileInput.current.click();
      return;
    }
    return;
  };
  const onChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setImageFile(file);
      dispatch(setEventImageUrl(URL.createObjectURL(file)));
    }
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const bodyDto = new FormData();
    bodyDto.set("title", title);
    bodyDto.set("content", content);
    imageFile
      ? bodyDto.set("uploadImageFile", imageFile, imageFile.name)
      : bodyDto.set("uploadImageFile", "");
  };

  useEffect(() => {
    dispatch(setEventImageUrl(eventDetail.eventImageUrl));
  }, [dispatch, eventDetail.eventImageUrl]);

  return (
    <div>
      <form action="">
        <main className={styles.container}>
          <div className={styles.box}>
            <DetailTextField
              defaultValue={eventDetail.title}
              label={"이벤트 제목"}
              state={title}
            />
            <DetailTextArea
              defaultValue={eventDetail.content}
              label={"이벤트 내용"}
              state={content}
            />

            <Image
              src={imageSourceUrl}
              alt={"이미지"}
              width={300}
              height={300}
            />
          </div>
          <div>
            <h3>이미지 수정할 거면 이걸 클릭해주세용</h3>
            <Button onClick={onClickFileUploadElement} variant={"contained"}>
              Update Image
              <input
                ref={uploadFileInput}
                type={"file"}
                hidden={true}
                accept={FILE_TYPE}
                onChange={onChangeImage}
              />
            </Button>
          </div>
        </main>
        <div className={styles.button_layout}>
          <Button type={"submit"} variant={"contained"}>
            수정하기
          </Button>
        </div>
      </form>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const uuid = context.query["uuid"];
  const res = await fetchWithBaseURL(`/api/v1/pple/event/${uuid}`);
  const eventDetail: IEvent = await res.json();
  return {
    props: {
      eventDetail,
    },
  };
};

export default EventDetail;
