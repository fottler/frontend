<template>
    <div>
        <event-list-container :events="events"
                              @item-click="open"></event-list-container>

        <event-view-container :event="openedEvent"
                              :shown="isAnyEventOpened"
                              :mapIsOpened="mapIsOpened"
                              :chatIsOpened="chatIsOpened"
                              :membersIsOpened="membersIsOpened"

                              @close="close"
                              @open-map="openMap"
                              @open-members="openMembers"
                              @open-chat="openChat"
                              @close-map="closeMap"
                              @close-chat="closeChat"
                              @close-members="closeMembers"></event-view-container>
    </div>
</template>

<script>
    import EventListContainer from "@/modules/event/containers/EventListContainer";
    import EventViewContainer from "@/modules/event/containers/EventViewContainer";
    import { createNamespacedHelpers } from 'vuex'
    import {open, close} from "@/store/types";
    import {
        closeChat,
        closeMap,
        closeMembers,
        openChat,
        openMap,
        openMembers
    } from "@/modules/event/store/event/event.types";

    const { mapState, mapGetters, mapActions } = createNamespacedHelpers('favorite');

    export default {
        name: 'FavoriteEventList',
        components: {EventViewContainer, EventListContainer},
        computed: {
            ...mapState([
                'mapIsOpened',
                'chatIsOpened',
                'membersIsOpened'
            ]),
            ...mapGetters({
                events: 'getAll'
            }),
            ...mapGetters([
                'isAnyEventOpened',
                'openedEvent'
            ]),
        },
        methods: {
            ...mapActions([
                open,
                close,
                openMap,
                openMembers,
                openChat,
                closeMap,
                closeMembers,
                closeChat
            ])
        }
    }
</script>
