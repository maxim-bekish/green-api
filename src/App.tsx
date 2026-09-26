import { useState } from 'react';
import { getStateInstance } from './api/greenApi';
import './App.scss';
import LoginForm from './components/LoginForm/LoginForm';
import ChatPage from './pages/ChatPage/ChatPage';
import type { Credentials } from './types';

function App() {
	const [credentials, setCredentials] = useState<Credentials | null>(() => {
		const saved = localStorage.getItem('credentials');
		return saved ? JSON.parse(saved) : null;
	});

	const handleLogin = async (data: Credentials) => {
		const { stateInstance } = await getStateInstance(data);
		if (stateInstance !== 'authorized') {
			throw new Error(`Инстанс не авторизован (статус: ${stateInstance})`);
		}
		setCredentials(data);
		localStorage.setItem('credentials', JSON.stringify(data));
	};

	if (!credentials) {
		return <LoginForm onLogin={handleLogin} />;
	}

	return <ChatPage />;
}

export default App;
