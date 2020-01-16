import ServerRequest from '@/core/ServerRequest'
import Model from "@/core/Model";
import ApiConfig from "@/config/ApiConfig";
import ListConfig from "@/config/ListConfig";
import User from "@/modules/user/models/User";
import Event from "@/modules/event/models/Event";

export default class MyMessages extends Model {
    static default = {
        entity_type: null,
        entity_id: null,
        entity_name: '',
        entity_image: '',
        last_message_text: '',
        last_message_datetime: null,
        unread_message_number: null
    };


    static async getAll(params){
        return await ServerRequest.get(ApiConfig.urls.message.myMessagesGetAll, params);
    }


    static pictureUrl(item){
        if(item.entity_type === ListConfig.messageType.event){
            return Event.smallPictureUrl(item.entity_image);
        }
        else{
            return User.smallAvatarUrl(item.entity_image);
        }
    }

}
