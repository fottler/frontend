import Model from "@/core/Model";

export default class UserTest extends Model {
    static default = {
        id: null,
        name: 'Моё Имя1',
        about: 'обо↵мне↵текст',
        birthday: '2020-01-14',
        gender: '2',
        food_preferences: ["2", "3", "1"],
        drink_preferences: ["2"],
        is_subscribed: true,
        avatar: 'nYn0JhFUTw.jpg',
        geolocation: true,
        city: 'Старый Оскол',
        lat: 0,
        lng: 0
    };
}
