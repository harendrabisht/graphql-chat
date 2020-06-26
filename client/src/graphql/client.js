import {
  ApolloClient, ApolloLink, HttpLink, InMemoryCache, split
} from 'apollo-boost';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { getAccessToken } from '../auth';

const httpUrl = 'http://localhost:5000/graphql';
const wsUrl = 'ws://localhost:5000/graphql'

const wsLink = new WebSocketLink({ uri: wsUrl, options: {
  connectionParams: () => ({
    accessToken: getAccessToken(),
  }),
  lazy: true,
  reconnect: true,
}});

const httpLink = ApolloLink.from([
  new ApolloLink((operation, forward) => {
    const token = getAccessToken();
    if (token) {
      operation.setContext({headers: {'authorization': `Bearer ${token}`}});
    }
    return forward(operation);
  }),
  new HttpLink({uri: httpUrl})
]);

function isSubscription (operation) {
  const defination = getMainDefinition(operation.query);
  return defination.kind === 'OperationDefinition'
    && defination.operation === 'subscription';
}

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: split(isSubscription, wsLink, httpLink),
  defaultOptions: {query: {fetchPolicy: 'no-cache'}}
});

export default client;
