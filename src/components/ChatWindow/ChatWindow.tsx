import { useEffect, useRef, useState, type SubmitEvent } from 'react';
import { formatTime } from '../../lib/formatTime';
import type { Chat } from '../../types';
import './ChatWindow.scss';

interface ChatWindowProps {
	chat: Chat;
	onSend: (text: string) => Promise<void>;
}

export default function ChatWindow({ chat, onSend }: ChatWindowProps) {
	const [newMessage, setNewMessage] = useState('');
	const messagesRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const messagesElement = messagesRef.current;
		if (!messagesElement) return;

		messagesElement.scrollTop = messagesElement.scrollHeight;
	}, [chat.historyMessages]);

	const submit = async (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();

		const text = newMessage.trim();
		if (!text) return;

		try {
			await onSend(text);
			setNewMessage('');
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<section className='chat-window'>
			<header className='chat-window__header'>
				<span className='chat-window__avatar'>{chat.phone.slice(-2)}</span>
				<span className='chat-window__name'>{chat.phone}</span>
			</header>

			<div className='chat-window__messages' ref={messagesRef}>
				{chat.historyMessages.length === 0 && (
					<p className='chat-window__empty'>Отправьте первое сообщение</p>
				)}

				{chat.historyMessages.map((message) => {
					return (
						<div
							key={message.id}
							className={`chat-window__message chat-window__message--${message.direction}`}>
							<span className='chat-window__text'>{message.text}</span>
							<span className='chat-window__time'>
								{formatTime(message.timestamp)}
							</span>
						</div>
					);
				})}
			</div>

			<form className='chat-window__form' onSubmit={submit}>
				<input
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					className='chat-window__input'
					type='text'
					placeholder='Сообщение'
				/>
				<button className='chat-window__send' type='submit' disabled={!newMessage.trim()}>
					Отправить
				</button>
			</form>
		</section>
	);
}
