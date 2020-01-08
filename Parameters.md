## Распространённые параметры для запросов

### для получения всех событий
```js
        order: "date", // сортировать результаты по: date - дате, distance - расстоянии от lat,lng
        category: [1,2,3], // см. entities событие
        food_preferences: [1,2,3], // см. entities событие
        drink_preferences: [1,2,3], // см. entities событие
        date: "2012-07-22", // дата создания события
        gender: 1, // пол участников события. см. entities юзер
        text: "поисковый запрос",
        lat: 0,
        lng: 0,
        type: "all" // типы событий: all - все, today - сегодня, past - прошедшие, upcoming - будущие, mine - созданные мною
```
