import type { Credentials } from '../types';

interface StateInstanceResponse {
	stateInstance: string;
}

const buildUrl = (credentials: Credentials, method: string) => {
	const { idInstance, apiTokenInstance } = credentials;
	const host = idInstance.slice(0, 4);

	return `https://${host}.api.green-api.com/waInstance${idInstance}/${method}/${apiTokenInstance}`;
};
export const getStateInstance = async (
	credentials: Credentials,
): Promise<StateInstanceResponse> => {
	const response = await fetch(buildUrl(credentials, 'getStateInstance'));
	if (response.status === 401) {
		throw new Error('Неверный idInstance или apiTokenInstance');
	}
	if (!response.ok) {
		throw new Error(`Ошибка сервера: ${response.status}`);
	}

	return response.json();
};
