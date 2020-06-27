import React from 'react';
import useChatMessage from './hooks';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

const Chat = ({ user }) => {
  const { messages, addMessage } = useChatMessage();

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Chatting as {user}</h1>
        <MessageList user={user} messages={messages} />
        <MessageInput onSend={addMessage} />
      </div>
    </section>
  );
}
export default Chat;
