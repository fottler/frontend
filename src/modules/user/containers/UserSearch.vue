<template>
    <div>
        <a href="#"
           class="filter-button"
           @click.prevent="showSidebar"></a>

        <Sidebar class="right-sidebar w-100"
                 headline="Фильтр"
                 v-model="sidebar.shown">
            <user-filter-container @hide-filter="hideSidebar"></user-filter-container>
        </Sidebar>

        <user-list class="friends-list"
                   :users="users"
                   @item-click="userClick"></user-list>
    </div>
</template>

<script>
    import sidebarHandler from "@/mixins/sidebarHandler";
    import { createNamespacedHelpers } from 'vuex'
    import {loadAll} from "@/store/types";
    import Sidebar from "@/components/common/Sidebar";
    import UserFilterContainer from "@/modules/user/containers/UserFilterContainer";
    import UserList from "@/modules/user/components/UserList";

    const { mapGetters, mapActions } = createNamespacedHelpers('userSearch');
    const { mapGetters: mapUserInfoGetters } = createNamespacedHelpers('user');

    export default {
        name: 'UserSearch',
        components: {UserList, UserFilterContainer, Sidebar},
        mixins: [sidebarHandler],
        computed: {
            ...mapGetters({users: 'getAll'}),
            ...mapUserInfoGetters(['isMyId']),
        },
        created(){
            this.loadAll();
        },
        methods: {
            userClick(id) {
                if(this.isMyId(id)){
                    this.$router.push('/profile');
                }
                else{
                    this.$router.push('/user/'+id);
                }
            },
            ...mapActions([ loadAll ])
        }
    }
</script>
