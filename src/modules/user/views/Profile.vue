<template>
    <div>
        <div class="top-panel padding-around">
            <menu-switcher></menu-switcher>

            <h2>Мой профиль</h2>
        </div>

        <div class="top-panel">
            <div class="padding-around bb">
                <profile-main :user="user"
                              :avatarUrl="avatarUrl">

                    <div class="edit-button-wrapper">
                        <a href="#"
                           @click.prevent="editProfile">редактировать</a>
                    </div>
                </profile-main>
            </div>

            <div class="carousel-wrapper">
                <profile-statistics :items="user.info"
                                    class="profile-scroller"></profile-statistics>
            </div>
        </div>

        <div class="profile-preferences">
            <profile-preferences headline="Предпочтения в еде:"
                                 item-class="grey-tag"
                                 :items="food"></profile-preferences>

            <profile-preferences headline="Предпочтения в напитках:"
                                 item-class="bordered-tag"
                                 :items="drinks"></profile-preferences>
        </div>
    </div>
</template>

<script>
    import ProfilePreferences from "@/modules/user/components/ProfilePreferences";
    import ProfileStatistics from "@/modules/user/components/ProfileStatistics";
    import ProfileMain from "@/modules/user/components/ProfileMain";
    import { createNamespacedHelpers } from 'vuex'
    import MenuSwitcher from "@/components/menu/MenuSwitcher";

    const { mapState, mapGetters } = createNamespacedHelpers('user');

    export default {
        name: 'Profile',
        components: {MenuSwitcher, ProfileMain, ProfileStatistics, ProfilePreferences},
        computed: {
            ...mapGetters(['food', 'drinks', 'avatarUrl']),
            ...mapState(['user'])
        },
        methods: {
            editProfile() {
                this.$router.push('/profile/edit');
            }
        }
    }
</script>
