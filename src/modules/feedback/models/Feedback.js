
import ServerRequest from '@/core/ServerRequest'
import * as yup from "yup";
import Model from "@/core/Model";
import ApiConfig from "@/config/ApiConfig";
import Config from "@/config/Config";

export default class Feedback extends Model {
    static default = {
        text: ''
    };
    static validationRules = {
        add: {
            text: yup.string().trim().required(Config.error.isEmpty)
        }
    };


    static async add(params){
        return await ServerRequest.post(ApiConfig.urls.feedback.add, params);
    }

}
