<template>
    <div>
        <div class="top-panel padding-around">
            <menu-switcher></menu-switcher>

            <h2>Запросы в друзья</h2>
        </div>

        <user-list class="friends-list"
                   :users="users"
                   @item-click="userClick"></user-list>
    </div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex'
    import UserList from "@/modules/user/components/UserList";
    import {loadAllRequests} from "@/modules/friends/store/friends.types";
    import MenuSwitcher from "@/components/menu/MenuSwitcher";

    const { mapGetters, mapActions } = createNamespacedHelpers('friends');

    export default {
        name: 'Requests',
        components: {MenuSwitcher, UserList},
        created(){
            this[loadAllRequests]();
        },
        computed: {
            ...mapGetters({users: 'getAllRequests'})
        },
        methods: {
            userClick(id) {
                this.$router.push('/user/'+id);
            },
            ...mapActions([ loadAllRequests ])
        }
    }
</script>
