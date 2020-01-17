<template>
    <div class="friends-list">
        <div class="list-row bb headline">
            Организатор
        </div>

        <user-item v-if="owner"
                   class="list-row bb"
                   :item="owner"
                   @click="userClick(owner.id)"></user-item>

        <div class="list-row bb headline">
            Участники
        </div>

        <user-list class="friends-list"
                   :users="users"
                   @item-click="userClick"></user-list>
    </div>
</template>

<script>
    import UserList from "@/modules/user/components/UserList";
    import UserItem from "@/modules/user/components/UserItem";

    export default {
        name: 'EventUserList',
        components: {UserItem, UserList},
        props: {
            owner: Object,
            users: Array,
            myId: Number
        },
        methods: {
            userClick(id) {
                if(this.myId === id){
                    this.$router.push('/profile');
                }
                else{
                    this.$router.push('/user/'+id);
                }
            }
        }
    }
</script>
