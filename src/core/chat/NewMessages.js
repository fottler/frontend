import EventMessage from "@/modules/event/models/EventMessage";
import Config from "@/config/Config";
import ArrayUtil from "@/core/utilities/ArrayUtil";

export default class NewMessages {
    /**
     * @param requestParams
     * @param onLoad - dont forget to remove all local messages from the message list
     */
    constructor(requestParams, onLoad) {
        this.requestParams = requestParams;
        this.onLoad = onLoad;

        this.newestMessageId = -1;
        this.lastRequestId = 0;
        this.timerId = null;
        this.interval = Config.chat.interval;
    }

    /** dont forget to add this message as a local one to the message list */
    send(messageText){
        const
            self = this,
            requestId = this.newRequestId();

        this.stopLoading();

        EventMessage.add(this.requestParams, messageText, ()=>{
            if(requestId === self.lastRequestId){
                self.load();
            }
        });
    }
    load(){
        const
            self = this,
            requestId = this.newRequestId();

        EventMessage.getNewer(this.requestParams, this.newestMessageId, (result)=>{
            const messages = result.messages;

            if(requestId === self.lastRequestId){
                if(messages.length){
                    self.newestMessageId = ArrayUtil.getLastElement(messages).id;
                    self.onLoad(messages);
                }
                self.timerId = setTimeout(()=>self.load(), self.interval);
            }
        });
    }
    setNewestMessageId(id){
        this.newestMessageId = id;
    }
    newRequestId(){
        return ++this.lastRequestId;
    }
    stopLoading(){
        clearTimeout(this.timerId);
    }

}

