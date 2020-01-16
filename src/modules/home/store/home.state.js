import HomeEventFilter from "@/modules/home/models/HomeEventFilter";

const state = {
    mapShown: null,
    filter: HomeEventFilter.reset(),
    editableFilter: HomeEventFilter.reset()
};
export default state;