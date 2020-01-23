<template>
    <div>
        <div class="map-wrapper"
             ref="mapWrapper">
            <div class="map"></div>
        </div>
    </div>
</template>


<script>
    import Map from "@/core/map/google/Map";
    import Config from "@/config/Config";
    import Marker from "@/core/map/google/marker/Marker";

    export default {
        name: 'EventMap',
        props: {
            event: Object
        },
        data(){
            return {
                map: null,
                marker: null
            };
        },
        watch: {
            event: {
                handler: function(value){
                    if(this.marker){
                        this.setMarker(value);
                    }
                },
                immediate: true
            }
        },
        async mounted(){
            this.map = new Map(
                this.$refs.mapWrapper,
                Config.map.zoom,
                ()=>{}
            );
            this.marker = new Marker(
                this.map.getMapObject(),
                Config.map.markerIcon.src,
                Config.map.markerIcon.height
            );

            if(this.event){
                this.setMarker(this.event);
            }
        },
        destroyed(){
            this.marker.destroy();
        },
        methods: {
            setMarker(event){
                const {lat, lng} = event;

                this.marker.moveTo(lat, lng);
                this.map.setCenter(lat, lng);
            }
        }
    }
</script>
