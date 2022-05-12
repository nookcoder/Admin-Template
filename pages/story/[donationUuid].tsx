import React, { useCallback, useEffect, useState } from "react";
import { NextPage } from "next";
import DetailTextField from "../../components/common/DetailTextField";
import { useAppSelect } from "../../hooks/ReduxHooks";
import DetailTextArea from "../../components/common/DetailTextArea";
import { useRouter } from "next/router";
import { IDonationContent } from "../../model/interface/story/IDonation";

const StoryDetail: NextPage = () => {
  const router = useRouter();

  const title = useAppSelect((state) => state.detailDonation.title);
  const content = useAppSelect((state) => state.detailDonation.content);
  const [donation, setDonation] = useState<IDonationContent>();

  const fetchDonation = useCallback(async () => {
    const donationUuid = router.query["donationUuid"];
    if (typeof donationUuid == "string" && donationUuid) {
      console.log("OK");
    }
    return;
  }, [router.query]);

  useEffect(() => {
    fetchDonation();
  }, [fetchDonation]);

  return (
    <div>
      {donation ? (
        <>
          <DetailTextField
            defaultValue={donation.title}
            label={"사연제목"}
            state={title}
          />
          <DetailTextArea
            defaultValue={donation.content}
            label={"사연내용"}
            state={content}
          />
        </>
      ) : (
        <></>
      )}
      <button onClick={() => console.log(title + "/" + content)}>확인</button>
    </div>
  );
};

export default StoryDetail;
