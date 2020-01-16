export default {
    props: {
        initialData: Object
    },
    data(){
        return {
            model: null
        }
    },
    watch: {
        initialData:{
            handler: function(value){
                this.model = {...value};
            },
            immediate: true
        }
    },
    methods: {
        submit(){
            this.$emit('submit', this.model);
        }
    }
}