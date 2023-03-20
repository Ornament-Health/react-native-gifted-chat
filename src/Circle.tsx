import React, { forwardRef, ComponentProps } from 'react';
import { Animated, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: 'black',
  },
});

interface OwnProps {
  radius?: number;
}

type Props = ComponentProps<typeof View> & OwnProps;

const Circle = forwardRef<View, Props>(
  ({ radius = 10, style, ...props }, ref) => {
    const d = radius * 2;
    const custom = { width: d, height: d, borderRadius: d };
    return (
      <View ref={ref as any} style={[styles.root, style, custom]} {...props} />
    );
  }
);

export const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default AnimatedCircle;
