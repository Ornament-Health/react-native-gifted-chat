import React from 'react';
import { Text } from 'react-native';
import { storiesOf } from '@storybook/react';
import Send from './Send';
import App from '../App';

storiesOf('Src/Text', module).add('default', () => <Text>Text</Text>);

storiesOf('Src/Send', module).add('default', () => <Send text="Send" />);

storiesOf('Src/App', module).add('default', () => <App />);
