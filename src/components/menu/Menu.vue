<template>
    <div class="menu">
        <GuestMenu v-if="isGuest"></GuestMenu>
        <AuthorizedMenu v-if="!isGuest"
                        :authorised="authorised"
                        :user="user"
                        :avatarUrl="avatarUrl"
                        @logout="$emit('logout')"></AuthorizedMenu>
    </div>
</template>

<script>
    import GuestMenu from "@/components/menu/GuestMenu";
    import AuthorizedMenu from "@/components/menu/AuthorizedMenu";

    export default {
        name: 'Menu',
        components: {
            GuestMenu,
            AuthorizedMenu
        },
        props: {
            user: Object,
            isGuest: Boolean,
            authorised: Boolean,
            avatarUrl: String
        }
    }
</script>
