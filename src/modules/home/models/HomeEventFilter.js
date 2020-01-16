
import Model from "@/core/Model";

export default class HomeEventFilter extends Model {
    static default = {
        order: null,
        category: [],
        food_preferences: [],
        drink_preferences: [],
        date: null,
        gender: null,
        text: '',
        lat: null,
        lng: null
    };

}
