import React, { Component } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';

import { messagesQuery, addMessageMutation, addMessageSubscription } from './graphql/queries';
import MessageInput from './MessageInput';
import MessageList from './MessageList';



const Chat = ({ user }) => {
  const { data } = useQuery(messagesQuery);
  const [addMessage] = useMutation(addMessageMutation);
  const messages = data ? data.messages : [];

  useSubscription(addMessageSubscription, {
    onSubscriptionData:({ client, subscriptionData }) => {
      client.writeData({data: {
        messages: messages.concat(subscriptionData.data.messageAdded),
      }})
    }
  })

  const handleSend = async (text) => {
    //handle message
    await addMessage({
      variables: {input: {text}}
    });
  }

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Chatting as {user}</h1>
        <MessageList user={user} messages={messages} />
        <MessageInput onSend={handleSend} />
      </div>
    </section>
  );
}
/* class Chat extends Component {
  state = {messages: []};
  messageSubscription = null;

  async componentDidMount() {
    const messages = await getMessages();
    this.setState({messages});
    this.messageSubscription = addMessageSocket((message => {
      this.setState({messages: this.state.messages.concat(message)});
    }))
  }

  componentWillUnmount() {
    this.messageSubscription.unsubscribe();
  }

  async handleSend(text) {
    await addMessage(text);
  }

  render() {
    const {user} = this.props;
    const {messages} = this.state;
    return (
      <section className="section">
        <div className="container">
          <h1 className="title">Chatting as {user}</h1>
          <MessageList user={user} messages={messages} />
          <MessageInput onSend={this.handleSend.bind(this)} />
        </div>
      </section>
    );
  }  
}
 */
export default Chat;
