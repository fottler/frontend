import Event from "@/modules/event/models/Event";
import EventTest from "@/modules/event/models/EventTest";

const state = {
    events: [],
    cache: {},

    errors: {},
    newEvent: EventTest.reset(), //todo Event.reset(),
};
export default state;