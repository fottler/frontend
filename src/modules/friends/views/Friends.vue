<template>
    <div>
        <div class="top-panel">
            <div class="padding-around bb">
                <menu-switcher></menu-switcher>

                <h2>Друзья</h2>
            </div>

            <div class="padding-around">

                <a href="#"
                   class="black d-block"
                   @click.prevent="requestsClick">

                    <table class="w-100">
                        <tr>
                            <td>Запросы в друзья</td>
                            <td class="right font-weight-bold">{{requestAmount}}</td>
                        </tr>
                    </table>
                </a>

            </div>
        </div>

        <user-list class="friends-list"
                   :users="users"
                   @item-click="userClick"></user-list>

        <a href="#"
           class="button yellow-button fixed-add-button"
           @click.prevent="showSidebar">добавить друзей</a>

        <Sidebar class="right-sidebar w-100 add-friend-sidebar"
                 headline="Добавить друга"
                 v-model="sidebar.shown">
            <user-search v-if="sidebar.shown"></user-search>
        </Sidebar>
    </div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex'
    import {loadAll} from "@/store/types";
    import UserList from "@/modules/user/components/UserList";
    import Sidebar from "@/components/common/Sidebar";
    import UserSearch from "@/modules/user/containers/UserSearch";
    import sidebarHandler from "@/mixins/sidebarHandler";
    import MenuSwitcher from "@/components/menu/MenuSwitcher";

    const { mapState, mapGetters, mapActions } = createNamespacedHelpers('friends');

    export default {
        name: 'Friends',
        components: {MenuSwitcher, UserSearch, Sidebar, UserList},
        mixins: [sidebarHandler],
        created(){
            this.loadAll();
        },
        computed: {
            ...mapGetters({users: 'getAll'}),
            ...mapState(['requestAmount'])
        },
        methods: {
            requestsClick() {
                this.$router.push('/friends/requests');
            },
            userClick(id) {
                this.$router.push('/user/'+id);
            },
            ...mapActions([ loadAll ])
        }
    }
</script>
