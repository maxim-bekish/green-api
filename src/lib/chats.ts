import type { Chat, HistoryMessage } from '../types';

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
