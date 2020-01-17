<template>
    <div v-if="user">
        <div class="top-panel padding-around">
            <menu-switcher></menu-switcher>
        </div>

        <div class="top-panel">
            <profile-user-requests :user="user"></profile-user-requests>

            <div class="padding-around bb">
                <profile-main :user="user">
                    <a href="#"
                       class="button yellow-button w-auto small-padding mt-10"
                       v-if="isNoFriendAndNoRequest(user.id)"
                       @click.prevent="addFriend">добавить в друзья</a>

                    <a href="#"
                       class="button yellow-button w-auto mt-10"
                       v-if="isFriend(user.id)"
                       @click.prevent="showSidebar">сообщение</a>
                </profile-main>
            </div>

            <div class="carousel-wrapper">
                <profile-statistics v-if="user.info"
                                    :items="user.info"
                                    class="profile-scroller"></profile-statistics>
            </div>
        </div>

        <div class="profile-preferences">
            <profile-preferences v-if="user.food_preferences"
                                 headline="Предпочтения в еде:"
                                 item-class="grey-tag"
                                 :items="food(user.id)"></profile-preferences>

            <profile-preferences v-if="user.drink_preferences"
                                 headline="Предпочтения в напитках:"
                                 item-class="bordered-tag"
                                 :items="drinks(user.id)"></profile-preferences>
        </div>

        <table-sidebar class="right-sidebar w-100"
                       :headline="user.name"
                       v-model="sidebar.shown">
            <user-messages v-if="sidebar.shown"
                           :interlocutor="user"></user-messages>
        </table-sidebar>
    </div>
</template>

<script>
    import ProfilePreferences from "@/modules/user/components/ProfilePreferences";
    import ProfileStatistics from "@/modules/user/components/ProfileStatistics";
    import ProfileMain from "@/modules/user/components/ProfileMain";
    import { createNamespacedHelpers } from 'vuex'
    import {changeUser, load} from "@/store/types";
    import {sendRequest} from "@/modules/friends/store/friends.types";
    import UserMessages from "@/modules/user/containers/UserMessages";
    import sidebarHandler from "@/mixins/sidebarHandler";
    import ProfileUserRequests from "@/modules/user/containers/ProfileUserRequests";
    import MenuSwitcher from "@/components/menu/MenuSwitcher";
    import TableSidebar from "@/components/common/TableSidebar";

    const { mapGetters, mapActions } = createNamespacedHelpers('users');
    const { mapActions: mapFriendsActions } = createNamespacedHelpers('friends');
    const { mapActions: mapProfileEventActions } = createNamespacedHelpers('userProfileEvent');

    export default {
        name: 'User',
        components: {TableSidebar, MenuSwitcher, ProfileUserRequests, UserMessages, ProfileMain, ProfileStatistics, ProfilePreferences},
        mixins: [sidebarHandler],
        computed: {
            user(){
                return this.getByIdWithoutError(this.$route.params.id);
            },
            ...mapGetters(['food', 'drinks', 'isFriend', 'isNoFriendAndNoRequest', 'getByIdWithoutError']),
        },
        watch: {
            $route:{
                handler: async function(){
                    const userId = this.$route.params.id;

                    this.changeUserInProfileEvent(userId);

                    const user = await this[load](userId);

                    if(!user){
                        this.$router.push({name: 'error404'});
                    }
                },
                immediate: true
            }
        },
        methods: {
            ...mapActions([load]),
            ...mapFriendsActions({
                addFriend: sendRequest
            }),
            ...mapProfileEventActions({
                changeUserInProfileEvent: changeUser
            }),
        }
    }
</script>
