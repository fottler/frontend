<template>
    <div>
        <div class="top-panel">
            <div class="padding-around bb">
                <menu-switcher></menu-switcher>

                <h2>Сообщения</h2>
            </div>

            <div class="carousel-wrapper">
                <scrollable-links-carousel :items="filterList"
                                           :active-item-id="filter.type"
                                           @click="chooseFilterType"></scrollable-links-carousel>
            </div>
        </div>

        <my-message-list :messages="messages"
                         @item-click="itemClick"></my-message-list>

        <my-messages-event-view></my-messages-event-view>
    </div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex'
    import {chooseFilterType, loadAll, open} from "@/store/types";
    import ScrollableLinksCarousel from "@/components/ScrollableLinksCarousel";
    import ListConfig from "@/config/ListConfig";
    import MyMessageList from "@/modules/myMessages/components/MyMessageList";
    import MyMessagesEventView from "@/modules/myMessages/containers/MyMessagesEventView";
    import MenuSwitcher from "@/components/menu/MenuSwitcher";

    const { mapState, mapActions } = createNamespacedHelpers('myMessages');

    export default {
        name: 'MyMessages',
        components: {MenuSwitcher, MyMessagesEventView, MyMessageList, ScrollableLinksCarousel},
        computed: {
            filterList: ()=>ListConfig.filter.unread,
            ...mapState(['messages', 'filter'])
        },
        created(){
            this.loadAll();
        },
        methods: {
            itemClick(item){
                if(item.entity_type === ListConfig.messageType.event){
                    this['openEvent'](item.entity_id);
                }
                else if(item.entity_type === ListConfig.messageType.user){
                    this.$router.push('/user/'+item.entity_id);
                }
                else{
                    console.log('Error: unknown message type');
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
