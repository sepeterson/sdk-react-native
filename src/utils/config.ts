import { PayloadTypes } from '../types/queries';

export const notAllowedTypesToMessageList = [
  PayloadTypes.TypingOn,
  PayloadTypes.TypingOff,
  PayloadTypes.Referral,
];

export const additionalMinuteInMs = 60000;

export const debounceTimeForSetNewestMessageAsReadMs = 2000;

export const newestMessageOffsetParams = { offset: 0, animated: true };

export const internetConnectionTestUrl =
  'https://clients3.google.com/generate_204';

export const internetConnectionTestIntervalMs = 5000;

export const internetConnectionRestoredBannerShowMs = 5000;

export const maxAttachmentFileSizeInBytes = 20000000;

export const maxMessagesPerPage = 50;

export const userSendActiveIntervalMs = 10000;
