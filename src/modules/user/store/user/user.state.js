import User from "@/modules/user/models/User";

const state = {
    errors: {},
    user: User.reset(),
    editableUser: User.reset()
};
export default state;