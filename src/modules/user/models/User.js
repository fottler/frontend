import ServerRequest from '@/core/ServerRequest'
import * as yup from "yup";
import Model from "@/core/Model";
import ApiConfig from "@/config/ApiConfig";
import Config from "@/config/Config";
import StringUtil from "@/core/utilities/StringUtil";
import DateUtil from "@/core/utilities/DateUtil";
import ListConfig from "@/config/ListConfig";

export default class User extends Model {
    static friendStatuses = ListConfig.friendStatuses;
    static authStatuses = ListConfig.authStatuses;

    static default = {
        id: null,
        name: '',
        about: '',
        birthday: '',
        gender: null,
        food_preferences: [],
        drink_preferences: [],
        is_subscribed: null,
        avatar: '',
        geolocation: null,
        city: '',
        lat: 0,
        lng: 0,
        auth_status: null,
        friend_status: null,

        // [{id, title}, {id, title}, ...]
        event_requests: [],

        info: {
            friends: 0,
            my_events: 0,
            participate: 0,
            my_requests: 0,

            unread_messages: 0,
            unread_notifications: 0
        }
    };
    static validationRules = {
        edit: {
            name: yup.string().ensure().trim().required(Config.error.isEmpty),
            about: yup.string().ensure().trim().required(Config.error.isEmpty),
            birthday: yup.string().ensure().trim()
                .required(Config.error.isEmpty)
                .test(
                    'birthdayIsValid',
                    'Не корректная дата',
                    function(){
                        return DateUtil.isValid(this.parent.birthday) && DateUtil.isBeforeToday(this.parent.birthday);
                    }),
            gender: yup.number().required(Config.error.isNotChosen),
            food_preferences: yup.array().required(Config.error.isNotChosen),
            drink_preferences: yup.array()
                .required(Config.error.isNotChosen)
                .test(
                    'alcoholRequiresAdulthood',
                    'Алкогольные напитки разрешены только совершеннолетним',
                    function(){
                        return StringUtil.isEmpty(this.parent.birthday)
                            || User.isAdult(this.parent.birthday)
                            || !User.alcoholIsInDrinkPreferences(this.parent.drink_preferences);
                    })
            ,
            avatar: yup.string().ensure().required('Загрузите ваш аватар'),
        },
        login1: {
            phone: yup.string().trim()
                .required(Config.error.isEmpty)
                .length(10, 'Не правильный формат номера телефона')
        },
        login2: {
            code: yup.string().trim()
                .required(Config.error.isEmpty)
                .matches(/^\d{4}$/, 'Код должен содержать 4 цифры')
        }
    };
    static phoneMask = {
        prefix: '+7',
        mask: ' (###) ###-##-##'
    };


    //response must contain request_amount if request parameter "status"=User.friendStatuses.friend
    static async getAll(params){
        return await ServerRequest.get(ApiConfig.urls.user.getAll, params);
    }
    static async getOne(id){
        return await ServerRequest.get(ApiConfig.urls.user.getOne, {id});
    }
    static async getByEvent(event_id){
        return await ServerRequest.get(ApiConfig.urls.user.getByEvent, {event_id});
    }
    static async getInfo(){
        return await ServerRequest.get(ApiConfig.urls.user.getInfo, {});
    }
    static async edit(params){
        return await ServerRequest.post(ApiConfig.urls.user.edit, params);
    }
    static async login1(phone){
        return await ServerRequest.post(ApiConfig.urls.user.login1, {phone});
    }
    static async login2({phone, code}){
        return await ServerRequest.post(ApiConfig.urls.user.login2, {
            phone,
            verifyCode: code
        });
    }
    static async changeFriendStatus(user_id, status){
        return await ServerRequest.post(ApiConfig.urls.user.changeFriendStatus, {user_id, status});
    }


    static avatarFolderUrl(){
        return ApiConfig.baseUrl + ApiConfig.urls.user.pictureFolderUrl;
    }
    static avatarUrl(pictureName, subFolder = 'origin'){
        const subFolderPath = '/'+ (subFolder ? subFolder +'/' : '');

        return User.avatarFolderUrl() + subFolderPath + pictureName;
    }
    static bigAvatarUrl(pictureName){
        return User.avatarUrl(pictureName, 'medium');
    }
    static smallAvatarUrl(pictureName){
        return User.avatarUrl(pictureName, 'small');
    }

    static isGuest(authStatus){
        return !authStatus;
    }
    static profileIsNotFilled(authStatus){
        return ''+authStatus === User.authStatuses.profileIsNotFilled;
    }
    static authorised(authStatus){
        return ''+authStatus === User.authStatuses.authorised;
    }
    static isAdult(birthdayString){
        return DateUtil.getAgeByBirthDate(birthdayString) >= 18;
    }
    static alcoholIsInDrinkPreferences(preferences){
        const drinksArray = Object.values(ListConfig.drinks);

        for (const drink of drinksArray) {
            if(preferences.includes(drink.id) && drink.requiresAdulthood){
                return true;
            }
        }
        return false;
    }
    static preferencesToIdsArray(preferences){
        return preferences.map(item => ''+item.id);
    }
    static formatAfterLoad(user){
        if(user.food_preferences){
            user.food_preferences = User.preferencesToIdsArray(user.food_preferences);
        }
        if(user.drink_preferences){
            user.drink_preferences = User.preferencesToIdsArray(user.drink_preferences);
        }
        if(user.lat){
            user.lat = Number(user.lat);
        }
        if(user.lng){
            user.lng = Number(user.lng);
        }
        return user;
    }
    static formatAllAfterLoad(users){
        return users.map(user => User.formatAfterLoad(user));
    }

}
