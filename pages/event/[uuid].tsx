import React, { ChangeEvent, FormEventHandler, useRef, useState } from "react";
import { NextPage } from "next";
import { useAppDispatch, useAppSelect } from "../../hooks/ReduxHooks";
import { Button } from "@mui/material";
import { FILE_TYPE } from "../../util/constant";
import styles from "../../styles/EventUpdate.module.scss";
import { setEventImageUrl } from "../../redux/feature/event/eventSlice";
import { IEvent } from "../../model/interface/event/IEvent";
import DetailTextArea from "../../components/common/DetailTextArea";
import DetailTextField from "../../components/common/DetailTextField";
import { auto } from "@popperjs/core";
import { appAxiosPatch } from "../../lib/api/AppAxios";
import { useRouter } from "next/router";
import { PrintErrorMessage } from "../../util/Error";

const EventDetail: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const uploadFileInput = useRef<HTMLInputElement>(null);

  // const [uuid, setUuid] = useState<string>(event.uuid);
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
    // bodyDto.set("eventUuid", uuid);
    if (imageFile) {
      bodyDto.set("uploadImageFile", imageFile, imageFile.name);
    }

    appAxiosPatch("/api/v1/admin/pple/event", bodyDto, accessToken)
      .then((res) => {
        router.push("/event");
      })
      .catch((err) => {
        PrintErrorMessage(err.status);
      });
  };
  //
  // useEffect(() => {
  //   setEventDetail(event);
  //   dispatch(setEventTitle(event.title));
  //   dispatch(setEventContent(event.content));
  //   dispatch(setEventImageUrl(event.eventImageUrl));
  // }, [event, dispatch]);

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
              />
              <DetailTextArea
                defaultValue={eventDetail.content}
                label={"이벤트 내용"}
                state={content}
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
        <></>
      )}
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { uuid } = context.query;
//   if (!uuid) {
//     console.log("UUID 가 없습니다");
//   }
//   if (typeof uuid == "string") {
//     const event = await loadEvent(uuid);
//     return {
//       props: { event },
//     };
//   }
//   return {
//     props: {
//       event: null,
//     },
//   };
// };

export default EventDetail;
