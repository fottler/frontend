<template>
    <div>
        <div class="top-panel">
            <div class="padding-around bb">
                <menu-switcher></menu-switcher>

                <h2>События</h2>
            </div>
            <div class="carousel-wrapper">
                <scrollable-links-carousel :items="filterList"
                                           :active-item-id="filter.type"
                                           @click="chooseFilterType"></scrollable-links-carousel>
            </div>
        </div>

        <div id="my-events">
            <div class="container">

                <div v-if="events.length"
                     class="row">

                    <div class="col-12 event-view-types">
                        <a href="#"
                           :class="{active: !mapShown}"
                           @click.prevent="hideMap">списки</a>
                        <a href="#"
                           :class="{active: mapShown}"
                           @click.prevent="showMap">на карте</a>
                    </div>
                </div>

                <my-events-list></my-events-list>

            </div>
        </div>
    </div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex'
    import {chooseFilterType, hideMap, loadAll, showMap} from "@/store/types";
    import ScrollableLinksCarousel from "@/components/ScrollableLinksCarousel";
    import ListConfig from "@/config/ListConfig";
    import MyEventsList from "@/modules/myEvents/containers/MyEventsList";
    import sidebarHandler from "@/mixins/sidebarHandler";
    import MenuSwitcher from "@/components/menu/MenuSwitcher";

    const { mapState, mapGetters, mapActions } = createNamespacedHelpers('myEvents');

    export default {
        name: 'MyEvents',
        components: {MenuSwitcher, MyEventsList, ScrollableLinksCarousel},
        mixins: [sidebarHandler],
        computed: {
            filterList: ()=>ListConfig.filter.myEvents,
            ...mapState(['mapShown', 'filter']),
            ...mapGetters({
                events: 'getAll'
            }),
        },
        created(){
            this.loadAll();
        },
        methods: {
            ...mapActions([loadAll, chooseFilterType, showMap, hideMap])
        }
    }
</script>
