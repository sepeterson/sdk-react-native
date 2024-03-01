import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import type { ColorValue } from 'react-native';

export type Colors = {
  backgroundColor: ColorValue;
  newMessageTextColor: ColorValue;
  sendTextButtonColor: ColorValue;
  sendTextButtonDisabledColor: ColorValue;
  separatorColor: ColorValue;
  quickButtonBackgroundColor: ColorValue;
  quickButtonTextColor: ColorValue;
  incomingMessageLinksColor: ColorValue;
  zowieLogoButtonBackgroundColor: ColorValue;
  incomingMessageBackgroundColor: ColorValue;
  incomingMessagePrimaryTextColor: ColorValue;
  incomingMessageSecondaryTextColor: ColorValue;
  typingAnimationColor: ColorValue;
  typingAnimationBackgroundColor: ColorValue;
  userMessagePrimaryTextColor: ColorValue;
  userMessageBackgroundColor: ColorValue;
  urlTemplateButtonBackgroundColor: ColorValue;
  urlTemplateButtonTextColor: ColorValue;
  actionButtonTextColor: ColorValue;
  actionButtonBackgroundColor: ColorValue;
  placeholderTextColor: ColorValue;
  messageErrorColor?: ColorValue;
  announcementTextColor?: ColorValue;
  announcementBackgroundColor?: ColorValue;
  announcementBorderColor?: ColorValue;
};

const defaultColors: Colors = {
  incomingMessageBackgroundColor: '#F2F2F2',
  incomingMessagePrimaryTextColor: '#333333',
  incomingMessageSecondaryTextColor: '#666666',
  incomingMessageLinksColor: '#1473E6',
  userMessagePrimaryTextColor: '#FFFFFF',
  userMessageBackgroundColor: '#403AEE',
  backgroundColor: '#FFFFFF',
  newMessageTextColor: '#333333',
  sendTextButtonColor: '#403AEE',
  sendTextButtonDisabledColor: '#999999',
  separatorColor: '#EBEBEB',
  quickButtonBackgroundColor: '#d6b6fb4d',
  quickButtonTextColor: '#403AEE',
  zowieLogoButtonBackgroundColor: '#FFFFFF',
  typingAnimationColor: '#999999',
  typingAnimationBackgroundColor: '#F2F2F2',
  urlTemplateButtonBackgroundColor: '#FFFFFF',
  urlTemplateButtonTextColor: '#403AEE',
  actionButtonTextColor: '#403AEE',
  actionButtonBackgroundColor: '#FFFFFF',
  placeholderTextColor: '#999999',
  messageErrorColor: '#EB5249',
  announcementTextColor: '#666666',
  announcementBackgroundColor: 'transparent',
  announcementBorderColor: '#f2f2f2',
};

interface ColorsContextType {
  colors: Colors;
  updateColors: (newColors: Colors) => void;
}

const ColorsContext = createContext<ColorsContextType | undefined>(undefined);

export const useColors = (): ColorsContextType => {
  const colorsContext = useContext(ColorsContext);
  if (!colorsContext) {
    throw new Error('useColors must be used within a ColorsProvider');
  }
  return colorsContext;
};

interface ColorsProviderProps {
  children: ReactNode;
  customColors?: Colors;
}

export const ColorsProvider: React.FC<ColorsProviderProps> = ({
  children,
  customColors,
}) => {
  const [colors, setColors] = useState<Colors>({
    ...defaultColors,
    ...customColors,
  });

  const updateColors = (newColors: Colors) => {
    setColors({ ...colors, ...newColors });
  };

  return (
    <ColorsContext.Provider value={{ colors, updateColors }}>
      {children}
    </ColorsContext.Provider>
  );
};
