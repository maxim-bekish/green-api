import type { Chat, HistoryMessage } from '../types';
import type { Notification } from '../api/greenApi';

type NotificationBody = Notification['body'];

interface IncomingMessage {
	chatId: string;
	message: HistoryMessage;
}

export const addMessageToChat = (
	chats: Chat[],
	chatId: string,
	message: HistoryMessage,
): Chat[] => {
	return chats.map((chat) => {
		const isTargetChat = chat.id === chatId;

		if (!isTargetChat) {
			return chat;
		}

		const updatedMessages = [...chat.historyMessages, message];

		return { ...chat, historyMessages: updatedMessages };
	});
};

export const parseIncomingMessage = (body: NotificationBody): IncomingMessage | null => {
	const isIncoming = body.typeWebhook === 'incomingMessageReceived';
	const isText = body.messageData?.typeMessage === 'textMessage';
	const text = body.messageData?.textMessageData?.textMessage;
	const phone = body.senderData?.senderPhoneNumber;

	if (!isIncoming || !isText || !text || !phone) {
		return null;
	}

	return {
		chatId: `${phone}@c.us`,
		message: {
			id: body.idMessage,
			text,
			direction: 'incoming',
			timestamp: body.timestamp,
		},
	};
};
