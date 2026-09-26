import { useEffect, useState } from 'react';
import ChatWindow from '../../components/ChatWindow/ChatWindow';
import Sidebar from '../../components/Sidebar/Sidebar';
import type { Chat, Credentials, HistoryMessage } from '../../types';
import { deleteNotification, receiveNotification, sendMessage } from '../../api/greenApi';
import { addMessageToChat, parseIncomingMessage } from '../../lib/chats';
import { getStorageItem, setStorageItem } from '../../lib/storage';
import './ChatPage.scss';

interface ChatPageProps {
	credentials: Credentials;
}

export default function ChatPage({ credentials }: ChatPageProps) {
	const [chats, setChats] = useState(() => getStorageItem<Chat[]>('chats') ?? []);

	const [activeChatId, setActiveChatId] = useState<string | null>(null);

	const activeChat = chats.find((chat) => chat.id === activeChatId);

	useEffect(() => {
		setStorageItem('chats', chats);
	}, [chats]);

	useEffect(() => {
		let isPolling = true;

		const poll = async () => {
			while (isPolling) {
				try {
					const notification = await receiveNotification(credentials);
					if (!notification) continue;

					const incoming = parseIncomingMessage(notification.body);

					if (incoming) {
						setChats((prev) =>
							addMessageToChat(prev, incoming.chatId, incoming.message),
						);
					}

					await deleteNotification(credentials, notification.receiptId);
				} catch (err) {
					console.error(err);
					await new Promise((resolve) => setTimeout(resolve, 5000));
				}
			}
		};

		poll();

		return () => {
			isPolling = false;
		};
	}, [credentials]);

	const handleCreateChat = (phone: string) => {
		const id = `${phone}@c.us`;

		if (!chats.some((chat) => chat.id === id)) {
			setChats((prev) => [{ id, phone, historyMessages: [] }, ...prev]);
		}
		setActiveChatId(id);
	};

	const handleSend = async (text: string) => {
		if (!activeChatId) return;

		const { idMessage } = await sendMessage(credentials, activeChatId, text);

		const message: HistoryMessage = {
			id: idMessage,
			text,
			direction: 'outgoing',
			timestamp: Math.floor(Date.now() / 1000),
		};

		setChats((prev) => addMessageToChat(prev, activeChatId, message));
	};

	return (
		<div className='chat-page'>
			<Sidebar
				chats={chats}
				activeChatId={activeChatId}
				onCreateChat={handleCreateChat}
				onSelectChat={setActiveChatId}
			/>
			<main className='chat-page__main'>
				{activeChat ? (
					<ChatWindow chat={activeChat} onSend={handleSend} />
				) : (
					<p className='chat-page__placeholder'>Выберите чат или создайте новый</p>
				)}
			</main>
		</div>
	);
}
