import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import type { ColorValue, ImageSourcePropType } from 'react-native';

export type Theme = {
  messageRadius?: number | undefined;
  quickButtonRadius?: number | undefined;
  quickButtonBorderWidth?: number | undefined;
  quickButtonBorderColor?: ColorValue | undefined;

  sendButtonImg?: ImageSourcePropType | undefined;
  sendButtonImgWidth?: number | undefined;
  sendButtonImgHeight?: number | undefined;
  sendButtonImgTintColor?: ColorValue | undefined;

  galleryButtonImg?: ImageSourcePropType | undefined;
  galleryButtonImgWidth?: number | undefined;
  galleryButtonImgHeight?: number | undefined;
  galleryButtonImgTintColor?: ColorValue | undefined;

  fileButtonImg?: ImageSourcePropType | undefined;
  fileButtonImgWidth?: number | undefined;
  fileButtonImgHeight?: number | undefined;
  fileButtonImgTintColor?: ColorValue | undefined;
};

const defaultTheme: Theme = {
  messageRadius: undefined,
  quickButtonRadius: undefined,
  quickButtonBorderWidth: undefined,
  quickButtonBorderColor: undefined,
  sendButtonImg: undefined,
  sendButtonImgWidth: undefined,
  sendButtonImgHeight: undefined,
  sendButtonImgTintColor: undefined,
  galleryButtonImg: undefined,
  galleryButtonImgWidth: undefined,
  galleryButtonImgHeight: undefined,
  galleryButtonImgTintColor: undefined,
  fileButtonImg: undefined,
  fileButtonImgWidth: undefined,
  fileButtonImgHeight: undefined,
  fileButtonImgTintColor: undefined,
};

interface ThemeContextType {
  theme: Theme;
  updateTheme: (newTheme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error(
      'useTranslations must be used within a TranslationsProvider'
    );
  }
  return themeContext;
};

interface ThemeProviderProps {
  children: ReactNode;
  customTheme?: Theme;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  customTheme,
}) => {
  const [theme, setTheme] = useState<Theme>({
    ...defaultTheme,
    ...customTheme,
  });

  const updateTheme = (newTheme: Theme) => {
    setTheme({ ...theme, ...newTheme });
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
