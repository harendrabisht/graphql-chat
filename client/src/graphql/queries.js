import gql from 'graphql-tag';
import client from './client';

export const messagesQuery = gql`
  query MessagesQuery {
    messages {
      id
      from
      text
    }
  }
`;

export const addMessageMutation = gql`
  mutation AddMessageMutation($input: MessageInput!) {
    message: addMessage(input: $input) {
      id
      from
      text
    }
  }
`;

export const addMessageSubscription = gql`
  subscription {
    messageAdded {
      id
      text
      from
    }
  }
`;

export async function addMessage(text) {
  const {data} = await client.mutate({
    mutation: addMessageMutation,
    variables: {input: {text}}
  });
  return data.message;
}

export async function getMessages() {
  const {data} = await client.query({query: messagesQuery});
  return data.messages;
}

export function addMessageSocket (handleMessage) {
  const observable = client.subscribe({ query: addMessageSubscription});
  return observable.subscribe(({ data }) => handleMessage(data.messageAdded));
}
