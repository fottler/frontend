<template>
    <div>
        <div class="top-panel">
            <div class="padding-around bb">
                <menu-switcher></menu-switcher>

                <h2>Уведомления</h2>
            </div>

            <div class="carousel-wrapper">
                <scrollable-links-carousel :items="filterList"
                                           :active-item-id="filter.type"
                                           @click="chooseFilterType"></scrollable-links-carousel>
            </div>
        </div>

        <notification-list :notifications="notifications"
                           @item-click="itemClick"></notification-list>

        <notification-event-view></notification-event-view>
    </div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex'
    import {chooseFilterType, loadAll, open} from "@/store/types";
    import ScrollableLinksCarousel from "@/components/ScrollableLinksCarousel";
    import ListConfig from "@/config/ListConfig";
    import NotificationList from "@/modules/notifications/components/NotificationList";
    import MenuSwitcher from "@/components/menu/MenuSwitcher";
    import NotificationEventView from "@/modules/notifications/containers/NotificationEventView";

    const { mapState, mapGetters, mapActions } = createNamespacedHelpers('notifications');

    export default {
        name: 'Notifications',
        components: {NotificationEventView, MenuSwitcher, NotificationList, ScrollableLinksCarousel},
        computed: {
            filterList: ()=>ListConfig.filter.notification,
            ...mapState(['notifications', 'filter']),
            ...mapGetters(['isUserType', 'isEventType'])
        },
        created(){
            this.loadAll();
        },
        methods: {
            itemClick(item){
                if(this.isEventType(item.type)){
                    this['openEvent'](item.event_id);
                }
                else if(this.isUserType(item.type)){
                    this.$router.push('/user/'+item.user_id);
                }
                else{
                    console.log('Error: unknown notification type');
                }
            },
            ...mapActions([
                loadAll,
                chooseFilterType
            ]),
            ...mapActions({
                openEvent: open
            })
        }
    }
</script>
