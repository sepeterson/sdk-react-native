import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';

export interface UserInfo {
  userId: string;
  conversationId: string;
  password: string;
  token: string;
}

const defaultUserInfo: UserInfo = {
  userId: '',
  conversationId: '',
  password: '',
  token: '',
};

interface UserInfoContextType {
  userInfo: UserInfo;
  setUserId: (userId: string) => void;
  setConversationId: (conversionId: string) => void;
  setPassword: (password: string) => void;
  setToken: (token: string) => void;
  setUserInfo: (userInfo: UserInfo) => void;
}

const UserInfoContext = createContext<UserInfoContextType | undefined>(
  undefined
);

export const useUserInfo = (): UserInfoContextType => {
  const userInfoContext = useContext(UserInfoContext);
  if (!userInfoContext) {
    throw new Error('useUserInfo must be used within a UserInfoProvider');
  }
  return userInfoContext;
};

interface UserInfoProviderProps {
  children: ReactNode;
}

export const UserInfoProvider: React.FC<UserInfoProviderProps> = ({
  children,
}) => {
  const [userInfo, setUserInfo] = useState<UserInfo>(defaultUserInfo);

  const setUserId = (userId: string) => {
    setUserInfo((prevInfo) => ({ ...prevInfo, userId }));
  };

  const setConversationId = (conversionId: string) => {
    setUserInfo((prevInfo) => ({ ...prevInfo, conversionId }));
  };

  const setPassword = (password: string) => {
    setUserInfo((prevInfo) => ({ ...prevInfo, password }));
  };

  const setToken = (token: string) => {
    setUserInfo((prevInfo) => ({ ...prevInfo, token }));
  };

  return (
    <UserInfoContext.Provider
      value={{
        userInfo,
        setUserInfo,
        setUserId,
        setConversationId,
        setPassword,
        setToken,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};
