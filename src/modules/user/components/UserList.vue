<template>
    <div>
        <List item-class="list-row bb"
              :items="users"
              v-slot="{index, item}">

            <user-item :index="index"
                       :item="item"
                       @click="$emit('item-click', item.id)"></user-item>
        </List>
    </div>
</template>

<script>
    import List from "@/components/common/List";
    import UserItem from "@/modules/user/components/UserItem";

    export default {
        name: 'UserList',
        components: {UserItem, List},
        props: {
            users: Array
        }
    }
</script>
