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