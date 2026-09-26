export type MessageDirection = 'outgoing' | 'incoming';

export interface Credentials {
	idInstance: string;
	apiTokenInstance: string;
}
export interface Chat {
	id: string;
	phone: string;
	messages: Message[];
}
export interface Message {
	id: string;
	text: string;
	direction: MessageDirection;
	timestamp: number;
}
