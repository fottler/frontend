<template>
    <List class="notifications-list"
          :items="notifications"
          v-slot="{index, item}">

        <notification-item :index="index"
                           :item="item"
                           @click="$emit('item-click', item)"></notification-item>
    </List>
</template>

<script>
    import List from "@/components/common/List";
    import NotificationItem from "@/modules/notifications/components/NotificationItem";

    export default {
        name: 'NotificationList',
        components: {NotificationItem, List},
        props: {
            notifications: Array
        }
    }
</script>
