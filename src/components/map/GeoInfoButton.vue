<template>
    <div>
        <a href="#"
           class="geolocation-button"
           @click.prevent="run"></a>

        <Modal class="service-modal"
               v-model="modal.shown">
            <div>{{error}}</div>
        </Modal>
    </div>
</template>

<script>
    import Config from "@/config/Config";
    import VuexFormHelper from "@/core/form/VuexFormHelper";
    import modalHandler from "@/mixins/modalHandler";
    import Modal from "@/components/common/Modal";
    import GeoInfo from "@/core/map/google/services/GeoInfo";

    export default {
        name: 'GeoInfoButton',
        components: {Modal},
        mixins: [modalHandler],
        data(){
            return {
                geoInfo: new GeoInfo(
                    Config.map.geolocation.errorMessages,
                    Config.map.locationInfo.errorMessages,
                    Config.map.geolocation.networkTimeout
                ),
                error: ''
            };
        },
        destroyed(){
            this.geoInfo.destroy();
        },
        methods: {
            async run(){
                const result = await this.geoInfo.run();

                if(VuexFormHelper.isSuccess(result.status)){
                    this.$emit('success', result);
                }
                else{
                    this.error = result.error;
                    this.showModal();
                    this.$emit('error', this.error);
                }
            }
        }
    }
</script>
