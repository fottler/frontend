import Message from "@/modules/message/models/Message";
import ListConfig from "@/config/ListConfig";

export default class UserMessage extends Message {

    static async add(userId, text){
        return await Message.add(ListConfig.messageType.user, userId, text);
    }
    static async getOlder(userId, messageId){
        return await Message.getOlder(ListConfig.messageType.user, userId, messageId);
    }
    static async getNewer(userId, messageId){
        return await Message.getNewer(ListConfig.messageType.user, userId, messageId);
    }

}
