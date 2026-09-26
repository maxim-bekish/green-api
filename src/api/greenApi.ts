import type { Credentials } from '../types';

interface StateInstanceResponse {
	stateInstance: string;
}
interface SendMessageResponse {
	idMessage: string;
}

const buildUrl = (credentials: Credentials, method: string) => {
	const { idInstance, apiTokenInstance } = credentials;
	const host = idInstance.slice(0, 4);

	return `https://${host}.api.green-api.com/waInstance${idInstance}/${method}/${apiTokenInstance}`;
};

const checkResponse = (response: Response) => {
	if (response.status === 401) {
		throw new Error('Неверный idInstance или apiTokenInstance');
	}
	if (!response.ok) {
		throw new Error(`Ошибка сервера: ${response.status}`);
	}
};

export const getStateInstance = async (
	credentials: Credentials,
): Promise<StateInstanceResponse> => {
	const response = await fetch(buildUrl(credentials, 'getStateInstance'));
	checkResponse(response);

	return response.json();
};

export const sendMessage = async (
	credentials: Credentials,
	chatId: string,
	message: string,
): Promise<SendMessageResponse> => {
	const response = await fetch(buildUrl(credentials, 'sendMessage'), {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ chatId, message }),
	});
	checkResponse(response);

	return response.json();
};
