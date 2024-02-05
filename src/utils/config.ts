import { PayloadTypes } from '../types/queries';

export const notAllowedTypesToMessageList = [
  PayloadTypes.TypingOn,
  PayloadTypes.TypingOff,
  PayloadTypes.Referral,
];

export const additionalMinuteInMs = 60000;

export const debounceTimeForSetNewestMessageAsReadMs = 2000;

export const newestMessageOffsetParams = { offset: 0, animated: true };
