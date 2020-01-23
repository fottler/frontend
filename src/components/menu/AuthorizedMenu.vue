<template>
    <div>
        <div v-if="authorised"
             class="padding-around bb pb-12">
            <profile-main class="condensed"
                          :user="user"
                          :avatarUrl="avatarUrl">

                <div class="open-button-wrapper">
                    <router-link to="/profile">открыть профиль</router-link>
                </div>
            </profile-main>
        </div>

        <div class="navigation-list">
            <div class="bb">
                <list-row icon="home"
                          icon-width="22"
                          icon-top="6"
                          icon-left="12">
                    <router-link to="/">Главная</router-link>
                </list-row>

                <list-row icon="friend-grey"
                          icon-width="17"
                          icon-top="10">
                    <router-link to="/friends">Друзья</router-link>
                </list-row>

                <list-row icon="event-grey"
                          icon-width="19"
                          icon-top="10"
                          icon-left="13">
                    <router-link to="/my-events">События</router-link>
                </list-row>
<!--//todo

                <list-row icon="message-grey"
                          icon-top="10"
                          :class="user.info.unread_messages>0 ? 'unread' : ''">
                    <router-link to="/my-messages">Сообщения</router-link>
                </list-row>
-->
                <list-row icon="heart-grey"
                          icon-top="10">
                    <router-link to="/favorites">Избранное</router-link>
                </list-row>

<!--//todo

                <list-row icon="bell"
                          icon-top="10"
                          :class="user.info.unread_notifications>0 ? 'unread' : ''">
                    <router-link to="/notifications">Уведомления</router-link>
                </list-row>
-->
                                <list-row icon="support"
                                          icon-top="10">
                                    <router-link to="/feedback">Поддержка</router-link>
                                </list-row>
                            </div>

                            <div class="bb">
                                <list-row icon="plus-grey"
                                          icon-top="10">
                                    <router-link to="/create-event">Добавить событие</router-link>
                                </list-row>
                            </div>

                            <div>
                                <list-row icon="logout"
                                          icon-top="10"
                                          icon-left="16">
                                    <a href="#"
                                       @click.prevent="onLogoutClick">Выйти</a>
                                </list-row>
                            </div>
                        </div>


                        <Modal class="service-modal logout-modal"
                               v-model="modal.shown">

                            <p class="mb-25">Вы уверены что хотите выйти?</p>

                            <table class="w-100">
                                <tr>
                                    <td class="right">
                                        <a href="#"
                                           class="button"
                                           @click.prevent="logout">да</a>
                                    </td>
                                    <td class="left">
                                        <a href="#"
                                           class="button yellow-button"
                                           @click.prevent="hideModal">нет</a>
                                    </td>
                                </tr>
                            </table>
                        </Modal>

                    </div>
                </template>

                <script>
                    import Modal from "@/components/common/Modal";
                    import modalHandler from "@/mixins/modalHandler";
                    import ListRow from "@/components/common/ListRow";
                    import ProfileMain from "@/modules/user/components/ProfileMain";

                    export default {
                        name: 'AuthorizedMenu',
                        components: {ProfileMain, ListRow, Modal},
                        mixins: [modalHandler],
                        props: {
                            authorised: Boolean,
                            user: Object,
                            avatarUrl: String
                        },
                        methods: {
                            onLogoutClick() {
                                this.showModal();
                            },
                            logout(){
                                this.hideModal();
                                this.$emit('logout');
                            }
                        }
                    }
                </script>
