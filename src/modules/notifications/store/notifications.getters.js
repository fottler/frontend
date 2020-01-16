import ListConfig from "@/config/ListConfig";

const getters = {
    isUserType: () => (type) => {
        const
            types = ListConfig.notificationType,
            userTypes = [types.user.accept.id, types.user.request.id, types.event.request.id];

        return userTypes.includes(type);
    },
    isEventType: () => (type) => {
        const
            types = ListConfig.notificationType,
            eventTypes = [types.event.accept.id];

        return eventTypes.includes(type);
    }
};
export default getters;