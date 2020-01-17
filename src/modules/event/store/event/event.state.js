import Event from "@/modules/event/models/Event";
import EventTest from "@/modules/event/models/EventTest";

const state = {
    events: [],
    cache: {},

    errors: {},
    newEvent: Event.reset(), //todo EventTest.reset(),
};
export default state;