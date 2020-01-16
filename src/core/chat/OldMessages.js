import EventMessage from "@/modules/event/models/EventMessage";

export default class OldMessages {
    constructor(requestParams, onLoad) {
        this.pending = false;
        this.oldestMessageId = null;
        this.requestParams = requestParams;
        this.onLoad = onLoad;
    }

    load(onLoad){
        const self = this;

        if(!this.pending){
            this.pending = true;

            //todo pending=false on loading error too
            EventMessage.getOlder(this.requestParams, this.oldestMessageId, (result)=>{
                const messages = result.messages;

                if(messages.length){
                    self.oldestMessageId = messages[0].id;
                }
                self.pending = false;

                self.onLoad(messages);
                onLoad && onLoad(messages);
            });
        }
    }


}

