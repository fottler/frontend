import EventCategory from "@/modules/eventCategory/models/EventCategory";

const state = {
    categories: [],
    cache: {},

    errors: {},
    newCategory: EventCategory.reset()
};
export default state;