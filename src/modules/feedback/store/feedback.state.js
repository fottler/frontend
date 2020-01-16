import Feedback from "@/modules/feedback/models/Feedback";

const state = {
    errors: {},
    newFeedback: Feedback.reset(),
};
export default state;