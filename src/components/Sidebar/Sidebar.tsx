import { useState, type SubmitEvent } from 'react';
import type { Chat } from '../../types';
import './Sidebar.scss';
import { formatTime } from '../../lib/formatTime';

interface SidebarProps {
	chats: Chat[];
	activeChatId: string | null;
	onCreateChat: (phone: string) => void;
	onSelectChat: (chatId: string) => void;
}

export default function Sidebar({ chats, onCreateChat, activeChatId, onSelectChat }: SidebarProps) {
	const [phone, setPhone] = useState('');

	const submit = (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		const digits = phone.replace(/\D/g, '');
		if (!digits) return;
		onCreateChat(digits);

		setPhone('');
	};

	return (
		<aside className='sidebar'>
			<header className='sidebar__header'>
				<h1 className='sidebar__title'>Чаты</h1>
				<button className='sidebar__logout' type='button'>
					Выйти
				</button>
			</header>

			<form className='sidebar__new-chat' onSubmit={submit}>
				<input
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
					className='sidebar__input'
					type='text'
					placeholder='79991234567'
				/>
				<button className='sidebar__add' type='submit' aria-label='Создать чат'>
					+
				</button>
			</form>
			{chats.length === 0 && (
				<div className='sidebar__empty'>
					<p className='sidebar__empty-title'>Нет чатов</p>
					<p className='sidebar__empty-text'>
						Чтобы начать переписку, введите номер и нажмите «+»
					</p>
				</div>
			)}
			{chats.length > 0 && (
				<ul className='sidebar__list'>
					{chats.map((chat) => {
						const lastMessage = chat.historyMessages.at(-1);
						const isActive = chat.id === activeChatId;

						return (
							<li key={chat.id}>
								<button
									className={
										isActive
											? 'sidebar__chat sidebar__chat--active'
											: 'sidebar__chat'
									}
									type='button'
									onClick={() => onSelectChat(chat.id)}>
									<span className='sidebar__avatar'>{chat.phone.slice(-2)}</span>
									<span className='sidebar__body'>
										<span className='sidebar__row'>
											<span className='sidebar__name'>{chat.phone}</span>
											<span className='sidebar__time'>
												{lastMessage
													? formatTime(lastMessage.timestamp)
													: ''}
											</span>
										</span>
										<span className='sidebar__preview'>
											{lastMessage ? lastMessage.text : 'Чат пустой'}
										</span>
									</span>
								</button>
							</li>
						);
					})}
				</ul>
			)}
		</aside>
	);
}
