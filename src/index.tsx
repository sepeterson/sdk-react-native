import React from 'react';
import { type ViewStyle } from 'react-native';
import MainView from './MainView/MainView';
import { type Colors, ColorsProvider } from './hooks/colors';
import { client, setHost } from './utils/apollo-client';
import { ApolloProvider } from '@apollo/client';
import { UserInfoProvider } from './hooks/userInfo';
import { VideoProvider } from './hooks/video';
import {
  initializeNewChat,
  type MetaData,
  sendActive,
} from './api/apiMutations';
import { type Translations, TranslationsProvider } from './hooks/translations';

export enum ZowieAuthenticationType {
  Anonymous = 'Anonymous',
  JwtToken = 'JwtToken',
}

export interface ZowieConfig {
  authenticationType: ZowieAuthenticationType;
  instanceId: string;
  jwt?: string;
  authorId?: string;
  contextId?: string;
  fcmToken?: string;
}

export interface ZowieChatProps {
  style?: ViewStyle;
  onStartChatError?: (error: string) => void;
  iosKeyboardOffset?: number;
  androidKeyboardOffset?: number;
  translations?: Translations;
  customColors?: Colors;
  metaData?: MetaData;
  config: ZowieConfig;
  host: string;
}

export const ZowieChat = ({
  style,
  iosKeyboardOffset = 0,
  androidKeyboardOffset = 0,
  customColors,
  metaData,
  config,
  host,
  onStartChatError,
  translations,
}: ZowieChatProps) => {
  setHost(host);
  return (
    <ApolloProvider client={client}>
      <TranslationsProvider customTranslations={translations}>
        <VideoProvider>
          <ColorsProvider customColors={customColors}>
            <UserInfoProvider>
              <MainView
                host={host}
                style={style}
                androidKeyboardOffset={androidKeyboardOffset}
                iosKeyboardOffset={iosKeyboardOffset}
                metaData={metaData}
                onStartChatError={onStartChatError}
                config={config}
              />
            </UserInfoProvider>
          </ColorsProvider>
        </VideoProvider>
      </TranslationsProvider>
    </ApolloProvider>
  );
};

export const clearSession = async (
  instanceId: string,
  host: string,
  metaData?: MetaData,
  contextId?: string,
  fcmToken?: string
) => {
  setHost(host);
  try {
    await initializeNewChat(instanceId, host, metaData, contextId, fcmToken);
    return 200;
  } catch (e) {
    return e;
  }
};

export const setActive = async (isActive: boolean) => {
  return await sendActive(isActive);
};

export type { Colors, MetaData, Translations };
