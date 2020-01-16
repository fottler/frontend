
import Model from "@/core/Model";

export default class UserFilter extends Model {
    static default = {
        text: '',
        city: '',//todo choice
        food_preferences: [],
        drink_preferences: [],
        gender: null
    };

}
