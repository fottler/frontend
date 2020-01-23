<template>
    <div>
        <Modal class="event-view"
               :headline="event.title"
               :shown="shown"
               @close="$emit('close')">

            <event-view :event="event"
                        :user="user"
                        @open-map="$emit('open-map')"
                        @open-members="$emit('open-members')"
                        @open-chat="$emit('open-chat')"
                        @apply="_apply"
                        @add-to-favorites="addToFavorites"
                        @remove-from-favorites="removeFromFavorites"></event-view>
        </Modal>

        <Modal class="service-modal"
               v-model="modal.shown">

            <div v-if="modalIs(modal.types.applySuccess)">
                <p>Ваша заявка отправлена!</p>
                <p class="mb-0">Ожидайте подтверждение от создателя события</p>
            </div>

            <div v-else-if="modalIs(modal.types.applyForGuest)">
                <p>Чтобы подать заявку на событие необходимо авторизоваться</p>
                <p class="mb-0">
                    <a href="#"
                       class="button yellow-button"
                       @click.prevent="$router.push('/login/')">Войти</a>
                </p>
            </div>
        </Modal>

        <Sidebar class="right-sidebar w-100"
                 :class="sidebarClass"
                 :headline="sidebarHeadline"
                 :opened="membersIsOpened || mapIsOpened"
                 @close="closeSidebar">

            <event-user-list v-if="membersIsOpened"
                             :owner="owner" 
                             :users="users"
                             :my-id="user.id"></event-user-list>

            <event-map v-else-if="mapIsOpened"
                       :event="event"></event-map>
        </Sidebar>

        <table-sidebar class="right-sidebar w-100"
                       :headline="sidebarHeadline"
                       :opened="chatIsOpened"
                       @close="closeSidebar">

            <event-messages v-if="chatIsOpened"
                            :event="event"></event-messages>
        </table-sidebar>
    </div>
</template>

<script>
    import modalHandler from "@/mixins/modalHandler";
    import Modal from "@/components/common/Modal";
    import EventView from "@/modules/event/components/EventView";
    import { createNamespacedHelpers } from 'vuex'
    import {addToFavorites, apply, loadAll, removeFromFavorites} from "@/store/types";
    import {loadUsers} from "@//modules/event/store/eventUsers/eventUsers.types";
    import Sidebar from "@/components/common/Sidebar";
    import EventUserList from "@/modules/event/containers/EventUserList";
    import EventMessages from "@/modules/event/containers/EventMessages";
    import EventMap from "@/modules/event/components/EventMap";
    import TableSidebar from "@/components/common/TableSidebar";
    import ObjectUtil from "@/core/utilities/ObjectUtil";

    const { mapActions } = createNamespacedHelpers('event');
    const { mapGetters: mapUserGetters, mapActions: mapUserActions } = createNamespacedHelpers('eventUsers');
    const { mapState: mapUserInfoState } = createNamespacedHelpers('user');
    const { mapGetters: mapAuthGetters } = createNamespacedHelpers('auth');
    const { mapActions: mapFavoriteActions } = createNamespacedHelpers('favorite');

    export default {
        name: 'EventViewContainer',
        components: {TableSidebar, EventMap, EventMessages, EventUserList, Sidebar, EventView, Modal},
        mixins: [modalHandler],
        props: {
            event: Object,
            shown: Boolean,
            mapIsOpened: Boolean,
            chatIsOpened: Boolean,
            membersIsOpened: Boolean
        },
        data(){
            return {
                modal: {
                    types: {
                        applySuccess: 1,
                        applyForGuest: 2
                    }
                }
            }
        },
        computed: {
            owner(){
                return this.getOwner(this.event);
            },
            users(){
                return this.getAllWithoutOwner(this.event);
            },
            sidebarHeadline(){
                if(this.chatIsOpened){
                    return 'Чат';
                }
                if(this.membersIsOpened){
                    return 'Список участников';
                }
                if(this.mapIsOpened){
                    return 'Местоположение';
                }
                return '';
            },
            sidebarClass(){
                return this.mapIsOpened ? 'map-sidebar' : '';
            },
            ...mapUserGetters([
                'getAllWithoutOwner',
                'getOwner'
            ]),
            ...mapUserInfoState(['user']),
            ...mapAuthGetters(['isGuest']),
        },
        watch: {
            event: {
                handler: async function(value){
                    ObjectUtil.isNotEmpty(value) && await this[loadUsers](this.event.id);
                },
                immediate: true
            }
        },
        methods: {
            async _apply(id){
                if(this.isGuest){
                    this.showModal(this.modal.types.applyForGuest);
                }
                else if(await this[apply](id)){
                    this.showModal(this.modal.types.applySuccess);
                }
            },
            closeSidebar(){
                this.$emit('close-map');
                this.$emit('close-chat');
                this.$emit('close-members');
            },
            ...mapActions([ apply ]),
            ...mapUserActions({
                loadUsers: loadAll
            }),
            ...mapFavoriteActions([
                addToFavorites,
                removeFromFavorites
            ])
        }
    }
</script>
