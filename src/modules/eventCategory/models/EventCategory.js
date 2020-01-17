import ServerRequest from '@/core/ServerRequest'
import * as yup from "yup";
import Model from "@/core/Model";
import ApiConfig from "@/config/ApiConfig";
import Config from "@/config/Config";

export default class EventCategory extends Model {
    static default = {
        id: null,
        name: ''
    };
    static validationRules = {
        add: {
            name: yup.string().trim().required(Config.error.isEmpty)
        }
    };


    static async getAll(){
        return await ServerRequest.get(ApiConfig.urls.eventCategory.getAll, {});
    }
    static async add(params){
        return await ServerRequest.post(ApiConfig.urls.eventCategory.add, params);
    }

}
