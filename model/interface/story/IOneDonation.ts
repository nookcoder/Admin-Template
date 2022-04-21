export interface IOneDonation {
  data: {
    bloodProduct: string;
    content: string;
    createdAt: string;
    lastRenewedAt: string;
    likes: [
      {
        likeAccountUuid: string;
      },
    ];
    modifiedAt: string;
    patient: {
      bloodType: {
        abo: string;
        rh: string;
      };
      createdAt: string;
      modifiedAt: string;
      status: string;
      uuid: string;
    };
    phoneNumber: string;
    profileImageUrl: string;
    renewCount: number;
    reply: [
      {
        content: string;
        createdAt: string;
        report: true;
        uuid: string;
        writer: {
          accountUuid: string;
          birthDay: string;
          bloodType: {
            abo: string;
            rh: string;
          };
          displayName: string;
          email: string;
          gender: string;
          phoneNumber: string;
          profileImageUrl: string;
          role: string;
          status: string;
        };
      },
    ];
    status: string;
    title: string;
    uuid: string;
    viewsCount: number;
    writer: {
      accountUuid: string;
      birthDay: string;
      displayName: string;
      email: string;
      fcmToken: string;
      gender: string;
      phoneNumber: string;
      profileImageUrl: string;
      providerType: string;
      role: string;
      status: string;
    };
  };
}
