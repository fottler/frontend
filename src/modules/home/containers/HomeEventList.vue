<template>
    <div>
        <event-list-container :events="events"
                              :empty-list-text="config.message.nothingFound"
                              @item-click="open"></event-list-container>

        <Sidebar class="right-sidebar w-100 map-sidebar home-map-sidebar"
                 headline="На карте"
                 :opened="mapShown"
                 @close="hideMap">
            <event-list-map v-if="mapShown"
                            :events="events"
                            @item-click="open"></event-list-map>
        </Sidebar>

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
    import {open, close, hideMap, showMap} from "@/store/types";
    import {
        closeChat,
        closeMap,
        closeMembers,
        openChat,
        openMap,
        openMembers
    } from "@/modules/event/store/event/event.types";
    import EventListMap from "@/modules/event/components/EventListMap";
    import Sidebar from "@/components/common/Sidebar";
    import Config from "@/config/Config";

    const { mapState, mapGetters, mapActions } = createNamespacedHelpers('home');

    export default {
        name: 'HomeEventList',
        components: {Sidebar, EventListMap, EventViewContainer, EventListContainer},
        computed: {
            config: ()=>Config,
            ...mapState([
                'mapIsOpened',
                'chatIsOpened',
                'membersIsOpened',
                'mapShown'
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
                closeChat,
                showMap,
                hideMap
            ])
        }
    }
</script>
