# Green API Chat

Простой веб-чат для отправки и получения текстовых сообщений в Telegram через сервис [GREEN-API](https://green-api.com). Тестовое задание на позицию Frontend-разработчик React.

Демо: ?

Видео работы: ?

## Как пользоваться

1. Войти, указав `idInstance` и `apiTokenInstance` из личного кабинета GREEN-API. При входе данные проверяются методом `getStateInstance`, инстанс должен быть в статусе `authorized`.
2. Ввести номер получателя в международном формате, только цифры и нажать «+».
3. Написать сообщение. Ответ собеседника появится в чате автоматически.


## Запуск локально

Нужен Node.js 20+.

```bash
git clone https://github.com/maxim-bekish/green-api.git
cd green-api
npm install
npm run dev
```

Приложение откроется на http://localhost:5173.

Сборка: `npm run build`.

## Как устроено

- Отправка — метод `sendMessage`.
- Получение — методы `receiveNotification` и `deleteNotification`: приложение в цикле забирает уведомление из очереди, если это входящее текстовое сообщение от одного из открытых чатов — добавляет его в чат, затем удаляет уведомление из очереди.
- Чаты и данные входа хранятся в `localStorage`, поэтому переписка сохраняется после перезагрузки страницы.

Стек: React 19, TypeScript, Vite, SCSS (БЭМ).

```
src/
  api/         запросы к GREEN-API
  components/  LoginForm, Sidebar, ChatWindow
  pages/       ChatPage — состояние чатов, отправка и получение
  lib/         вспомогательные функции
  types/       типы
  styles/      SCSS-переменные
```
