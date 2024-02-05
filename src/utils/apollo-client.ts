import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';

import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';
// @ts-ignore
import AsyncStorage from '@react-native-async-storage/async-storage';

const createLink = (token: string, host?: string) => {
  const wsLink = new WebSocketLink(
    new SubscriptionClient(`wss://${host}/graphql-ws`, {
      connectionParams: {
        token,
      },
      reconnect: true,
    })
  );

  const httpLink = new HttpLink({
    uri: `https://${host}/graphql`,
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink
  );
  return splitLink;
};

const client = new ApolloClient({
  link: createLink('init', 'random.chat.getzowie.com/api/v1/core'),
  cache: new InMemoryCache(),
});

const refreshClient = async (host: string) => {
  try {
    const token = await AsyncStorage.getItem('@token');
    client.setLink(createLink(token || '', host));
  } catch (e) {}
};

const setHost = (host: string) => {
  client.setLink(createLink('init', host));
};

export { client, refreshClient, setHost };
