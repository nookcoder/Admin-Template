import React, {
  ChangeEvent,
  FormEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { NextPage } from "next";
import { useAppDispatch, useAppSelect } from "../../hooks/ReduxHooks";
import { Button, CircularProgress } from "@mui/material";
import { FILE_TYPE } from "../../util/constant";
import styles from "../../styles/EventUpdate.module.scss";
import {
  setEventContent,
  setEventImageUrl,
  setEventTitle,
} from "../../redux/feature/event/eventSlice";
import { IEvent } from "../../model/interface/event/IEvent";
import DetailTextArea from "../../components/common/DetailTextArea";
import DetailTextField from "../../components/common/DetailTextField";
import { auto } from "@popperjs/core";
import { appAxiosPatch } from "../../lib/api/AppAxios";
import { useRouter } from "next/router";
import { PrintErrorMessage } from "../../util/Error";
import { initDetailInformation } from "../../lib/api/AppFetchGet";

const EventDetail: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const uuid = router.query.uuid;
  const uploadFileInput = useRef<HTMLInputElement>(null);

  const [isInitial, setIsInitial] = useState<boolean>(true);
  const [imageFile, setImageFile] = useState<File>();
  const [eventDetail, setEventDetail] = useState<IEvent>();

  const title = useAppSelect((state) => state.event.title);
  const content = useAppSelect((state) => state.event.content);
  const imageSourceUrl = useAppSelect((state) => state.event.imageSourceUrl);
  const accessToken = useAppSelect((state) => state.auth.accessToken);

  const onClickFileUploadElement = () => {
    if (uploadFileInput && uploadFileInput.current) {
      const { current } = uploadFileInput;
      current.click();
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

    if (typeof uuid === "string") {
      bodyDto.set("eventUuid", uuid);
    }
    if (imageFile) {
      bodyDto.set("uploadImageFile", imageFile, imageFile.name);
    }

    appAxiosPatch("/api/v1/admin/pple/event", bodyDto, accessToken)
      .then(() => {
        router.push("/event");
      })
      .catch((err) => {
        PrintErrorMessage(err.status);
      });
  };

  const initEventData = useCallback((): void => {
    if (typeof uuid === "string") {
      initDetailInformation(
        `/api/v1/pple/event/${uuid}`,
        accessToken,
        setEventDetail,
      ).catch((err) => {
        PrintErrorMessage(err.status);
      });
    }
    return;
  }, [accessToken, uuid]);

  useEffect(() => {
    if (isInitial) {
      initEventData();
      setIsInitial(false);
    }
    if (eventDetail) {
      dispatch(setEventTitle(eventDetail.title));
      dispatch(setEventContent(eventDetail.content));
      dispatch(setEventImageUrl(eventDetail.eventImageUrl));
    }
  }, [isInitial, initEventData, dispatch, eventDetail]);

  return (
    <div>
      {eventDetail ? (
        <form action="" onSubmit={onSubmit}>
          <main className={styles.container}>
            <div className={styles.box}>
              <DetailTextField
                defaultValue={eventDetail.title}
                label={"이벤트 제목"}
                state={title}
                slice={setEventTitle}
              />
              <DetailTextArea
                defaultValue={eventDetail.content}
                label={"이벤트 내용"}
                state={content}
                slice={setEventContent}
              />

              <img
                src={imageSourceUrl}
                alt={"이미지"}
                width={300}
                height={auto}
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
      ) : (
        <CircularProgress></CircularProgress>
      )}
    </div>
  );
};

export default EventDetail;
