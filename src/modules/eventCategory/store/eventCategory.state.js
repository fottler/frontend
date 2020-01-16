import EventCategory from "@/modules/eventCategory/models/EventCategory";

const state = {
    categories: [],
    errors: {},
    newCategory: EventCategory.reset()
};
export default state;