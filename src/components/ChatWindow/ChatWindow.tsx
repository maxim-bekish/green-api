import { useState, type SubmitEvent } from 'react';
import { formatTime } from '../../lib/formatTime';
import './ChatWindow.scss';

const chat = {
	name: '+79991234587',
	history: [
		{
			id: '0',
			text: 'Привет! Это входящее',
			direction: 'incoming',
			timestamp: 1677721600,
		},
		{
			id: '1',
			text: 'А это исходящее',
			direction: 'outgoing',
			timestamp: 1677721601,
		},
	],
};

export default function ChatWindow() {
	const [newMessage, setNewMessage] = useState('');

	const submit = (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!newMessage.trim()) return;
	};

	return (
		<section className='chat-window'>
			<header className='chat-window__header'>
				<span className='chat-window__avatar'>{chat.name.slice(-2)}</span>
				<span className='chat-window__name'>{chat.name}</span>
			</header>

			<div className='chat-window__messages'>
				{chat.history.length === 0 && (
					<p className='chat-window__empty'>Отправьте первое сообщение</p>
				)}

				{chat.history.map((message) => {
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
				<button className='chat-window__send' type='submit'>
					Отправить
				</button>
			</form>
		</section>
	);
}
