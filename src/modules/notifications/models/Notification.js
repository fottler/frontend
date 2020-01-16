import ServerRequest from '@/core/ServerRequest'
import Model from "@/core/Model";
import ApiConfig from "@/config/ApiConfig";

export default class Notification extends Model {
    static default = {
        id: null,
        type: null,
        user_id: null,
        user_name: '',
        event_id: null,
        event_name: '',
        is_read: null
    };


    static async getAll(params){
        return await ServerRequest.get(ApiConfig.urls.notification.getAll, params);
    }

}
