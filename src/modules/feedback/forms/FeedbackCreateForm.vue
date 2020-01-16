<template>
    <div>
        <div class="mb-20">
            <textarea class="default"
                      rows="4"
                      placeholder="Введите текст"
                      v-model.lazy="text"></textarea>
            <error :text="errors.text"></error>
        </div>
        <div class="center">
            <a href="#"
               class="button yellow-button wide"
               @click.prevent="onSubmit">отправить</a>
        </div>
    </div>
</template>

<script>
    import Error from "@/components/forms/Error";
    import { createHelpers } from 'vuex-map-fields';
    import { createNamespacedHelpers } from 'vuex'
    import {submit} from "@/store/types";

    const { mapState, mapActions } = createNamespacedHelpers('feedback');
    const { mapFields } = createHelpers({
        getterType: 'feedback/getNewFeedbackField',
        mutationType: 'feedback/updateNewFeedbackField',
    });

    export default {
        name: 'FeedbackCreateForm',
        components: {Error},
        computed: {
            ...mapState(['errors']),
            ...mapFields(['text'])
        },
        methods: {
            async onSubmit(){
                const success = await this.submit();

                if(success){
                    this.$emit('show-modal');
                }
            },
            ...mapActions([ submit ])
        }
    }
</script>
