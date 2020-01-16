<template>
    <div>
        <loadable-event-view-container :event-id="openedEventId"
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
                                        @close-members="closeMembers"></loadable-event-view-container>
    </div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex'
    import {close} from "@/store/types";
    import {
        closeChat,
        closeMap,
        closeMembers,
        openChat,
        openMap,
        openMembers
    } from "@/modules/event/store/event/event.types";
    import LoadableEventViewContainer from "@/modules/event/containers/LoadableEventViewContainer";

    const { mapGetters, mapActions } = createNamespacedHelpers('userProfileEvent');

    export default {
        name: 'ProfileEventView',
        components: {LoadableEventViewContainer},
        computed: {
            ...mapGetters([
                'isAnyEventOpened',
                'openedEventId',
                'mapIsOpened',
                'chatIsOpened',
                'membersIsOpened'
            ]),
        },
        methods: {
            ...mapActions([
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
