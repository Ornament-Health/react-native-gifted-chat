import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  View,
  ImageProps,
  ViewStyle,
  StyleProp,
  ImageStyle,
} from 'react-native';
import { IMessage } from './Models';

const styles = StyleSheet.create({
  container: {},
  image: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
    resizeMode: 'cover',
  },
  imageActive: {
    flex: 1,
    resizeMode: 'contain',
  },
});

export interface MessageImageProps<TMessage extends IMessage> {
  currentMessage?: TMessage;
  containerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  imageProps?: Partial<ImageProps>;
  lightboxProps?: object;
}

export default class MessageImage<
  TMessage extends IMessage = IMessage
> extends Component<MessageImageProps<TMessage>> {
  static defaultProps = {
    currentMessage: {
      image: null,
    },
    containerStyle: {},
    imageStyle: {},
    imageProps: {},
    lightboxProps: {},
  };

  render() {
    const {
      containerStyle,
      imageProps,
      imageStyle,
      currentMessage,
    } = this.props;
    if (currentMessage) {
      return (
        <View style={[styles.container, containerStyle]}>
          <Image
            {...imageProps}
            style={[styles.image, imageStyle]}
            source={{ uri: currentMessage.image }}
          />
        </View>
      );
    }
    return null;
  }
}
