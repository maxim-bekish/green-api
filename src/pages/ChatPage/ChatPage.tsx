import { useEffect, useState } from 'react';
import ChatWindow from '../../components/ChatWindow/ChatWindow';
import Sidebar from '../../components/Sidebar/Sidebar';
import type { Chat } from '../../types';
import './ChatPage.scss';

export default function ChatPage() {
	const [chats, setChats] = useState<Chat[]>(() => {
		const saved = localStorage.getItem('chats');
		return saved ? JSON.parse(saved) : [];
	});
	useEffect(() => {
		localStorage.setItem('chats', JSON.stringify(chats));
	}, [chats]);

	const handleCreateChat = (phone: string) => {
		const id = `${phone}@c.us`;
		if (chats.some((chat) => chat.id === id)) return;

		setChats((prev) => [{ id, phone, messages: [] }, ...prev]);
	};
	return (
		<div className='chat-page'>
			<Sidebar chats={chats} onCreateChat={handleCreateChat} />
			<main className='chat-page__main'>
				{/* <p className='chat-page__placeholder'>Выберите чат или создайте новый</p> */}
				<ChatWindow />
			</main>
		</div>
	);
}
