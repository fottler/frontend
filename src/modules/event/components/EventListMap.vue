<template>
    <div class="map-wrapper"
         ref="mapWrapper">
        <div class="map"></div>
    </div>
</template>

<script>
    import Map from "@/core/map/google/Map";
    import Config from "@/config/Config";
    import MarkerFactory from "@/core/map/google/marker/MarkerFactory";
    import Constants from "@/core/Constants";

    export default {
        name: 'EventListMap',
        props: {
            events: Array
        },
        data(){
            return {
                map: null,
                markerFactory: null
            };
        },
        watch: {
            events(){
                this.markerFactory.setAll(this.events);
            }
        },
        async mounted(){
            this.map = new Map(
                this.$refs.mapWrapper,
                Config.map.zoom,
                null,
                Constants.EVENT_LIST_MAP
            );
            this.markerFactory = new MarkerFactory(
                this.map.getMapObject(),
                Config.map.markerIcon.src,
                Config.map.markerIcon.height,
                (e, item)=>{
                    this.$emit('item-click', item.id)
                }
            );

            this.markerFactory.setAll(this.events);
        },
        destroyed(){
            this.markerFactory.destroy();
        }
    }
</script>
