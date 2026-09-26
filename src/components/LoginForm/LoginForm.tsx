import { useState, type FormEvent } from 'react';
import './LoginForm.scss';
import type { Credentials } from '../../types';
interface LoginFormProps {
	onLogin: (credentials: Credentials) => Promise<void>;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
	const [idInstance, setIdInstance] = useState<string>('');
	const [apiTokenInstance, setApiTokenInstance] = useState<string>('');
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const isValid = !!idInstance.trim() && !!apiTokenInstance.trim();

	const submit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!isValid) return;
		setError(null);
		setIsLoading(true);

		try {
			await onLogin({
				idInstance: idInstance.trim(),
				apiTokenInstance: apiTokenInstance.trim(),
			});
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='login'>
			<div className='login__card'>
				<div className='login__header'>
					<h1 className='login__title'>Вход</h1>
					<p className='login__subtitle'>Введите данные инстанса GREEN-API</p>
				</div>
				<form onSubmit={submit} className='login__form'>
					<div className='login__fields'>
						<label className='login__field'>
							<span className='login__label'>idInstance</span>
							<input
								readOnly={isLoading}
								value={idInstance}
								onChange={(e) => setIdInstance(e.target.value)}
								className='login__input'
								type='text'
							/>
						</label>
						<label className='login__field'>
							<span className='login__label'>apiTokenInstance</span>
							<input
								type='password'
								readOnly={isLoading}
								value={apiTokenInstance}
								onChange={(e) => setApiTokenInstance(e.target.value)}
								className='login__input'
							/>
						</label>
					</div>
					{error && <p className='login__error'>{error}</p>}

					<button
						disabled={!isValid || isLoading}
						className='login__button'
						type='submit'>
						{isLoading ? 'Загрузка...' : 'Войти'}
					</button>
				</form>
			</div>
		</div>
	);
}
