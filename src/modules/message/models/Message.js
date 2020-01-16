import ServerRequest from '@/core/ServerRequest'
import Model from "@/core/Model";
import ApiConfig from "@/config/ApiConfig";

export default class Message extends Model {
    static localId = 1000000000;
    static default = {
        id: null,
        text: '',
        user_id: '',
        datetime: null,
        is_local: null
    };


    static async add(type, entityId, text){
        return await ServerRequest.get(ApiConfig.urls.message.add, {
            type,
            entity_id: entityId,
            text
        });
    }
    /** get messages older than message_id.
     *  message_id might be null */
    static async getOlder(type, entityId, message_id){
        return await ServerRequest.get(ApiConfig.urls.message.getOlder, {
            type,
            entity_id: entityId,
            message_id
        });
    }
    /** get messages newer than message_id */
    static async getNewer(type, entityId, message_id){
        return await ServerRequest.get(ApiConfig.urls.message.getNewer, {
            type,
            entity_id: entityId,
            message_id
        });
    }


    static reset(){
        return {
            ...Message.default,
            id: Message.localId++
        };
    }

}
