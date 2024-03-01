import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';

export type Translations = {
  problemWithSendMessage: string;
  tryAgainSendMessage: string;
  attachment: string;
  downloadAttachment: string;
  internetConnectionLost: string;
  internetConnectionRestored: string;
  newMessagePlaceHolder: string;
  videoPlayerAndroidBack: string;
  maxAttachmentSize20MB: string;
};

const defaultEn: Translations = {
  problemWithSendMessage: 'We couldn’t sent your message.',
  tryAgainSendMessage: 'Try again',
  attachment: 'Attachment',
  downloadAttachment: 'Download attachment',
  internetConnectionLost: 'We couldn’t connect to our servers',
  internetConnectionRestored: 'Connection restored',
  newMessagePlaceHolder: 'Your message...',
  videoPlayerAndroidBack: 'Back',
  maxAttachmentSize20MB: 'Maximum file size 20MB',
};

interface TranslationsContextType {
  translations: Translations;
  updateTranslations: (newTranslations: Translations) => void;
}

const TranslationsContext = createContext<TranslationsContextType | undefined>(
  undefined
);

export const useTranslations = (): TranslationsContextType => {
  const translationsContext = useContext(TranslationsContext);
  if (!translationsContext) {
    throw new Error(
      'useTranslations must be used within a TranslationsProvider'
    );
  }
  return translationsContext;
};

interface TranslationsProviderProps {
  children: ReactNode;
  customTranslations?: Translations;
}

export const TranslationsProvider: React.FC<TranslationsProviderProps> = ({
  children,
  customTranslations,
}) => {
  const [translations, setTranslations] = useState<Translations>({
    ...defaultEn,
    ...customTranslations,
  });

  const updateTranslations = (newTranslations: Translations) => {
    setTranslations({ ...translations, ...newTranslations });
  };

  return (
    <TranslationsContext.Provider value={{ translations, updateTranslations }}>
      {children}
    </TranslationsContext.Provider>
  );
};
