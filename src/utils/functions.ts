import type { Message } from '../types/queries';
import { Dimensions } from 'react-native';
export const isTextMessage = (
  message: Message | { newMessage: Message } | undefined
): boolean => {
  if (message === undefined) {
    return false;
  }
  if ('newMessage' in message) {
    return message.newMessage.payload.__typename === 'Text';
  } else {
    return message.payload.__typename === 'Text';
  }
};

//Merge messages and get uniq and last
export function mergeMessageArrays(
  prevArray: Message[],
  nextArray: Message[]
): Message[] {
  const mergedArr = [...nextArray, ...prevArray];
  let uniqueObjects: Record<string, Message> = {};
  mergedArr.forEach((obj) => {
    const id = obj.id;
    if (!uniqueObjects[id] || obj.time > (uniqueObjects[id]?.time || 0)) {
      uniqueObjects[id] = obj;
    }
  });

  const resultArray = Object.values(uniqueObjects);

  return resultArray.sort((a, b) => b.time - a.time);
}

export const screenWidth = Dimensions.get('screen').width;

export const prepareJpegBase64 = (base64: string) =>
  `data:image/jpeg;base64,${base64}`;

export const timestampToDate = (timestamp: number | undefined): string => {
  if (timestamp === undefined) {
    return '';
  }
  const date = new Date(timestamp);
  const today = new Date();

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  ) {
    return `${hours}:${minutes}`;
  } else {
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }
};

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  waitMilliseconds = 300,
  immediate = false
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
    // @ts-ignore
    const context = this;

    const later = function () {
      timeoutId = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeoutId;
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(later, waitMilliseconds);

    if (callNow) func.apply(context, args);
  };
}

export function isSameDay(
  timestamp1: number,
  timestamp2: number | undefined
): boolean {
  if (timestamp2 !== undefined) {
    const date1 = new Date(timestamp1);
    const date2 = new Date(timestamp2);
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  } else {
    return true;
  }
}
