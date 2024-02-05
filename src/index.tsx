import React from 'react';
import { type ViewStyle } from 'react-native';
import MainView from './MainView/MainView';
import { type Colors, ColorsProvider } from './hooks/colors';
import { client, setHost } from './utils/apollo-client';
import { ApolloProvider } from '@apollo/client';
import { UserInfoProvider } from './hooks/userInfo';
import { VideoProvider } from './hooks/video';
import { initializeNewChat, type MetaData } from './api/apiMutations';

export enum ZowieAuthenticationType {
  Anonymous = 'Anonymous',
  JwtToken = 'JwtToken',
}

export interface ZowieConfig {
  authenticationType: ZowieAuthenticationType;
  instanceId: string;
  jwt?: string;
  authorId?: string;
}

export interface ZowieChatProps {
  style?: ViewStyle;
  iosKeyboardOffset?: number;
  androidKeyboardOffset?: number;
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
}: ZowieChatProps) => {
  setHost(host);
  return (
    <ApolloProvider client={client}>
      <VideoProvider>
        <ColorsProvider customColors={customColors}>
          <UserInfoProvider>
            <MainView
              host={host}
              style={style}
              androidKeyboardOffset={androidKeyboardOffset}
              iosKeyboardOffset={iosKeyboardOffset}
              metaData={metaData}
              config={config}
            />
          </UserInfoProvider>
        </ColorsProvider>
      </VideoProvider>
    </ApolloProvider>
  );
};

export const clearSession = async (instanceId: string, host: string) => {
  setHost(host);
  await initializeNewChat(instanceId, host);
};
