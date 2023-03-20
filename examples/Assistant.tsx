import React, { Component } from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { GiftedChat, SystemMessage, IMessage } from '../src';

import AccessoryBar from './AccessoryBar';
import CustomActions from './CustomActions';
import CustomView from './CustomView';
// @ts-ignore
import { assistantMessages, bot, user } from './data/messages';
// @ts-ignore
import { assistantEarlierMessages } from './data/earlierMessages';

const styles = StyleSheet.create({
  container: { flex: 1, height: 500, width: 400 },
});

// @ts-ignore
const findStep = step => message => message._id === step;

export default class Assistant extends Component<any, any> {
  state = {
    step: 0,
    messages: [],
    loadEarlier: true,
    typingText: null,
    isLoadingEarlier: false,
    isTyping: false,
  };

  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    // init with only system messages
    this.setState({
      messages: assistantMessages, // messagesData.filter(message => message.system),
      isTyping: false,
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onLoadEarlier = () => {
    this.setState(() => {
      return {
        isLoadingEarlier: true,
      };
    });

    setTimeout(() => {
      if (this._isMounted === true) {
        this.setState((previousState: any) => {
          return {
            messages: GiftedChat.prepend(
              previousState.messages,
              assistantEarlierMessages as IMessage[],
              Platform.OS !== 'web'
            ),
            loadEarlier: true,
            isLoadingEarlier: false,
          };
        });
      }
    }, 1500); // simulating network
  };

  onSend = (messages: {}[] = []) => {
    const step = this.state.step + 1;
    this.setState((previousState: any) => {
      const sentMessages = [
        { ...messages[0], sent: true, received: true },
      ] as IMessage[];
      return {
        messages: GiftedChat.append(
          previousState.messages,
          sentMessages,
          Platform.OS !== 'web'
        ),
        step,
      };
    });
    // for demo purpose
    // setTimeout(() => this.botSend(step), Math.round(Math.random() * 1000))
  };

  botSend = (step = 0) => {
    const newMessage = (assistantMessages as IMessage[])
      .reverse()
      // .filter(filterBotMessages)
      .find(findStep(step));
    if (newMessage) {
      this.setState((previousState: any) => ({
        messages: GiftedChat.append(
          previousState.messages,
          [newMessage],
          Platform.OS !== 'web'
        ),
      }));
    }
  };

  parsePatterns = (_linkStyle: any) => {
    return [
      {
        pattern: /#(\w+)/,
        style: { textDecorationLine: 'underline', color: 'darkorange' },
        // onPress: () => Linking.openURL('http://gifted.chat'),
      },
    ];
  };

  renderCustomView(props: any) {
    return <CustomView {...props} />;
  }

  onReceive = (text: string) => {
    this.setState((previousState: any) => {
      return {
        messages: GiftedChat.append(
          previousState.messages as any,
          [
            {
              _id: Math.round(Math.random() * 1000000),
              text,
              createdAt: new Date(),
              user: bot,
            },
          ],
          Platform.OS !== 'web'
        ),
      };
    });
  };

  onSendFromUser = (messages: IMessage[] = []) => {
    const createdAt = new Date();
    const messagesToUpload = messages.map(message => ({
      ...message,
      user,
      createdAt,
      _id: Math.round(Math.random() * 1000000),
    }));
    this.onSend(messagesToUpload);
  };

  setIsTyping = () => {
    this.setState((state: any) => ({
      isTyping: !state.isTyping,
    }));
  };

  renderAccessory = () => (
    <AccessoryBar onSend={this.onSendFromUser} isTyping={this.setIsTyping} />
  );

  renderCustomActions = (props: any) => (
    <CustomActions {...props} onSend={this.onSendFromUser} />
  );

  renderSystemMessage = (props: any) => {
    return (
      <SystemMessage
        {...props}
        containerStyle={{
          marginBottom: 15,
        }}
        textStyle={{
          fontSize: 14,
        }}
      />
    );
  };

  onQuickReply = (replies: any) => {
    const createdAt = new Date();
    if (replies.length === 1) {
      this.onSend([
        {
          createdAt,
          _id: Math.round(Math.random() * 1000000),
          text: replies[0].title,
          user,
        },
      ]);
    } else if (replies.length > 1) {
      this.onSend([
        {
          createdAt,
          _id: Math.round(Math.random() * 1000000),
          text: replies.map((reply: any) => reply.title).join(', '),
          user,
        },
      ]);
    } else {
      // console.log('replies param is not set correctly');
    }
  };

  renderQuickReplySend = () => <Text>{' custom send =>'}</Text>;

  render() {
    return (
      <View
        style={styles.container}
        accessible
        accessibilityLabel="main"
        testID="main"
      >
        <GiftedChat
          messages={this.state.messages}
          onSend={this.onSend}
          loadEarlier={this.state.loadEarlier}
          onLoadEarlier={this.onLoadEarlier}
          isLoadingEarlier={this.state.isLoadingEarlier}
          parsePatterns={this.parsePatterns}
          user={user}
          scrollToBottom
          onLongPressAvatar={user => alert(JSON.stringify(user))}
          onPressAvatar={() => alert('short press')}
          onQuickReply={this.onQuickReply}
          keyboardShouldPersistTaps="never"
          renderAccessory={this.renderAccessory}
          renderActions={this.renderCustomActions}
          renderSystemMessage={this.renderSystemMessage}
          renderCustomView={this.renderCustomView}
          quickReplyStyle={{ borderRadius: 2 }}
          renderQuickReplySend={this.renderQuickReplySend}
          timeTextStyle={{ left: { color: 'red' }, right: { color: 'yellow' } }}
          isTyping={this.state.isTyping}
          inverted={Platform.OS !== 'web'}
          infiniteScroll
        />
      </View>
    );
  }
}
