import React, { Component } from 'react';
import { Animated, View, ViewProps, StyleSheet } from 'react-native';
import Circle from './Circle';

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

interface Props extends ViewProps {
  size: number;
  color: string;
  spaceBetween: number;
}

interface State {
  circles: Animated.Value[];
}

export class Bubbles extends Component<Props, State> {
  public static defaultProps: Props = {
    size: 10,
    color: '#000',
    spaceBetween: 6,
  };

  public readonly state = {
    circles: [
      new Animated.Value(0),
      new Animated.Value(0),
      new Animated.Value(0),
    ],
  };

  private unmounted: boolean = false;
  private timers: NodeJS.Timeout[] = [];

  public componentDidMount() {
    this.state.circles.forEach((_val, index) => {
      const timer = setTimeout(() => this.animate(index), index * 300);
      this.timers.push(timer as any);
    });
  }

  public componentWillUnmount() {
    this.timers.forEach(timer => {
      clearTimeout(timer);
    });

    this.unmounted = true;
  }

  animate(index: number) {
    Animated.sequence([
      Animated.timing(this.state.circles[index], {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.circles[index], {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (!this.unmounted) {
        this.animate(index);
      }
    });
  }

  renderBubble(index: number) {
    const { size, color } = this.props;
    const scale = this.state.circles[index];

    return (
      <Circle
        style={[
          {
            backgroundColor: color,
            transform: [{ scale }],
          },
        ]}
        radius={size}
      />
    );
  }

  render() {
    const { size, spaceBetween, color, style, ...props } = this.props;
    const width = size * 6 + spaceBetween * 2;
    const height = size * 2;

    return (
      <View style={[styles.root, style, { width, height }]} {...props}>
        {this.renderBubble(0)}
        {this.renderBubble(1)}
        {this.renderBubble(2)}
      </View>
    );
  }
}

export default Bubbles;
