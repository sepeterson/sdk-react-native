import { type FetchResult } from '@apollo/client';
import {
  DELIVERED_MUTATION,
  READ_MUTATION,
  SEND_REFERRAL_MUTATION,
  SIGNIN_MUTATION,
  SIGNUP_MUTATION,
  UPDATE_METADATA,
} from '../utils/mutations';
import { client, refreshClient } from '../utils/apollo-client';
import { Platform } from 'react-native';
import type { TSigninResponse, TSignupResponse } from '../types/api';
import { GET_MESSAGES } from '../utils/queries';
import type {
  CustomParamInput,
  MessagesMutationResponse,
} from '../types/queries';
// @ts-ignore
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ZowieConfig } from 'react-native-zowiesdk';
import { ZowieAuthenticationType } from 'react-native-zowiesdk';

const appId = Platform.OS === 'ios' ? 'herochat-ios' : 'herochat-android';

export const singUp = async (
  instanceId: string
): Promise<FetchResult<TSignupResponse>> => {
  return await client.mutate({
    mutation: SIGNUP_MUTATION,
    variables: { instanceId },
  });
};

export const singIn = async (
  instanceId: string,
  password: string,
  authorId: string
): Promise<FetchResult<TSigninResponse>> => {
  return await client.mutate({
    mutation: SIGNIN_MUTATION,
    variables: {
      instanceId,
      appId,
      authType: 'Credentials',
      password,
      authorId,
    },
  });
};
export const singInJwt = async (
  instanceId: string,
  authToken: string,
  authorId: string
): Promise<FetchResult<TSigninResponse>> => {
  return await client.mutate({
    mutation: SIGNIN_MUTATION,
    variables: {
      appId,
      instanceId,
      authToken,
      authType: 'Jwt',
      authorId,
    },
  });
};

export const sendReferral = async (conversationId: string, token: string) => {
  return await client.mutate({
    mutation: SEND_REFERRAL_MUTATION,
    variables: {
      conversationId: conversationId,
      referralId: 'start',
    },
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
};

export interface MetaData {
  firstName?: string;
  lastName?: string;
  name?: string;
  locale?: string;
  timeZone?: string;
  phoneNumber?: string;
  email?: string;
  customParams?: CustomParamInput[];
}

export const updateMetaData = async (
  metadata: MetaData,
  token: string,
  conversationId: string
) => {
  return await client.mutate({
    mutation: UPDATE_METADATA,
    variables: {
      conversationId,
      ...metadata,
    },
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
};

const checkChatExits = async () => {
  try {
    const token = await AsyncStorage.getItem('@token');
    return !!token;
  } catch (e) {
    return false;
  }
};

const continueExistChat = async (
  instanceId: string,
  host: string,
  metaData?: MetaData
) => {
  try {
    const userId = await AsyncStorage.getItem('@userId');
    const password = await AsyncStorage.getItem('@password');
    const responseSignin = await singIn(
      instanceId,
      password || '',
      userId || ''
    );
    if (responseSignin.data) {
      const { token, conversationId } = responseSignin.data.signin.result;
      await AsyncStorage.setItem('@userId', userId || '');
      await AsyncStorage.setItem('@password', password || '');
      await AsyncStorage.setItem('@token', token);
      await AsyncStorage.setItem('@conversationId', conversationId);
      await refreshClient(host);
      if (metaData) {
        await updateMetaData(metaData, token, conversationId);
      }
      return { conversationId, token, password, userId };
    } else return null;
  } catch (e) {
    return null;
  }
};

export const initializeNewChat = async (
  instanceId: string,
  host: string,
  metaData?: MetaData
) => {
  try {
    const responseSignup = await singUp(instanceId);
    if (responseSignup.data) {
      const { password, userId } = responseSignup.data.signup;

      const responseSignin = await singIn(instanceId, password, userId);

      if (responseSignin.data) {
        const { token, conversationId } = responseSignin.data.signin.result;
        await AsyncStorage.setItem('@userId', userId);
        await AsyncStorage.setItem('@password', password);
        await AsyncStorage.setItem('@token', token);
        await AsyncStorage.setItem('@conversationId', conversationId);
        await refreshClient(host);
        await sendReferral(conversationId, token);
        if (metaData) {
          await updateMetaData(metaData, token, conversationId);
        }
        return { conversationId, token, password, userId };
      }
    }
    return null;
  } catch (e) {
    return null;
  }
};

export const initializeJwtChat = async (
  instanceId: string,
  authToken: string,
  authorId: string,
  host: string,
  metaData?: MetaData
) => {
  try {
    const responseSignin = await singInJwt(instanceId, authToken, authorId);
    if (responseSignin.data) {
      const { token, conversationId } = responseSignin.data.signin.result;
      await AsyncStorage.setItem('@userId', authorId);
      await AsyncStorage.setItem('@token', token);
      await AsyncStorage.setItem('@conversationId', conversationId);

      await refreshClient(host);
      const timestamp = Date.now() + 60000;
      const response = await getMessages(conversationId, timestamp, token);
      const isChatEmpty = response.data?.messages.edges.length === 0;
      if (isChatEmpty) {
        await sendReferral(conversationId, token);
      }
      if (metaData) {
        await updateMetaData(metaData, token, conversationId);
      }
      return { conversationId, token, password: '', userId: authorId };
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
};

export const initializeChat = async (
  config: ZowieConfig,
  host: string,
  metaData?: MetaData
) => {
  const isChatExist = await checkChatExits();
  if (
    config.authenticationType === ZowieAuthenticationType.JwtToken &&
    config.authorId &&
    config.jwt
  ) {
    return await initializeJwtChat(
      config.instanceId,
      config.jwt,
      config.authorId,
      host,
      metaData
    );
  } else if (isChatExist) {
    return await continueExistChat(config.instanceId, host, metaData);
  } else {
    return await initializeNewChat(config.instanceId, host, metaData);
  }
};

export const getMessages = (
  conversationId: string,
  offset: number,
  token: string
): Promise<FetchResult<MessagesMutationResponse>> => {
  return client.query({
    query: GET_MESSAGES,
    variables: {
      conversationId,
      offset,
      entriesPerPage: 50,
    },
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
};

export const readMessage = async (
  conversationId: string,
  token: string,
  time: number
) => {
  return await client.mutate({
    mutation: READ_MUTATION,
    variables: {
      conversationId,
      time,
    },
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
};

export const deliveredMessage = async (
  conversationId: string,
  token: string,
  time: number
) => {
  return await client.mutate({
    mutation: DELIVERED_MUTATION,
    variables: {
      conversationId,
      time,
    },
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
};
