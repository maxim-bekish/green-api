import { useState } from 'react';
import { getStateInstance } from './api/greenApi';
import './App.scss';
import LoginForm from './components/LoginForm/LoginForm';
import ChatPage from './pages/ChatPage/ChatPage';
import type { Credentials } from './types';
import { getStorageItem, setStorageItem } from './lib/storage';

function App() {
	const [credentials, setCredentials] = useState<Credentials | null>(() =>
		getStorageItem<Credentials>('credentials'),
	);

	const handleLogin = async (data: Credentials) => {
		const { stateInstance } = await getStateInstance(data);
		if (stateInstance !== 'authorized') {
			throw new Error(`Инстанс не авторизован (статус: ${stateInstance})`);
		}
		setCredentials(data);
		setStorageItem('credentials', data);
	};

	if (!credentials) {
		return <LoginForm onLogin={handleLogin} />;
	}

	return <ChatPage credentials={credentials} />;
}

export default App;
