import Message from "@/modules/message/models/Message";
import ListConfig from "@/config/ListConfig";

export default class EventMessage extends Message {

    static async add(eventId, text){
        return await Message.add(ListConfig.messageType.event, eventId, text);
    }
    static async getOlder(eventId, messageId){
        return await Message.getOlder(ListConfig.messageType.event, eventId, messageId);
    }
    static async getNewer(eventId, messageId){
        return await Message.getNewer(ListConfig.messageType.event, eventId, messageId);
    }

}
