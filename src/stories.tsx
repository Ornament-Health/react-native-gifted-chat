import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react';
import Send from './Send';
import Circle from './Circle';
import Bubbles from './Bubbles';
import TypingIndicator from './TypingIndicator';

import App from '../examples/App';

storiesOf('Src/Components', module)
  .add('Circle', () => <Circle radius={10} />)
  .add('Bubbles', () => <Bubbles />);

storiesOf('Src/Send', module).add('default', () => <Send text="Send" />);
storiesOf('Src/TypingIndicator', module).add('default', () => (
  <View
    style={[
      {
        width: 100,
        height: 500,
        backgroundColor: 'red',
      },
    ]}
  >
    <TypingIndicator isTyping />
  </View>
));

storiesOf('Src/App', module).add('default', () => <App />);
