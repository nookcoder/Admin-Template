export default interface IUser {
  id: number;
  accountDetail: {
    account: {
      birthDay: string;
      bloodType: { abo: string; rh: string };
      createdAt: string;
      displayName: string;
      email: string;
      fcmToken: string | null;
      gender: string;
      marketingUserAgreement: boolean;
      modifiedAt: string;
      oauthUuid: string;
      phoneNumber: string;
      privacyPolicy: boolean;
      profileImageUrl: string;
      providerType: string;
      role: string;
      status: string;
      termOfService: boolean;
      uuid: string;
    };
    inboxThanksLetters: Array<any>;
    sendThanksLetters: Array<any>;
    reportCount: number;
  };
  birthDay: string;
  bloodType: { abo: string; rh: string };
  createdAt: string;
  displayName: string;
  email: string;
  fcmToken: string | null;
  gender: string;
  marketingUserAgreement: boolean;
  modifiedAt: string;
  oauthUuid: string;
  phoneNumber: string;
  privacyPolicy: boolean;
  profileImageUrl: string;
  providerType: string;
  role: string;
  status: string;
  termOfService: boolean;
  uuid: string;
}
