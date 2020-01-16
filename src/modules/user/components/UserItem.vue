<template>
    <div @click.prevent="$emit('click')">
        <img :src="avatarUrl"
             :alt="item.name"
             class="avatar">

        <div>{{item.name}}</div>
    </div>
</template>

<script>
    import User from "@/modules/user/models/User";

    export default {
        name: 'UserItem',
        props: {
            item: Object
        },
        computed: {
            avatarUrl(){
                return User.smallAvatarUrl(this.item.avatar);
            }
        }
    }
</script>
