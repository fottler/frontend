import Model from "@/core/Model";

export default class EventTest extends Model {
    static default = {
        id: null,
        title: 'Новое событие',
        about: 'о новом событии текст',
        datetime: '2020-12-11T14:35',
        address: 'Храм Василия Блаженного, Красная пл., Москва, Россия, 109012',
        lat: 55,
        lng: 37,
        category: ['1', '2','3','4','5'],
        food_preferences: ['2'],
        drink_preferences: ['3'],
        males_number: 2,
        females_number: 3,
        max_males_number: 5,
        max_females_number: 7,
        picture: 'sS9mZKueqy.jpg',
        is_favorite: null,
        status: null,//status in event: applied a request, member, owner, etc
        owner_id: null
    };
}
