export interface IReply {
  content: string;
  createdAt: string;
  report: boolean;
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
}
