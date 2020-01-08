# api

## События

### Получить все события.
```
GET /api/event/getAll
```
Параметры: см. Parameters для получения всех событий

Ответ:
```js
{
    "status": "success",
    "events": [
        массив объектов <Событие>
    ]
}
```

### Получить одно событие.
```
GET /api/event/getOne
```
Параметры:
```js
        id: 1 // id события
```
Ответ:
```js
{
    "status": "success",
    "event": объект <Событие>
}
```

### Получить все события в избранном.
```
GET /api/event/getFavorite
```
Параметры: см. Parameters для получения всех событий

Ответ:
```js
{
    "status": "success",
    "events": [
        массив объектов <Событие>
    ]
}
```

### Получить мои события. (в которых я участвую, а также которые создал)
```
GET /api/event/getMyEvents
```
Параметры: см. Parameters для получения всех событий

Ответ:
```js
{
    "status": "success",
    "events": [
        массив объектов <Событие>
    ]
}
```

### Подать заявку на участие в событии
```
POST /api/event/apply
```
Параметры: 
```js
    event_id: 1 // id события
```
Ответ:
```js
{
    "status": "success",
    "event": объект <Событие>
}
```

### Создать событие
```
POST /api/event/add
```
Параметры: 
```js
    // все параметры описаны в entities событие
    title: "название события",
    about: "о событии",
    datetime: "2012-12-02 22:13",
    address: "полный адрес события",
    lat: 0,
    lng: 0,
    category: [1,2,3],
    food_preferences: [1,2,3],
    drink_preferences: [1,2,3],
    males_number: 1
    females_number: 1
    picture: "picture.png"
```
Ответ:
```js
{
    "status": "success",
    "event": объект <Событие>
}
```

### Добавить событие в избранное
```
POST /api/event/addToFavorites
```
Параметры: 
```js
    event_id: 1 // id события
```
Ответ:
```js
{
    "status": "success",
    "event": объект <Событие>
}
```

### Убрать событие из избранного
```
POST /api/event/removeFromFavorites
```
Параметры: 
```js
    event_id: 1 // id события
```
Ответ:
```js
{
    "status": "success",
    "event": объект <Событие>
}
```

### Одобрить запрос юзера на участие в моём событии
```
POST /api/event/acceptRequest
```
Параметры: 
```js
    event_id: 1, // id события
    user_id: 1 // id юзера
```
Ответ:
```js
{
    "status": "success"
}
```

### Отклонить запрос юзера на участие в моём событии
```
POST /api/event/rejectRequest
```
Параметры: 
```js
    event_id: 1, // id события
    user_id: 1 // id юзера
```
Ответ:
```js
{
    "status": "success"
}
```

## Юзер

### Получить всех юзеров
```
GET /api/user/getAll
```
Параметры: 
```js
    status: 1, // 0 - мы не друзья, 1 - отправил мне запрос на дружбу, 2 - я отправил ему запрос, 3 - мы друзья
    text: "поисковый запрос",
    food_preferences: [1,2,3] // см. enities юзер
    drink_preferences: [1,2,3] // см. enities юзер
    gender: 1 // см. enities юзер
```
Ответ:
```js
{
    "status": "success",
    "users": [
        массив объектов <Юзер>
    ],
    // возвращать, если параметр status="3"
    "request_amount": 1 // кол-во запросов ко мне в друзья
}
```

### Получить одного юзера
```
GET /api/user/getOne
```
Параметры: 
```js
    id: 1 // id юзера
```
Ответ:
```js
{
    "status": "success",
    "user": объект <Юзер>
}
```

### Получить всех юзеров, участвующих в событии
```
GET /api/user/getByEvent
```
Параметры: 
```js
    event_id: 1 // id события
```
Ответ:
```js
{
    "status": "success",
    "users": [
        массив объектов <Юзер>
    ]
}
```

### Получить юзера приложения
```
GET /api/user/getInfo
```
Параметры: отсутствуют
Ответ:
```js
{
    "status": "success",
    "user": объект <Юзер>
}
```

### Редактировать юзера
```
POST /api/user/edit
```
Параметры: 
```js
    // все параметры описаны в entities юзер
    name: "имя юзера"
    birthday: "2012-12-02",
    gender: 1
    geolocation: true
    food_preferences: [1,2,3]
    drink_preferences: [1,2,3]
    about: "текст о юзере"
    is_subscribed: true
    avatar: "picture.jpg"
    city: "Москва"
```
Ответ:
```js
{
    "status": "success",
    "user": объект <Юзер>
}
```

### Получить sms код для аутентификации (вход/регистрация) 
```
POST /api/user/login1
```
Параметры:
```js
    phone: 9998887766 // номер телефона (без +7)
```
Ответ:
```js
{
    "status": "success",
    "code": 1234 // 4-значный sms код
}
```

### Получить токен для аутентификации (вход/регистрация) 
```
POST /api/user/login2
```
Параметры:
```js
    phone: 9998887766, // номер телефона (без +7)
    verifyCode: 1234, // 4-значный sms код
```
Ответ:
```js
{
    "status": "success",
    "access_token": "...",
    "refresh_token": "...",
    "user": объект <Юзер> // юзер приложения
}
```

### Изменить статус моего друга
```
POST /api/user/changeFriendStatus
```
Параметры:
```js
    user_id: 1, // id юзера/друга
    status: 1 // 0 - мы не друзья, 2 - я отправил ему запрос на дружбу, 3 - мы друзья
```
Ответ:
```js
{
    "status": "success",
    "user": объект <Юзер> // юзер/друг
}
```











