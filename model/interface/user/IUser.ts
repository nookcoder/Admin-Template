export default interface IUser {
  id: number;
  accountDetail: {
    badgeList: [
      {
        badgeKind: string;
        createdAt: string;
      },
    ];
    calendars: [
      {
        attendance: boolean;
        createdDate: string;
        likeCount: number;
        replyCount: number;
        shareDonation: boolean;
      },
    ];
    inboxThanksLetters: [
      {
        content: string;
        createdAt: string;
        letterImageType: string;
        modifiedAt: string;
        uuid: string;
      },
    ];
    point: number;
    reportCount: number;
    selfIntroduce: string;
    sendThanksLetters: [
      {
        content: string;
        createdAt: string;
        letterImageType: string;
        modifiedAt: string;
        uuid: string;
      },
    ];
    writtenReplies: [
      {
        content: string;
        createdAt: string;
        modifiedAt: string;
        report: boolean;
        uuid: string;
      },
    ];
  };
  birthDay: string;
  blockUsers: [
    {
      blockedUserUuid: string;
    },
  ];
  bloodType: {
    abo: string;
    rh: string;
  };
  createdAt: string;
  displayName: string;
  email: string;
  fcmToken: string;
  gender: string;
  marketingUserAgreement: boolean;
  modifiedAt: string;
  oauthUuid: string;
  phoneNumber: string;
  point: number;
  privacyPolicy: boolean;
  profileImageUrl: string;
  providerType: string;
  role: string;
  status: string;
  termOfService: boolean;
  uuid: string;
}
