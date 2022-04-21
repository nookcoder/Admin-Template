export interface IDonation {
  data: {
    content: [
      {
        bloodProduct: string;
        content: string;
        createdAt: string;
        lastRenewedAt: string;
        lettersCount: number;
        likesCount: number;
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
        replyCount: number;
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
      },
    ];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: {
      offset: number;
      pageNumber: number;
      pageSize: number;
      paged: boolean;
      sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
      };
      unpaged: boolean;
    };
    size: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    totalElements: number;
    totalPages: number;
  };
}

export interface IDonationContent {
  id: number;
  bloodProduct: string;
  content: string;
  createdAt: string;
  lastRenewedAt: string;
  lettersCount: number;
  likesCount: number;
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
  replyCount: number;
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
}
