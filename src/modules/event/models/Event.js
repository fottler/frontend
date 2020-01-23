import ServerRequest from '@/core/ServerRequest'
import * as yup from "yup";
import Model from "@/core/Model";
import ApiConfig from "@/config/ApiConfig";
import VuexFormHelper from "@/core/form/VuexFormHelper";
import {set, setAll} from "@/store/types";
import ListConfig from "@/config/ListConfig";
import ArrayUtil from "@/core/utilities/ArrayUtil";
import Config from "@/config/Config";
import DateUtil from "@/core/utilities/DateUtil";

export default class Event extends Model {
    static statuses = ListConfig.eventStatuses;

    static default = {
        id: null,
        title: '',
        about: '',
        datetime: '',
        address: '',
        lat: 0,
        lng: 0,
        category: [],
        food_preferences: [],
        drink_preferences: [],
        males_number: 0,
        females_number: 0,
        max_males_number: 0,
        max_females_number: 0,
        picture: '',
        is_favorite: null,
        status: null,//status in event: applied a request, member, owner, etc
        owner_id: null
    };
    static validationRules = {
        add: {
            title: yup.string().trim().required(Config.error.isEmpty),
            about: yup.string().trim().max(Config.event.about.maxLength, ''),
            //todo 'Максимальный лимит в '+Config.event.about.maxLength+' символов.'
            //todo .required(Config.error.isEmpty),

            //accept formats 2017-11-12 11:23 | 2017-11-12T11:23
            datetime: yup.string().trim()
                .required(Config.error.isEmpty)
                .matches(/^((\d{4}-\d{2}-\d{2} \d{2}:\d{2}.*)|(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}.*))$/, 'Формат даты должен быть таким: 2017-11-12 11:23')
                .test(
                    'datetimeIsValid',
                    'Не корректная дата или время',
                    function(){
                        return DateUtil.isValid(this.parent.datetime) && DateUtil.isValidForMysql(this.parent.datetime);
                    }),
            address: yup.string().trim().required(Config.error.isEmpty),
            category: yup.array().required(Config.error.isNotChosen),
            food_preferences: yup.array().required(Config.error.isNotChosen),
            drink_preferences: yup.array().required(Config.error.isNotChosen),
            max_males_number: yup.number()
                .required('Выберите количество мужчин')
                .integer('Количество мужчин должно быть числом')
                .moreThan(-1, 'Количество мужчин должно быть больше или равно 0'),
            max_females_number: yup.number()
                .required('Выберите количество женщин')
                .integer('Количество женщин должно быть числом')
                .moreThan(-1, 'Количество женщин должно быть больше или равно 0')
                .test(
                    'maxMalesFemalesCount',
                    'Введите количество участников',
                    function(){
                        return (this.parent.max_males_number + this.parent.max_females_number) > 0;
                    }),
            //there must be default pictures
            //picture: yup.string().required('Загрузите изображение')
        }
    };


    static async getAll(params){
        return await ServerRequest.get(ApiConfig.urls.event.getAll, params);
    }
    static async getOne(id){
        return await ServerRequest.get(ApiConfig.urls.event.getOne, {id});
    }
    static async getFavorite(params){
        return await ServerRequest.get(ApiConfig.urls.event.getFavorite, params);
    }
    static async getMyEvents(params){
        return await ServerRequest.get(ApiConfig.urls.event.getMyEvents, params);
    }
    static async apply(event_id){
        return await ServerRequest.post(ApiConfig.urls.event.apply, {event_id});
    }
    static async add(params){
        return await ServerRequest.post(ApiConfig.urls.event.add, params);
    }
    static async addToFavorites(event_id){
        return await ServerRequest.post(ApiConfig.urls.event.addToFavorites, {event_id});
    }
    static async removeFromFavorites(event_id){
        return await ServerRequest.post(ApiConfig.urls.event.removeFromFavorites, {event_id});
    }
    static async acceptRequest(event_id, user_id){
        return await ServerRequest.post(ApiConfig.urls.event.acceptRequest, {event_id, user_id});
    }
    static async rejectRequest(event_id, user_id){
        return await ServerRequest.post(ApiConfig.urls.event.rejectRequest, {event_id, user_id});
    }


    static async ajaxActionSet({ dispatch }, serverMethod){
        const result = await serverMethod();

        if(VuexFormHelper.isSuccess(result.status)){
            result.event = Event.formatAfterLoad(result.event);
            dispatch(set, result.event);
            return true;
        }
        else{
            //todo add call of the global error handler here
            return false;
        }
    }
    static async ajaxActionSetAll({ dispatch }, serverMethod){
        const result = await serverMethod();

        if(VuexFormHelper.isSuccess(result.status)){
            result.events = Event.formatAllAfterLoad(result.events);
            dispatch(setAll, result.events);
            return true;
        }
        else{
            //todo add call of the global error handler here
            return false;
        }
    }

    static pictureFolderUrl(){
        return ApiConfig.baseUrl + ApiConfig.urls.event.pictureFolderUrl;
    }
    static pictureUrl(pictureName, subFolder = 'origin'){
        const subFolderPath = '/'+ (subFolder ? subFolder +'/' : '');

        return Event.pictureFolderUrl() + subFolderPath + pictureName;
    }
    static bigPictureUrl(pictureName){
        return Event.pictureUrl(pictureName, 'medium');
    }
    static smallPictureUrl(pictureName){
        return Event.pictureUrl(pictureName, 'small');
    }

    static isOwnerOrMember(status){
        return [Event.statuses.confirmed, Event.statuses.owner].includes(''+status);
    }
    static applied(status){
        return ''+status === Event.statuses.applied;
    }

    static foodString(valuesArray){
        return valuesArray ? ArrayUtil.chosenOptionsToString(ListConfig.food, valuesArray) : '';
    }
    static drinksString(valuesArray){
        return valuesArray ? ArrayUtil.chosenOptionsToString(ListConfig.drinks, valuesArray) : '';
    }
    static formatBeforeSave(event){
        return {
            ...event,
            datetime: event.datetime
                .replace('T', ' ')
                .replace(/(\d{2}:\d{2}).*/, '$1')//removing of seconds
        };
    }
    static formatAfterLoad(event){
        if(event.food_preferences){
            event.food_preferences = Event.preferencesToIdsArray(event.food_preferences);
        }
        if(event.drink_preferences){
            event.drink_preferences = Event.preferencesToIdsArray(event.drink_preferences);
        }
        if(event.lat){
            event.lat = Number(event.lat);
        }
        if(event.lng){
            event.lng = Number(event.lng);
        }
        return event;
    }
    static formatAllAfterLoad(events){
        return events.map(event => Event.formatAfterLoad(event));
    }
    static preferencesToIdsArray(preferences){
        return preferences.map(item => ''+item.id);
    }
}
