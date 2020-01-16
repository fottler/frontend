<template>
    <div>
        <div class="top-panel">
            <div class="padding-around bb">
                <menu-switcher></menu-switcher>

                <h2>Избранное</h2>
            </div>
            <div class="carousel-wrapper">
                <scrollable-links-carousel :items="filterList"
                                           :active-item-id="filter.type"
                                           @click="chooseFilterType"></scrollable-links-carousel>
            </div>
        </div>

        <div>
            <div class="container">
                <favorite-event-list></favorite-event-list>
            </div>
        </div>
    </div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex'
    import {chooseFilterType, loadAll} from "@/store/types";
    import ScrollableLinksCarousel from "@/components/ScrollableLinksCarousel";
    import ListConfig from "@/config/ListConfig";
    import FavoriteEventList from "@/modules/favorite/containers/FavoriteEventList";
    import MenuSwitcher from "@/components/menu/MenuSwitcher";

    const { mapState, mapActions } = createNamespacedHelpers('favorite');

    export default {
        name: 'Favorite',
        components: {MenuSwitcher, FavoriteEventList, ScrollableLinksCarousel},
        computed: {
            filterList: ()=>ListConfig.filter.time,
            ...mapState(['filter']),
        },
        created(){
            this.loadAll();
        },
        methods: {
            ...mapActions([loadAll, chooseFilterType])
        }
    }
</script>
