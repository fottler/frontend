<template>
    <div>
        <message-item-mine v-if="isOwner"
                           :message="message"
                           :time="time"></message-item-mine>

        <message-item-their v-else
                            :message="message"
                            :time="time"
                            :user="user"
                            :avatarUrl="smallAvatarUrl(user.id)"></message-item-their>
    </div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex'
    import MessageItemMine from "@/modules/message/components/MessageItemMine";
    import MessageItemTheir from "@/modules/message/components/MessageItemTheir";
    import DateUtil from "@/core/utilities/DateUtil";

    const { mapGetters } = createNamespacedHelpers('users');

    export default {
        name: 'MessageItem',
        components: {MessageItemTheir, MessageItemMine},
        props: {
            message: Object,
            isOwner: Boolean
        },
        computed: {
            user(){
                return this.getById(this.message.user_id);
            },
            time(){
                return DateUtil.time(this.message.datetime);
            },
            ...mapGetters(['getById', 'smallAvatarUrl'])
        }
    }
</script>
