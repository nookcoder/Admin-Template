import React from "react";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { fetchWithBaseURL } from "../../api/AppFetch";
import { IOneDonation } from "../../model/interface/story/IOneDonation";
import DetailTextField from "../../components/common/DetailTextField";
import { useAppSelect } from "../../hooks/ReduxHooks";
import DetailTextArea from "../../components/common/DetailTextArea";

const StoryDetail: NextPage<IOneDonation> = ({
  donation,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const title = useAppSelect((state) => state.detailDonation.title);
  const content = useAppSelect((state) => state.detailDonation.content);
  return (
    <div>
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
      <button onClick={() => console.log(title + "/" + content)}>확인</button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const donationUuid = context.query["donationUuid"];
  const res = await fetchWithBaseURL(`/api/v1/donation/one/${donationUuid}`);
  const donation: IOneDonation = await res.json();
  return {
    props: {
      donation,
    },
  };
};

export default StoryDetail;
