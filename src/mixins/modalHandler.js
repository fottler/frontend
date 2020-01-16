
export default {
    data(){
        return {
            modal: {
                types: {},
                type: null,
                shown: false
            },
        }
    },
    methods: {
        showModal(type){
            this.modal.type = type;
            this.modal.shown = true;
        },
        hideModal(){
            this.modal.shown = false;
        },
        modalIs(type){
            return this.modal.type === type;
        }
    },
}