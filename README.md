
# Comics Master

Система для управления контентом о комиксах, включающая в себя страницу для пользовотеля, веб-панель администратора, серверную часть на Node.js и мобильное клиентское приложение для Android.


## Технологический стек

* **Backend:** Node.js, Express, MySQL.
* **Frontend:** HTML, CSS, JavaScript.
* **Mobile:** Kotlin, Android SDK, Retrofit.

## Быстрый старт

### 1. Backend и база данных

1. Импортируйте `dump.sql` в вашу базу данных.
2. В файле `server.js` обновите параметры подключения к MySQL:

```javascript
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'YOUR_PASSWORD',
    database: 'comics_db'
});

```


3. Установите зависимости: `npm install express mysql2 cors`
4. Запустите сервер: `node server.js`


## Возможности

* **Для администраторов:** Блочный редактор контента в `admin.html`. Возможность создавать посты, состоящие из текстовых абзацев и изображений.
* **Для пользователей:**
* Веб-версия: полнофункциональный каталог с поиском и фильтрацией.
* Мобильное приложение: просмотр списка событий и детальная информация о комиксах.

---

<img width="1151" height="2560" alt="image" src="https://github.com/user-attachments/assets/04a73e7f-3c43-4faa-a226-12c62de79a9f" />
<img width="1896" height="863" alt="image" src="https://github.com/user-attachments/assets/3c0bd516-5c9b-4815-9efa-33f2b7fdd221" />
<img width="1894" height="806" alt="image" src="https://github.com/user-attachments/assets/f730bf89-8e11-4c28-aec2-95c83f24d930" />
<img width="1894" height="873" alt="image" src="https://github.com/user-attachments/assets/1f91c468-4a37-443a-a52b-35a62867a515" />
<img width="1898" height="874" alt="image" src="https://github.com/user-attachments/assets/f17e3df2-d726-43a8-ae4a-6ddb3174e91b" />
<img width="1896" height="866" alt="image" src="https://github.com/user-attachments/assets/6a487673-47b8-4e6a-8f23-c958aa71a0c7" />






