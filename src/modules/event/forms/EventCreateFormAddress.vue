<template>
    <div>
        <table class="top-wrapper">
            <tr>
                <td>
                    <input type="text"
                           class="grey-input"
                           placeholder="Введите адрес"
                           :value="address"
                           ref="search">

                    <a href="#"
                       class="clear-button"
                       @click.prevent="clearSearch"></a>
                </td>
                <td>
                    <geo-info-button @success="onGeoInfo"></geo-info-button>
                </td>
            </tr>
        </table>

        <div class="map-wrapper"
             ref="mapWrapper">
            <div class="map"></div>
        </div>
    </div>
</template>



<script>
    import Map from "@/core/map/google/Map";
    import Config from "@/config/Config";
    import LocationInfo from "@/core/map/google/services/LocationInfo";
    import VuexFormHelper from "@/core/form/VuexFormHelper";
    import Geolocation from "@/core/map/Geolocation";
    import SearchBox from "@/core/map/google/SearchBox";
    import Marker from "@/core/map/google/marker/Marker";
    import GeoInfoButton from "@/components/map/GeoInfoButton";

    export default {
        name: 'EventCreateFormAddress',
        components: {GeoInfoButton},
        props: {
            address: String,
            lat: Number,
            lng: Number
        },
        data(){
            return {
                map: null,
                search: null,
                locationInfo: null,
                geolocation: null,
                marker: null,
                error: ''
            };
        },
        async mounted(){
            this.map = new Map(
                this.$refs.mapWrapper,
                Config.map.zoom,
                this.onClick
            );
            this.search = new SearchBox(
                this.map.getMapObject(),
                this.$refs.search,
                this.onSearch,
                this.errorHandler
            );
            this.locationInfo = new LocationInfo(
                this.map.getMapObject(),
                Config.map.locationInfo.errorMessages
            );
            this.geolocation = new Geolocation(
                Config.map.geolocation.errorMessages,
                Config.map.geolocation.networkTimeout
            );
            this.marker = new Marker(
                this.map.getMapObject(),
                Config.map.markerIcon.src,
                Config.map.markerIcon.height
            );

            if(this.lat && this.lng){
                this.setMarker(this.lat, this.lng);
            }
        },
        destroyed(){
            this.locationInfo.destroy();
            this.search.destroy();
            this.marker.destroy();
        },
        methods: {
            onSearch(locationObj){
                const {lat, lng, placeName, address} = locationObj;
                this.updateAddress(lat, lng, placeName, address);
            },
            onGeoInfo(locationObj){
                const {lat, lng, placeName, address} = locationObj;
                this.updateAddress(lat, lng, placeName, address);
            },
            onClick(event){
                const {lat, lng} = event.latLng;
                this.updateCoordinates(lat(), lng(), event.placeId);
            },


            async updateCoordinates(lat, lng, placeId){
                const result = await this.locationInfo.run({lat, lng, placeId});

                if(VuexFormHelper.isSuccess(result.status)){
                    const {placeName, address, lat, lng} = result;

                    this.updateAddress(lat, lng, placeName, address);
                }
            },
            updateAddress(lat, lng, placeName, address){
                const fullAddress = this.getFullAddress(placeName, address);

                this.setMarker(lat, lng);
                this.$emit('update', fullAddress, lat, lng);
            },
            setMarker(lat, lng){
                this.marker.moveTo(lat, lng);
                this.map.setCenter(lat, lng);
            },


            async runGeolocation(){
                const {status, lat, lng} = await this.geolocation.run();

                if(VuexFormHelper.isSuccess(status)){
                    this.map.setCenter(lat, lng);
                }
            },
            clearSearch(){
                this.$refs.search.value = '';
            },
            getFullAddress(placeName, address){
                return (placeName ? placeName +', ' : '') + address
            }
        }
    }
</script>
