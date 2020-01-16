import UserFilter from "@/modules/user/models/UserFilter";

const state = {
    filter: UserFilter.reset(),
    editableFilter: UserFilter.reset()
};
export default state;