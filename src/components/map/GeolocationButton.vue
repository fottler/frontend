<template>
    <div>
        <a href="#"
           class="square-button geolocation-button"
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
    import Geolocation from "@/core/map/Geolocation";

    export default {
        name: 'GeolocationButton',
        components: {Modal},
        mixins: [modalHandler],
        data(){
            return {
                geolocation: new Geolocation(
                    Config.map.geolocation.errorMessages,
                    Config.map.geolocation.networkTimeout
                ),
                error: ''
            };
        },
        methods: {
            async run(){
                const result = await this.geolocation.run();

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
