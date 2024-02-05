export interface TSignupResponse {
  signup: {
    __typename: string;
    instanceId: string;
    password: string;
    userId: string;
  };
}

export interface TSigninResponse {
  signin: {
    result: Result;
    errors: any;
  };
}

export interface Result {
  token: string;
  conversationId: string;
  sendReferral: boolean;
}
