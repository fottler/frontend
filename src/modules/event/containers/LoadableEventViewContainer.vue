<template>
    <div>
        <event-view-container v-if="event"
                              :event="event"
                              :shown="shown"
                              :mapIsOpened="mapIsOpened"
                              :chatIsOpened="chatIsOpened"
                              :membersIsOpened="membersIsOpened"

                              @close="$emit('close')"
                              @open-map="$emit('open-map')"
                              @open-members="$emit('open-members')"
                              @open-chat="$emit('open-chat')"
                              @close-map="$emit('close-map')"
                              @close-chat="$emit('close-chat')"
                              @close-members="$emit('close-members')"></event-view-container>
    </div>
</template>

<script>
    import EventViewContainer from "@/modules/event/containers/EventViewContainer";
    import { createNamespacedHelpers } from 'vuex'
    import {load} from "@/store/types";

    const { mapGetters, mapActions } = createNamespacedHelpers('event');

    export default {
        name: 'LoadableEventViewContainer',
        components: {EventViewContainer},
        props: {
            eventId: Number,
            shown: Boolean,
            mapIsOpened: Boolean,
            chatIsOpened: Boolean,
            membersIsOpened: Boolean
        },
        computed: {
            event(){
                return this.getByIdWithoutError(this.eventId);
            },
            ...mapGetters(['getByIdWithoutError'])
        },
        watch: {
            eventId: {
                handler: async function(value){
                    value && await this[load](value);
                },
                immediate: true
            }
        },
        methods: {
            ...mapActions([ load ])
        }
    }
</script>
