import Config from "@/config/Config";
import Constants from "@/core/Constants";

// all: {newMessage: {...}, messages: [...]}
const state = {
    all: {},
    currentId: null,
    lastLoadDirection: Constants.TOP,

    oldIsLoading: false,

    lastRequestId: 0,
    timerId: null,
    interval: Config.chat.interval
};
export default state;