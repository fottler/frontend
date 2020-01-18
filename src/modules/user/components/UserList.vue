<template>
    <div>
        <List v-show="users.length"
              item-class="list-row bb"
              :items="users"
              v-slot="{index, item}">

            <user-item :index="index"
                       :item="item"
                       @click="$emit('item-click', item.id)"></user-item>
        </List>

        <div v-show="!users.length"
             class="empty-list">
            {{emptyListContent}}
        </div>
    </div>
</template>

<script>
    import List from "@/components/common/List";
    import UserItem from "@/modules/user/components/UserItem";
    import Config from "@/config/Config";

    export default {
        name: 'UserList',
        components: {UserItem, List},
        props: {
            users: Array,
            emptyListText: String
        },
        computed: {
            emptyListContent(){
                return this.emptyListText || Config.message.userListIsEmpty;
            }
        }
    }
</script>
