import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import { messagesQuery, addMessageMutation, addMessageSubscription } from './graphql/queries';

function useChatMessage() {
	const { data } = useQuery(messagesQuery);
	const [addMessage] = useMutation(addMessageMutation);
	const messages = data ? data.messages : [];

	useSubscription(addMessageSubscription, {
		onSubscriptionData:({ client, subscriptionData }) => {
		client.writeData({data: {
			messages: messages.concat(subscriptionData.data.messageAdded),
		}})
		}
	});
	return {
		addMessage: (text) => addMessage({ variables: {input: {text} }}),
		messages,
	};
}
export default useChatMessage;

