import { Dimensions, Platform, StatusBar } from 'react-native';
import dayjs from 'dayjs';

import { IMessage } from './Models';

export function isSameDay(
  currentMessage: IMessage,
  diffMessage: IMessage | null | undefined
) {
  if (!diffMessage || !diffMessage.createdAt) {
    return false;
  }

  const currentCreatedAt = dayjs(currentMessage.createdAt);
  const diffCreatedAt = dayjs(diffMessage.createdAt);

  if (!currentCreatedAt.isValid() || !diffCreatedAt.isValid()) {
    return false;
  }

  return currentCreatedAt.isSame(diffCreatedAt, 'day');
}

export function isSameUser(
  currentMessage: IMessage,
  diffMessage: IMessage | null | undefined
) {
  return !!(
    diffMessage &&
    diffMessage.user &&
    currentMessage.user &&
    diffMessage.user._id === currentMessage.user._id
  );
}

const styleString = (color: string) => `color: ${color}; font-weight: bold`;

const headerLog = '%c[react-native-gifted-chat]';

export const warning = (...args: any) => {
  if (__DEV__) console.log(headerLog, styleString('orange'), ...args);
};

export const error = (...args: any) => {
  if (__DEV__) console.log(headerLog, styleString('red'), ...args);
};

// https://github.com/ptelad/react-native-iphone-x-helper
export const isIphoneX = () => {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 780 ||
      dimen.width === 780 ||
      dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 844 ||
      dimen.width === 844 ||
      dimen.height === 896 ||
      dimen.width === 896 ||
      dimen.height === 926 ||
      dimen.width === 926)
  );
};

export const ifIphoneX = (iphoneXStyle: number, regularStyle: number) => {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
};

export const getStatusBarHeight = (safe: boolean) => {
  return Platform.select({
    ios: ifIphoneX(safe ? 44 : 30, 20),
    android: StatusBar.currentHeight,
    default: 0,
  });
};

export const getBottomSpace = () => {
  return isIphoneX() ? 34 : 0;
};
