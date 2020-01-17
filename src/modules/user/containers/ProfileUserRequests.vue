<template>
    <div>
        <friend-request v-if="sentFriendRequestToMe(user.id)"
                        :name="user.name"
                        @accept="acceptFriend(user)"
                        @reject="rejectFriend(user)"></friend-request>

        <event-request v-if="eventRequest"
                       :name="user.name"
                       :event-title="eventRequest.title"

                       @open-event="openEvent(eventRequest.id)"
                       @accept="_acceptEventRequest(eventRequest.id)"
                       @reject="_rejectEventRequest(eventRequest.id)"></event-request>

        <profile-event-view></profile-event-view>
    </div>
</template>

<script>
    import FriendRequest from "@/modules/user/components/FriendRequest";
    import EventRequest from "@/modules/user/components/EventRequest";
    import { createNamespacedHelpers } from 'vuex'
    import {acceptRequest, rejectRequest} from "@/modules/friends/store/friends.types";
    import {acceptEventRequest, rejectEventRequest} from "@/modules/user/store/users/users.types";
    import ProfileEventView from "@/modules/user/containers/ProfileEventView";
    import {open} from "@/store/types";

    const { mapGetters, mapActions } = createNamespacedHelpers('users');
    const { mapActions: mapFriendsActions } = createNamespacedHelpers('friends');
    const { mapActions: mapEventActions } = createNamespacedHelpers('userProfileEvent');

    export default {
        name: 'ProfileUserRequests',
        components: {ProfileEventView, EventRequest, FriendRequest},
        props: {
            user: Object
        },
        computed: {
            eventRequest(){
                return this.user.event_requests
                    && this.user.event_requests.length
                    && this.user.event_requests[0];
            },
            ...mapGetters(['sentFriendRequestToMe']),
        },
        methods: {
            async _acceptEventRequest(eventId){
                await this[acceptEventRequest]({
                    userId: this.user.id,
                    eventId
                });
            },
            async _rejectEventRequest(eventId){
                await this[rejectEventRequest]({
                    userId: this.user.id,
                    eventId
                });
            },
            ...mapFriendsActions({
                acceptFriend: acceptRequest,
                rejectFriend: rejectRequest
            }),
            ...mapEventActions({
                openEvent: open
            }),
            ...mapActions([
                acceptEventRequest,
                rejectEventRequest
            ])
        }
    }
</script>
