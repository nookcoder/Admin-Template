import React, { useCallback, useEffect, useState } from "react";
import { NextPage } from "next";
import DetailTextField from "../../components/common/DetailTextField";
import { useAppSelect } from "../../hooks/ReduxHooks";
import DetailTextArea from "../../components/common/DetailTextArea";
import { useRouter } from "next/router";
import { IDonationContent } from "../../model/interface/story/IDonation";
import {
  setStoryContent,
  setStoryTitle,
} from "../../redux/feature/detail/donationSlice";
import { fetchData } from "../../lib/api/AppFetchGet";
import { PrintErrorMessage } from "../../util/Error";
import { getRouterQuery } from "../../hooks/RouterHook";
import { Button } from "@mui/material";
import { formatCreateAt } from "../../util/Format";
import { IReply } from "../../model/interface/common/IReply";

const StoryDetail: NextPage = () => {
  const router = useRouter();
  const donationUuid = getRouterQuery(router, "donationUuid");
  const title = useAppSelect((state) => state.detailDonation.title);
  const content = useAppSelect((state) => state.detailDonation.content);
  const [donation, setDonation] = useState<IDonationContent>();
  const [reply, setReply] = useState<IReply[]>();

  useEffect(() => {
    if (donationUuid) {
      fetchData(`/api/v1/donation/one/${donationUuid}`, setDonation)
        .then(() => {
          if (donation) {
            setReply(donation.reply);
          }
        })
        .catch((error) => {
          PrintErrorMessage(error);
        });
    }
  }, [donationUuid]);

  const routeToWriter = useCallback(() => {
    if (donation) {
      const accountUuid = donation.writer.accountUuid;
      router.push(`/user/${accountUuid}`);
    }
  }, [router, donation]);

  return (
    <div>
      {donation ? (
        <>
          <DetailTextField
            defaultValue={donation.title}
            label={"사연제목"}
            state={title}
            slice={setStoryTitle}
          />
          <DetailTextArea
            defaultValue={donation.content}
            label={"사연내용"}
            state={content}
            slice={setStoryContent}
          />
          <DetailTextField
            defaultValue={donation.createdAt}
            label={"게시글 등록 날짜"}
            state={content}
            slice={setStoryContent}
            formatFunction={formatCreateAt}
          />
          <DetailTextField
            defaultValue={donation.lastRenewedAt}
            label={"게시글 갱신 날짜"}
            state={content}
            slice={setStoryContent}
            formatFunction={formatCreateAt}
          />

          <Button variant={"contained"} onClick={routeToWriter}>
            글쓴이 상세페이지로 이동하기
          </Button>
          <Button
            variant={"contained"}
            onClick={() => {
              console.log(reply);
            }}
          >
            ㅋㅋㅋㅋ
          </Button>
        </>
      ) : (
        <></>
      )}
      <button onClick={() => console.log(title + "/" + content)}>확인</button>
    </div>
  );
};

export default StoryDetail;
