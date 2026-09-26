import { useState } from 'react';
import './App.scss';
import LoginForm from './components/LoginForm/LoginForm';
import type { Credentials } from './types';
import { getStateInstance } from './api/greenApi';

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

	return <div>Чат</div>;
}

export default App;
